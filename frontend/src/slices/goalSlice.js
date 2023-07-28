import { apiSlice } from "./apiSlice";
const GOAL_URL = "/api/goal";

export const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addGoal: builder.mutation({
            query: (data) => ({
                url: `${GOAL_URL}/`,
                method: "POST",
                body: data,
            }),
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
            query: () => ({
                url: `${GOAL_URL}/likes/:id`,
                method: "PUT",
            }),
        }),
        deleteGoal: builder.mutation({
            query: () => ({
                url: `${GOAL_URL}/:id`,
                method: "DELETE",
            }),
        }),
    })
})

export const { 
    useAddGoalMutation,
    useUpdateGoalDataMutation,
    useUpdateGoalMutation,
    useLikeGoalMutation,
    useDeleteGoalMutation, 
} = goalApiSlice;