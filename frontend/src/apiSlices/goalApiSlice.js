import { apiSlice } from "./apiSlice";
const GOAL_URL = "/api/goal";

export const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            //queries - return data for caching
        getAllGoals: builder.query({
            query: () => ({
                url: `${GOAL_URL}/`,
                // Provides a list of `Posts` by `id`.
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
                // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
                // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Goal` element was added.            
                providesTags: (result) =>
                // is result available?
                result
                  ? // successful query
                    [
                      ...result.map(({ id }) => ({ type: 'Goal', id })),
                      { type: 'Goal', id: 'LIST' },
                    ]
                  : // an error occurred, but we still want to refetch this query when `{ type: 'Goal', id: 'LIST' }` is invalidated
                    [{ type: 'Goal', id: 'LIST' }],
            
        }),
        getGoalById: builder.query({
            query: (id) => ({
                url: `${GOAL_URL}/:${id}`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            providesTags: (result, error, id) => [{type: "Goal", id}],
        }),
            //mutations - send updates to the server
        addGoal: builder.mutation({
            query: (data) => ({
                url: `${GOAL_URL}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Goal', id }],
        }),
        updateGoalData: builder.mutation({
            query: ({id, date }) => ({
                url: `${GOAL_URL}/:${id}`,
                method: 'PUT',
                body: {id, date},
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            // Invalidates all queries that subscribe to this Goal `id` only.
            // In this case, `getGoalById` will be re-run. `getAllGoals` *might*  rerun, if this id was under its results.
            invalidatesTags: (result, error, { id }) => [{ type: 'Goal', id }],
          }),
        updateGoal: builder.mutation({
            query: ({id, title, endDate, isPublic}) => ({
              url: `${GOAL_URL}/edit/:${id}`,
              method: 'PUT',
              body: {id, title, endDate, isPublic},
              transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Goal', id }],
        }),
        reactionAdded: builder.mutation({
            query: ({id, data}) => ({
                url: `${GOAL_URL}/:${id}`,
                method: "PUT",
                body: data,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Goal', id }],
        }),
        
        deleteGoal: builder.mutation({
            query: (id) => ({
                url: `${GOAL_URL}/:${id}`,
                method: "DELETE",
                body: id,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
            }),
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: ['Goal'],
    
        }),
    })
})

export const { 
    useGetAllGoalsQuery,
    useGetGoalByIdQuery,
    useAddGoalMutation,
    useUpdateGoalDataMutation,
    useUpdateGoalMutation,
    useReactionAddedMutation,
    useDeleteGoalMutation, 
} = goalApiSlice;