import { apiSlice } from "./apiSlice";
const GOAL_URL = "/api/goal";

export const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            //queries
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
            //mutations
        addGoal: builder.mutation({
            query: (data) => ({
                url: `${GOAL_URL}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Goal']
        }),
        updateGoalData: builder.mutation({
            query: (data) => ({
                url: `${GOAL_URL}/progress/:id`,
                method: "PUT",
                body: data,
            }),
        }),
        updateGoal: builder.mutation({
            query: (data) => ({
              url: `${GOAL_URL}/edit/:id`,
              method: 'PUT',
              body: data,
            }),
        }),
        likeGoal: builder.mutation({
            query: (id) => ({
                url: `${GOAL_URL}/likes/:${id}`,
                method: "PUT",
            }),
        }),
        deleteGoal: builder.mutation({
            query: (id) => ({
                url: `${GOAL_URL}/:${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { 
    useGetAllGoalsQuery,
    useGetGoalByIdQuery,
    useAddGoalMutation,
    useUpdateGoalDataMutation,
    useUpdateGoalMutation,
    useLikeGoalMutation,
    useDeleteGoalMutation, 
} = goalApiSlice;