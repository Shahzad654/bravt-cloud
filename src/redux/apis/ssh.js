import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";

const sshApi = createApi({
  reducerPath: "ssh",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["SSHKeys", "SSHKey"],
  endpoints: (builder) => ({
    listSSHKeys: builder.query({
      query: () => "ssh",
      providesTags: () => [{ type: "SSHKeys" }],
    }),

    getSSHKey: builder.query({
      query: (id) => `ssh/${id}`,
      providesTags: (_, __, id) => [{ type: "SSHKey", id }],
    }),

    createSSH: builder.mutation({
      query: (body) => ({
        url: "ssh",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "SSHKeys" }],
    }),

    updateSSH: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `ssh/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => {
        return [{ type: "SSHKeys" }, { type: "SSHKey", id }];
      },
    }),

    deleteSSH: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `ssh/${id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "SSHKeys" },
        { type: "SSHKey", id },
      ],
    }),
  }),
});

export const {
  util: sshUtil,
  useListSSHKeysQuery,
  useGetSSHKeyQuery,
  useCreateSSHMutation,
  useUpdateSSHMutation,
  useDeleteSSHMutation,
} = sshApi;

export default sshApi;
