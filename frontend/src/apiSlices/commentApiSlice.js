import {apiSlice} from './apiSlice';
const COMMENT_URL = "api/comment";

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //queries - return data for caching
        getAllComments: builder.query({
            query: () => ({
                url: `${COMMENT_URL}/`,
                // Provides a list of `Comments` by `id`.
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
            // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Comment` element was added.
            providesTags: (result) =>
            // is result available?
            result
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'Comment', id })),
                    { type: 'Comment', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Comment', id: 'LIST' }` is invalidated
                [{ type: 'Comment', id: 'LIST' }], 
        }),
        addComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Comment', id }],
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `${COMMENT_URL}/:${id}`,
                method: "DELETE",
                body: id,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
});

export const {
    useGetAllCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
} = commentApiSlice;
