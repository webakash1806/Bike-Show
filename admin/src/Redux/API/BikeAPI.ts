import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface AddBikeProps {
    formData: FormData;
    id?: string;
}

interface AddSpecsProps {
    specs: object;
}

interface updateProps {
    search: string | null | undefined,
    page: number,
}

interface AddColorProps {
    formData: FormData;
}

export const bikeApi = createApi({
    reducerPath: "bikeApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['BIKES'],
    endpoints: (builder) => ({
        getAllBikes: builder.query<{ bikes: object[] }, updateProps>({
            query: ({ search, page }) => ({
                url: "/bikes?search=" + search + "&page=" + page,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "BIKES" as const }] : [],
        }),
        addBike: builder.mutation<object, AddBikeProps>({
            query: ({ formData }) => ({
                url: "/bikes",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "BIKES" as const }] : [],
        }),
        updateBike: builder.mutation<object, AddBikeProps>({
            query: ({ formData, id }) => ({
                url: `/bikes/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "BIKES" as const }] : [],
        }),
        deleteBike: builder.mutation({
            query: (data) => ({
                url: `/bikes/${data?.id}`,
                method: "DELETE",
                data: {},
            }),
            invalidatesTags: (result) => result ? [{ type: "BIKES" as const }] : [],
        }),
        addBikeSpecs: builder.mutation<object, AddSpecsProps>({
            query: (specs) => ({
                url: "/bikes/specs",
                method: "POST",
                data: specs,
            }),
            invalidatesTags: (result) => result ? [{ type: "BIKES" as const }] : [],
        }),
        addBikeOthers: builder.mutation<object, AddColorProps>({
            query: ({ formData }) => ({
                url: "/bikes/others",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "BIKES" as const }] : [],
        }),
        getAllBikeModels: builder.query({
            query: () => ({
                url: "/bikes/model",
                method: "GET",
                data: {},
            })
        }),

    }),
})

export const { useGetAllBikesQuery, useAddBikeMutation, useAddBikeSpecsMutation, useAddBikeOthersMutation, useUpdateBikeMutation, useDeleteBikeMutation, useGetAllBikeModelsQuery } = bikeApi
