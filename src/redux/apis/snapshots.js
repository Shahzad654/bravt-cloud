import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";
import { instancesUtil } from "./instances";

const snapshotsApi = createApi({
  reducerPath: "snapshots",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Snapshots"],
  endpoints: (builder) => ({
    getSnapshots: builder.query({
      query: () => "snapshot",
      providesTags: () => [{ type: "Snapshots" }],
    }),

    createSnapshot: builder.mutation({
      query: (body) => ({
        url: "snapshot",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { instanceId }) => [
        { type: "Snapshots" },
        { type: "AllInstances" },
        { type: "Instance", id: instanceId },
      ],
      onQueryStarted: async ({ instanceId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            instancesUtil.invalidateTags([
              { type: "AllInstances" },
              { type: "Instance", id: instanceId },
            ])
          );
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),

    deleteSnapshot: builder.mutation({
      query: (id) => ({
        url: `snapshot/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Snapshots" }],
    }),
  }),
});

export const {
  util: snapshotsUtil,
  useGetSnapshotsQuery,
  useCreateSnapshotMutation,
  useDeleteSnapshotMutation,
} = snapshotsApi;

export default snapshotsApi;
