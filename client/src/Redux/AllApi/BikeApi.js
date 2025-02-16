import axiosBaseQuery from "@/Helper/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const bikeApi = createApi({
    reducerPath: "bikeApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['BIKES'],
    endpoints: (builder) => ({
        getAllBikes: builder.query({
            query: () => ({
                url: "/bikes/limited/all-bike",
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "BIKES" }] : [],
        }),
        verifyCaptcha: builder.mutation({
            query: ({ token }) => ({
                url: "/verify-captcha",
                method: "POST",
                data: { token },
            }),
            // invalidatesTags: (result) => result ? [{ type: "BIKES" }] : [],
        }),
        getAllScooty: builder.query({
            query: () => ({
                url: "/scooty/limited/all-scooty",
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "SCOOTY" }] : [],
        }),
        getAllAccessories: builder.query({
            query: ({ data = "" }) => ({
                url: `/accessories?accessories=${data}`,
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "ACCESSORIES" }] : [],
        }),
        getAllHelmet: builder.query({
            query: () => ({
                url: `/helmet`,
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "HELMET" }] : [],
        }),
        getBike: builder.query({
            query: (id) => ({
                url: `/bikes/${id}`,
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "BIKES" }] : [],
        }),
        getScooty: builder.query({
            query: (id) => ({
                url: `/scooty/${id}`,
                method: "GET",
            }),
        }),
        getSearchData: builder.query({
            query: (search) => ({
                url: `/search?search=${search}`,
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "BIKES" }] : [],
        }),
        addNewsletter: builder.mutation({
            query: (data) => ({
                url: "/newsletter",
                method: "POST",
                data: data
            })
        }),
        getAllBikeModels: builder.query({
            query: () => ({
                url: "/bikes/model",
                method: "GET",
            })
        }),
        getAllScootyModels: builder.query({
            query: () => ({
                url: "/scooty/model",
                method: "GET",
            })
        }),
        getBanner: builder.query({
            query: () => ({
                url: "/banner",
                method: "GET",
            })
        }),
    }),
});

export const { useGetSearchDataQuery, useVerifyCaptchaMutation, useGetBikeQuery, useGetAllScootyQuery, useGetScootyQuery, useGetBannerQuery, useAddNewsletterMutation, useGetAllScootyModelsQuery, useGetAllHelmetQuery, useGetAllBikeModelsQuery, useGetAllBikesQuery, useGetAllAccessoriesQuery } = bikeApi