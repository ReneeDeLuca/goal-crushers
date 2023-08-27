import { apiSlice } from "./apiSlice";
const MAIN_URL = "/api/main";

export const mainApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${MAIN_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${MAIN_URL}/register`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${MAIN_URL}/logout`,
                method: "POST",
            }),
        }),
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
} = mainApiSlice;