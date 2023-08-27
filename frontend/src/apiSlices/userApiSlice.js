import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            //queries
        getAllUsers: builder.query({
            query: () => ({
                url: `${USER_URL}/`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
                providesTags: (result, error, id) => [{ type: 'User', id }],
            
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USER_URL}/:${id}`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
                providesTags: (result, error, id) => [{ type: 'User', id }],
            }),
        }),
            //mutations
        updateLogin: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login/:id`,
                method: "PUT",
                body: data,
            }),
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile/:id`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
              url: `${USER_URL}/:${id}`,
              method: 'DELETE',
              body: id,
            }),
        }),
    })
})

export const { 
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateLoginMutation,
    useUpdateProfileMutation,
    useDeleteUserMutation, 
} = userApiSlice;