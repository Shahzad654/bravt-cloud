import { configureStore } from "@reduxjs/toolkit"

import transactionsApi from "./apis/transactions"
import firewallsApi from "./apis/firewalls"
import authApi from "./apis/auth"
import instancesApi from "./apis/instances"
import sshApi from "./apis/ssh"
import snapshotsApi from "./apis/snapshots"
import isoApi from "./apis/iso"
import apiErrorReducer, { apiErrorMiddleware } from "./apiError"
import notificationsApi from "./apis/notifications"
import ticketsApi from "./apis/tickets"

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [instancesApi.reducerPath]: instancesApi.reducer,
    [sshApi.reducerPath]: sshApi.reducer,
    [snapshotsApi.reducerPath]: snapshotsApi.reducer,
    [firewallsApi.reducerPath]: firewallsApi.reducer,
    [isoApi.reducerPath]: isoApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    apiError: apiErrorReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      transactionsApi.middleware,
      instancesApi.middleware,
      sshApi.middleware,
      snapshotsApi.middleware,
      firewallsApi.middleware,
      isoApi.middleware,
      notificationsApi.middleware,
      ticketsApi.middleware,
      apiErrorMiddleware
    )
  }
})

export default store
