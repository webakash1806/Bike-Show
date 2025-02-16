import axiosBaseQuery from "@/Helper/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const formApi = createApi({
    reducerPath: "formApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['FORM'],
    endpoints: (builder) => ({
        addProductEnquiryForm: builder.mutation({
            query: (data) => ({
                url: "/form/product-enquiry",
                method: "POST",
                data: data
            }),
        }),
        addTestDriveForm: builder.mutation({
            query: (data) => ({
                url: "/form/test-drive",
                method: "POST",
                data: data
            }),
        }),
        addContactForm: builder.mutation({
            query: (data) => ({
                url: "/form/contact",
                method: "POST",
                data: data
            }),
        }),
    }),
});

export const { useAddProductEnquiryFormMutation, useAddTestDriveFormMutation, useAddContactFormMutation } = formApi