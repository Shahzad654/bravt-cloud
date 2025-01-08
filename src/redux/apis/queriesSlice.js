import { API_URL } from "../../utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  endpoints: (builder) => ({
    getInstanceById: builder.query({
      query: (id) => `vultr/${id}`,
      transformResponse: (res) => res.data.instance,
    }),
  }),
});

export const { useGetInstanceByIdQuery } = apiSlice;
export default apiSlice;
