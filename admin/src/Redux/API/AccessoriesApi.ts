import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface AddAccessoriesProps {
    formData: FormData;
    id: string;
}

export const accessoriesApi = createApi({
    reducerPath: "accessoriesApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['ACCESSORIES'],
    endpoints: (builder) => ({
        getAllAccessories: builder.query({
            query: ({ data = "" }) => ({
                url: `/accessories?accessories=${data}`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "ACCESSORIES" as const }] : [],
        }),
        addAccessories: builder.mutation<object, AddAccessoriesProps>({
            query: ({ formData }) => ({
                url: "/accessories",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "ACCESSORIES" as const }] : [],
        }),
        updateAccessories: builder.mutation<object, AddAccessoriesProps>({
            query: ({ formData, id }) => ({
                url: `/accessories/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "ACCESSORIES" as const }] : [],
        }),
        deleteAccessories: builder.mutation({
            query: ({ id }) => ({
                url: `/accessories/${id}`,
                method: "DELETE",
                data: {},
            }),
            invalidatesTags: (result) => result ? [{ type: "ACCESSORIES" as const }] : [],
        }),


    }),
})

export const { useAddAccessoriesMutation, useUpdateAccessoriesMutation, useDeleteAccessoriesMutation, useGetAllAccessoriesQuery } = accessoriesApi
