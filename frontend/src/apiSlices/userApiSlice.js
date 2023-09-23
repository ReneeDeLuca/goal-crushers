import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            //queries - return data for caching
        getAllUsers: builder.query({
            query: () => ({
                url: `${USER_URL}/`,
                // Provides a list of `Users` by `id`.
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
                // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `User` element was added.            
                providesTags: (result) =>
                // is result available?
                result
                  ? // successful query
                  [
                    ...result.map(({ id }) => ({ type: 'User', id })),
                    { type: 'User', id: 'LIST' },
                  ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Goal', id: 'LIST' }` is invalidated
                  [{ type: 'User', id: 'LIST' }],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USER_URL}/:${id}`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
                }),
                providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
            //mutations
        updateLogin: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login/:${data.id}`,
                method: "PUT",
                body: data,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            // Invalidates all queries that subscribe to this User `id` only.
            // In this case, `getUserById` will be re-run. `getAllUsers` *might*  rerun, if this id was under its results.
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
        updateUserImage: builder.mutation({
            query: ({userId, imageUrl, userImage}) => ({
                url: `${USER_URL}/image/:${userId}`,
                method: "PUT",
                body: {userId, imageUrl, userImage},
                transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
        deleteUserImage: builder.mutation({
            query: (public_id) => ({
                url: `${USER_URL}/tempimage/:${public_id}`,
                method: "POST",
                body: public_id,
                transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),

        updateUserAboutMe: builder.mutation({
            query: ({id, aboutMe}) => ({
                url: `${USER_URL}/aboutme/:${id}`,
                method: "PUT",
                body: {id, aboutMe},
                transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        }),
        followUser: builder.mutation({
            query: ({userId, followId, followName }) => ({
                url: `${USER_URL}/follow/:${userId}`,
                method: 'PUT',
                body: {userId, followId, followName},
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: ['User'],
          }),
          unfollowUser: builder.mutation({
            query: ({userId, followId, followName}) => ({
                url: `${USER_URL}/unfollow/:${userId}`,
                method: 'PUT',
                body: {userId, followId, followName},
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: ['User'],
          }),
        deleteUser: builder.mutation({
            query: (id) => ({
              url: `${USER_URL}/:${id}`,
              method: 'DELETE',
              body: id,
              transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const { 
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateLoginMutation,
    useUpdateUserAboutMeMutation,
    useUpdateUserImageMutation,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useDeleteUserImageMutation,
    useDeleteUserMutation, 
} = userApiSlice;