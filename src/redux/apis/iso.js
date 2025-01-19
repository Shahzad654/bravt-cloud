import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";

const isoApi = createApi({
  reducerPath: "iso",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ISO"],
  endpoints: (builder) => ({
    listISOs: builder.query({
      query: () => "iso",
      providesTags: () => [{ type: "ISO" }],
    }),

    createISO: builder.mutation({
      query: (body) => ({
        url: "iso",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "ISO" }],
    }),

    deleteISO: builder.mutation({
      query: (id) => ({
        url: `iso/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "ISO" }],
    }),
  }),
});

export const {
  util: isoUtil,
  useListISOsQuery,
  useCreateISOMutation,
  useDeleteISOMutation,
} = isoApi;

export default isoApi;
