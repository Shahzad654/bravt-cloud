import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../query";

const notificationsApi = createApi({
  reducerPath: "notifications",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["NOTIFICATIONS", "NOTIFICATIONS_COUNT"],
  endpoints: (builder) => ({
    listNotifications: builder.query({
      query: () => "notifications",
      providesTags: () => [{ type: "NOTIFICATIONS" }],
    }),

    listUnseenNotificationsCount: builder.query({
      query: () => "notifications/count",
      providesTags: () => [{ type: "NOTIFICATIONS_COUNT" }],
    }),
  }),
});

export const {
  util: notificationUtil,
  useListNotificationsQuery,
  useListUnseenNotificationsCountQuery,
} = notificationsApi;

export default notificationsApi;
