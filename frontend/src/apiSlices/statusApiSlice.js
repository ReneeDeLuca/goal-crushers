import {apiSlice} from './apiSlice.js';
const STATUS_URL = '/api/status';

export const statusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //queries - return data for caching
        getAllStatus: builder.query({
            query: () => ({
                url: `${STATUS_URL}/`,
                // Provides a list of `Status` by `id`.
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
            // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Status` element was added.
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'Status', id})),
                        {type: 'Status', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Status', id: 'LIST' }` is invalidated
                    [{type: 'Status', id: 'LIST'}],
        }),
        addStatus: builder.mutation({
            query: (data) => ({
                url: `${STATUS_URL}/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Status', id}],
        }),
    }),
});

    export const {useGetAllStatusQuery, useAddStatusMutation} = statusApiSlice;