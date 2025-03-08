import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";

const transactionsApi = createApi({
  reducerPath: "transactions",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    listTransactions: builder.query({
      query: () => "payment/transactions",
      providesTags: () => [{ type: "Transactions" }],
    }),

    getStripePaymentIntent: builder.mutation({
      query: (body) => ({
        url: "payment/stripe",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Transactions" }],
    }),

    createPaypalOrder: builder.mutation({
      query: (body) => ({
        url: "payment/paypal",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Transactions" }],
    }),

    capturePaypalOrder: builder.mutation({
      query: (id) => ({
        url: `payment/paypal/${id}/capture`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Transactions" }],
    }),

    cancelPaypalOrder: builder.mutation({
      query: (id) => ({
        url: `payment/paypal/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Transactions" }],
    }),
  }),
});

export const {
  util: transactionsUtil,
  useListTransactionsQuery,
  useGetStripePaymentIntentMutation,
  useCreatePaypalOrderMutation,
  useCapturePaypalOrderMutation,
  useCancelPaypalOrderMutation,
} = transactionsApi;

export default transactionsApi;
