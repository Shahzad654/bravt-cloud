import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";

const affiliateApi = createApi({
  reducerPath: "affiliate",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCommission: builder.query({
      query: () => "/affiliate/commission",
    }),
    getAffiliatedUsers: builder.query({
      query: () => "/affiliate/users",
    }),
    getAffiliateStats: builder.query({
      query: () => "/affiliate/stats",
    }),
  }),
});

export const {
  util: affiliateUtil,
  useGetCommissionQuery,
  useGetAffiliatedUsersQuery,
  useGetAffiliateStatsQuery,
} = affiliateApi;

export default affiliateApi;
