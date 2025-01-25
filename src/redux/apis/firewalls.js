import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";

const firewallsApi = createApi({
  reducerPath: "firewall",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Firewalls", "FirewallRules"],
  endpoints: (builder) => ({
    getFirewallGroups: builder.query({
      query: () => "firewall",
    }),

    getFirewallRules: builder.query({
      query: (id) => `firewall/rules/${id}`,
      providesTags: (_, __, id) => [{ type: "FirewallRules", id }],
    }),

    createFirewallGroup: builder.mutation({
      query: (body) => ({
        url: `firewall`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            firewallsApi.util.updateQueryData(
              "getFirewallGroups",
              undefined,
              (draft) => {
                draft.push(data);
              }
            )
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    updateFirewallGroup: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `firewall/${id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ id, ...data }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            firewallsApi.util.updateQueryData(
              "getFirewallRules",
              id,
              (draft) => {
                Object.assign(draft.firewallGroup, data);
              }
            )
          );

          dispatch(
            firewallsApi.util.updateQueryData(
              "getFirewallGroups",
              undefined,
              (draft) => {
                for (let i = draft.length - 1; i >= 0; i--) {
                  if (draft[i].id === id) {
                    Object.assign(draft[i], data);
                  }
                }
              }
            )
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    deleteFirewallGroup: builder.mutation({
      query: (id) => ({
        url: `firewall/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            firewallsApi.util.updateQueryData(
              "getFirewallGroups",
              undefined,
              (draft) => {
                for (let i = draft.length - 1; i >= 0; i--) {
                  if (draft[i].id === id) {
                    draft.splice(i, 1);
                  }
                }
              }
            )
          );

          dispatch(
            firewallsApi.util.updateQueryData(
              "getFirewallRules",
              id,
              () => null
            )
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    createFirewallRule: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `firewall/rules/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "FirewallRules", id }],
    }),

    deleteFirewallRule: builder.mutation({
      query: ({ id, ruleId }) => ({
        url: `firewall/rules/${id}/${ruleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "FirewallRules", id }],
    }),
  }),
});

export const {
  useGetFirewallGroupsQuery,
  useGetFirewallRulesQuery,
  useCreateFirewallGroupMutation,
  useUpdateFirewallGroupMutation,
  useDeleteFirewallGroupMutation,
  useCreateFirewallRuleMutation,
  useDeleteFirewallRuleMutation,
} = firewallsApi;

export default firewallsApi;
