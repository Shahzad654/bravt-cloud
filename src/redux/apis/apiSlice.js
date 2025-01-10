import { API_URL } from "../../utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  endpoints: (builder) => ({
    getAllInstances: builder.query({
      query: () => "/vultr/getAllInstance",
      transformResponse: (res) => res.data,
      providesTags: () => [{ type: "AllInstances" }],
    }),

    getInstanceById: builder.query({
      query: (id) => `vultr/${id}`,
      transformResponse: (res) => res.data.instance,
      providesTags: (_, __, id) => [{ type: "Instance", id }],
    }),

    getInstanceAvailableUpgrades: builder.query({
      query: (id) => `vultr/upgrades/${id}`,
      transformResponse: (res) => res.data.upgrades,
    }),

    getImages: builder.query({
      query: () => "vultr/getOS",
      transformResponse: (res) => res.data,
    }),

    getRegions: builder.query({
      query: () => "vultr/getRegions",
      transformResponse: (res) => res.data,
    }),

    getPlans: builder.query({
      query: (region) => `vultr/getPlanId?region=${region}`,
      transformResponse: (res) => res.data,
    }),

    getFirewallGroups: builder.query({
      query: () => "vultr/firewall/list",
      transformResponse: (res) => res.data,
    }),

    getFirewallRules: builder.query({
      query: (id) => `vultr/firewall/${id}/list`,
      transformResponse: (res) => res.data,
      providesTags: (_, __, id) => [{ type: "FirewallRules", id }],
    }),

    getSnapshots: builder.query({
      query: () => "vultr/snapshots/list",
      transformResponse: (res) => res.data,
      providesTags: () => [{ type: "Snapshots" }],
    }),

    getSSHKeys: builder.query({
      query: () => "vultr/ssh/list",
      transformResponse: (res) => res.data,
    }),

    updateInstance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `vultr/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getInstanceById", id, (draft) => {
              Object.assign(draft, data.data.instance);
            })
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    startOrStopInstance: builder.mutation({
      query: ({ id, action }) => ({
        url: `vultr/${action}/${id}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id, action }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          const power_status = action === "start" ? "running" : "stopped";

          dispatch(
            apiSlice.util.updateQueryData("getInstanceById", id, (draft) => {
              Object.assign(draft, { power_status });
            })
          );

          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    reinstallInstance: builder.mutation({
      query: ({ id }) => ({
        url: `vultr/reinstall/${id}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getInstanceById", id, (draft) => {
              Object.assign(draft, { status: "pending" });
            })
          );

          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    deleteInstance: builder.mutation({
      query: ({ id }) => ({
        url: `vultr/deleteInstance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Instance", id }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllInstances",
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
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    rebootInstance: builder.mutation({
      query: ({ id }) => ({
        url: `vultr/reinstall/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "AllInstances" },
        { type: "Instance", id },
      ],
    }),

    createFirewallGroup: builder.mutation({
      query: (body) => ({
        url: `vultr/firewall/create`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getFirewallGroups",
              undefined,
              (draft) => {
                draft.push(data.data);
              }
            )
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    updateFirewallGroup: builder.mutation({
      query: (body) => ({
        url: `vultr/firewall/update`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (
        { groupID, ...data },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getFirewallRules",
              groupID,
              (draft) => {
                Object.assign(draft.firewallGroup, data);
              }
            )
          );
          dispatch(
            apiSlice.util.updateQueryData(
              "getFirewallGroups",
              undefined,
              (draft) => {
                for (let i = draft.length - 1; i >= 0; i--) {
                  if (draft[i].id === groupID) {
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
        url: `vultr/firewall/delete/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
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
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    createFirewallRule: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `vultr/firewall/${id}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "FirewallRules", id }],
    }),

    deleteFirewallRule: builder.mutation({
      query: ({ id, ruleID }) => ({
        url: `vultr/firewall/${id}/delete?ruleID=${ruleID}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "FirewallRules", id }],
    }),

    createSnapshot: builder.mutation({
      query: (body) => ({
        url: `vultr/snapshots/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Snapshots" }],
    }),

    deleteSnapshot: builder.mutation({
      query: (id) => ({
        url: `vultr/snapshots/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Snapshots" }],
    }),
  }),
});

export const {
  useGetAllInstancesQuery,
  useGetInstanceByIdQuery,
  useGetInstanceAvailableUpgradesQuery,
  useGetImagesQuery,
  useGetRegionsQuery,
  useGetPlansQuery,
  useGetFirewallGroupsQuery,
  useGetFirewallRulesQuery,
  useGetSnapshotsQuery,
  useGetSSHKeysQuery,
  useUpdateInstanceMutation,
  useCreateFirewallGroupMutation,
  useUpdateFirewallGroupMutation,
  useDeleteFirewallGroupMutation,
  useCreateFirewallRuleMutation,
  useDeleteFirewallRuleMutation,
  useStartOrStopInstanceMutation,
  useRebootInstanceMutation,
  useReinstallInstanceMutation,
  useDeleteInstanceMutation,
  useCreateSnapshotMutation,
  useDeleteSnapshotMutation,
} = apiSlice;

export default apiSlice;
