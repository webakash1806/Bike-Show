import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface AddScootyProps {
    formData: FormData;
    id: string
}

interface AddSpecsProps {
    specs: object;
}

interface updateProps {
    search: string | null | undefined;
    page: number;
}

interface AddColorProps {
    formData: FormData;
}

export const scootyApi = createApi({
    reducerPath: "scootyApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['SCOOTY'],
    endpoints: (builder) => ({
        getAllScooty: builder.query<{ scooty: object[] }, updateProps>({
            query: ({ search, page }) => ({
                url: "/scooty?search=" + search + "&page=" + page,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "SCOOTY" as const }] : [],
        }),
        addScooty: builder.mutation<object, AddScootyProps>({
            query: ({ formData }) => ({
                url: "/scooty",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "SCOOTY" as const }] : [],
        }),
        updateScooty: builder.mutation<object, AddScootyProps>({
            query: ({ formData, id }) => ({
                url: `/scooty/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "SCOOTY" as const }] : [],
        }),
        deleteScooty: builder.mutation({
            query: (data) => ({
                url: `/scooty/${data?.id}`,
                method: "DELETE",
                data: {},
            }),
            invalidatesTags: (result) => result ? [{ type: "SCOOTY" as const }] : [],
        }),
        addScootySpecs: builder.mutation<object, AddSpecsProps>({
            query: (specs) => ({
                url: "/scooty/specs",
                method: "POST",
                data: specs,
            }),
            invalidatesTags: (result) => result ? [{ type: "SCOOTY" as const }] : [],
        }),
        addScootyOthers: builder.mutation<object, AddColorProps>({
            query: ({ formData }) => ({
                url: "/scooty/others",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "SCOOTY" as const }] : [],
        }),
        getAllScootyModels: builder.query({
            query: () => ({
                url: "/scooty/model",
                method: "GET",
                data: {},
            }),

        }),

    }),
})

export const { useGetAllScootyQuery, useAddScootyMutation, useAddScootySpecsMutation, useAddScootyOthersMutation, useUpdateScootyMutation, useDeleteScootyMutation, useGetAllScootyModelsQuery } = scootyApi
