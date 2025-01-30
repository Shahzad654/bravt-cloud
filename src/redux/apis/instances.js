import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";
import { authUtil } from "./auth";

const instancesApi = createApi({
  reducerPath: "instances",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AllInstances", "Instance", "BackupSchedule"],
  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => "instance/os",
    }),

    getRegions: builder.query({
      query: () => "instance/regions",
    }),

    getPlans: builder.query({
      query: (region) => `instance/plans?region=${region}`,
    }),

    getAllInstances: builder.query({
      query: (groupId) => `instance${groupId ? `?groupId=${groupId}` : ""}`,
      providesTags: () => [{ type: "AllInstances" }],
    }),

    getInstanceById: builder.query({
      query: (id) => `instance/${id}`,
      providesTags: (_, __, id) => [{ type: "Instance", id }],
    }),

    getInstanceAvailableUpgrades: builder.query({
      query: (id) => `instance/upgrades/${id}`,
    }),

    getInstanceBackupSchedule: builder.query({
      query: (id) => `instance/backup-schedule/${id}`,
      providesTags: () => [{ type: "BackupSchedule" }],
    }),

    listBackups: builder.query({
      query: (id) => `instance/backups/${id}`,
    }),

    createInstance: builder.mutation({
      query: (body) => ({
        url: "instance",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
    }),

    updateInstance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `instance/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            instancesApi.util.updateQueryData(
              "getInstanceById",
              id,
              (draft) => {
                Object.assign(draft, data);
              }
            )
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    startOrStopInstance: builder.mutation({
      query: ({ id, action }) => ({
        url: `instance/${action}/${id}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id, action }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          const power_status = action === "start" ? "running" : "stopped";

          dispatch(
            instancesApi.util.updateQueryData(
              "getInstanceById",
              id,
              (draft) => {
                Object.assign(draft, { power_status });
              }
            )
          );

          dispatch(authUtil.invalidateTags([{ type: "Session" }]));

          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    rebootInstance: builder.mutation({
      query: ({ id }) => ({
        url: `instance/reboot/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "AllInstances" },
        { type: "Instance", id },
      ],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(authUtil.invalidateTags([{ type: "Session" }]));
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    reinstallInstance: builder.mutation({
      query: ({ id }) => ({
        url: `instance/reinstall/${id}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            instancesApi.util.updateQueryData(
              "getInstanceById",
              id,
              (draft) => {
                Object.assign(draft, data);
              }
            )
          );

          dispatch(authUtil.invalidateTags([{ type: "Session" }]));
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    restoreInstance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `instance/restore/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __) => [{ type: "AllInstances" }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            instancesApi.util.updateQueryData(
              "getInstanceById",
              id,
              (draft) => {
                Object.assign(draft, { status: "locked" });
              }
            )
          );

          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    deleteInstance: builder.mutation({
      query: ({ id }) => ({
        url: `instance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Instance", id }],
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            instancesApi.util.updateQueryData(
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

          dispatch(
            instancesApi.util.updateQueryData("getInstanceById", id, () => null)
          );

          dispatch(authUtil.invalidateTags([{ type: "Session" }]));
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    updateInstanceBackupSchedule: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `instance/backup-schedule/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "BackupSchedule" },
        { type: "Instance", id },
        { type: "AllInstances" },
      ],
    }),
  }),
});

export const {
  util: instancesUtil,
  useGetImagesQuery,
  useGetPlansQuery,
  useGetRegionsQuery,
  useGetAllInstancesQuery,
  useGetInstanceByIdQuery,
  useGetInstanceAvailableUpgradesQuery,
  useGetInstanceBackupScheduleQuery,
  useListBackupsQuery,

  useCreateInstanceMutation,
  useUpdateInstanceMutation,
  useStartOrStopInstanceMutation,
  useRebootInstanceMutation,
  useReinstallInstanceMutation,
  useRestoreInstanceMutation,
  useDeleteInstanceMutation,
  useUpdateInstanceBackupScheduleMutation,
} = instancesApi;

export default instancesApi;
