import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' }); //if not using proxy, need to set base url here

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Main', 'Profile', 'Goal'],
    endpoints: (builder) => ({})
});