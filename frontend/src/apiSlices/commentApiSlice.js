import {apiSlice} from './apiSlice';
const COMMENT_URL = "/api/comment";

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
        getCommentById: builder.query({
            query: (id) => ({
                url: `${COMMENT_URL}/:${id}`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            providesTags: (result, error, id) => [{type: "Comment", id}],
        }),
        //mutations - send updates to the server
        addComment: builder.mutation({
            query: ({text, commentUser, goalId, goalUser}) => ({
                url: `${COMMENT_URL}/`,
                method: "POST",
                body: {text, commentUser, goalId, goalUser},
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Comment', id }],
        }),
        addLike: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENT_URL}/:${commentId}`,
                method: "PUT",
                body: commentId,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Comment', id }],
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENT_URL}/:${commentId}`,
                method: "DELETE",
                body: commentId,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
});

export const {
    useGetAllCommentsQuery,
    useGetCommentByIdQuery,
    useAddCommentMutation,
    useAddLikeMutation,
    useDeleteCommentMutation,
} = commentApiSlice;
