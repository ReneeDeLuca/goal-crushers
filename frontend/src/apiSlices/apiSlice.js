/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),//if not using proxy, need to set base url here,
    tagTypes: ['User', 'Main', 'Profile', 'Goal', 'Comment'],
    endpoints: (builder) => ({})
});