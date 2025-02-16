import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface FormProps {
    id: string,
    status: string,
    userId: string
}



interface updateProps {
    search: string | null | undefined,
    page: number,
    status: string
}




export const formApi = createApi({
    reducerPath: "formApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['FORMS'],
    endpoints: (builder) => ({
        getProductEnquiry: builder.query<object, updateProps>({
            query: (data) => ({
                url: "/form/product-enquiry?search=" + data.search + "&page=" + data.page + "&status=" + data.status,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "PRODUCT-ENQUIRY" }] : [],
        }),
        getSingleProductEnquiry: builder.query<object, string>({
            query: (id) => ({
                url: `/form/product-enquiry/${id}`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "PRODUCT-ENQUIRY" }] : [],
        }),
        updateProductEnquiry: builder.mutation<object, FormProps>({
            query: (formData) => ({
                url: "/form/product-enquiry",
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "FORMS", id: "PRODUCT-ENQUIRY" }] : [],
        }),
        getAllTestDrive: builder.query<object, updateProps>({
            query: (data) => ({
                url: "/form/test-drive?search=" + data.search + "&page=" + data.page + "&status=" + data.status,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "TEST-DRIVE" }] : [],
        }),
        getSingleTestDrive: builder.query<object, string>({
            query: (id) => ({
                url: `/form/test-drive/${id}`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "TEST-DRIVE" }] : [],
        }),
        updateTestDrive: builder.mutation<object, FormProps>({
            query: (formData) => ({
                url: "/form/test-drive",
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "FORMS", id: "TEST-DRIVE" }] : [],
        }),
        getAllContactForm: builder.query<object, updateProps>({
            query: (data) => ({
                url: "/form/contact?search=" + data.search + "&page=" + data.page + "&status=" + data.status,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "CONTACT" }] : [],
        }),
        updateContact: builder.mutation<object, FormProps>({
            query: (formData) => ({
                url: "/form/contact",
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "FORMS", id: "CONTACT" }] : [],
        }),
        getSingleContact: builder.query<object, string>({
            query: (id) => ({
                url: `/form/contact/${id}`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "CONTACT" }] : [],
        }),
        addBanner: builder.mutation<object, FormData>({
            query: (formData) => ({
                url: "/banner",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "FORMS", id: "BANNER" }] : [],
        }),
        updateBanner: builder.mutation<object, { formData: FormData, id: string }>({
            query: ({ formData, id }) => ({
                url: `/banner/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "FORMS", id: "BANNER" }] : [],
        }),
        deleteBanner: builder.mutation<object, string>({
            query: (id) => ({
                url: `/banner/${id}`,
                method: "DELETE",
                data: {},
            }),
            invalidatesTags: (result) => result ? [{ type: "FORMS", id: "BANNER" }] : [],
        }),
        getBanner: builder.query({
            query: () => ({
                url: `/banner`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "FORMS", id: "BANNER" }] : [],
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `/auth/forgot-password`,
                method: "POST",
                data,
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ token, newPassword }) => ({
                url: `/auth/reset-password/${token}`,
                method: "POST",
                data: { newPassword },
            }),
        }),
    }),
})

export const { useGetProductEnquiryQuery, useForgotPasswordMutation, useResetPasswordMutation, useGetSingleTestDriveQuery, useGetSingleContactQuery, useUpdateContactMutation, useUpdateTestDriveMutation, useGetAllTestDriveQuery, useGetSingleProductEnquiryQuery, useGetAllContactFormQuery, useUpdateProductEnquiryMutation, useAddBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation, useGetBannerQuery } = formApi
