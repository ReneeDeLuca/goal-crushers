import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation({
            query: () => ({
                url: `${USER_URL}/:id`,
                method: "GET",
            }),
        }),
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
            query: (data) => ({
              url: `${USER_URL}/:id`,
              method: 'DELETE',
              body: data,
            }),
        }),
    })
})

export const { 
    useUpdateLoginMutation,
    useUpdateProfileMutation,
    useDeleteUserMutation, 
} = userApiSlice;