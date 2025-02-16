import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface AddHelmetProps {
    formData: FormData;

}

interface EditHelmetProps {
    formData: FormData;
    id: string
}




export const helmetApi = createApi({
    reducerPath: "helmetApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['HELMET'],
    endpoints: (builder) => ({
        getAllHelmet: builder.query({
            query: () => ({
                url: `/helmet`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "HELMET" as const }] : [],
        }),
        addHelmet: builder.mutation<object, AddHelmetProps>({
            query: ({ formData }) => ({
                url: "/helmet",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "HELMET" as const }] : [],
        }),
        updateHelmet: builder.mutation<object, EditHelmetProps>({
            query: ({ formData, id }) => ({
                url: `/helmet/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "HELMET" as const }] : [],
        }),
        deleteHelmet: builder.mutation({
            query: ({ id }) => ({
                url: `/helmet/${id}`,
                method: "DELETE",
                data: {},
            }),
            invalidatesTags: (result) => result ? [{ type: "HELMET" as const }] : [],
        }),


    }),
})

export const { useAddHelmetMutation, useUpdateHelmetMutation, useDeleteHelmetMutation, useGetAllHelmetQuery } = helmetApi
