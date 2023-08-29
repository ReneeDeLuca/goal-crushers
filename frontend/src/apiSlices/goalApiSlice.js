import { apiSlice } from "./apiSlice";
const GOAL_URL = "/api/goal";

export const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            //queries - return data for caching
        getAllGoals: builder.query({
            query: () => ({
                url: `${GOAL_URL}/`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
                providesTags: (result, error, id) => [{type: "Goal", id}],
            }),
        }),
        getGoalById: builder.query({
            query: (id) => ({
                url: `${GOAL_URL}/:${id}`,
                transformResponse: (response) => response.data,
                transformErrorResponse: (response) => response.status,
                providesTags: (result, error, id) => [{type: "Goal", id}],
            }),
        }),
            //mutations - send updates to the server
        addGoal: builder.mutation({
            query: (data) => ({
                url: `${GOAL_URL}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Goal']
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
            }),
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