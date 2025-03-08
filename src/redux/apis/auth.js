import cookies from "js-cookie"
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "../query"
import { setAccessToken } from "../../utils/api"

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    getSession: builder.query({
      query: () => "auth/session",
      providesTags: () => [{ type: "Session" }]
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          if (data.tempToken) {
            window.location.href = `/verify-2fa/${data.tempToken}`
          } else {
            setAccessToken(data.token)

            window.location.href =
              data.user?.role === "ADMIN"
                ? process.env.REACT_APP_ADMIN_URL
                : "/instance"
          }
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }),

    sendVerification: builder.mutation({
      query: (body) => ({
        url: "auth/send-verification",
        method: "POST",
        body
      })
    }),

    verifyCode: builder.mutation({
      query: (body) => ({
        url: "auth/verify-code",
        method: "POST",
        body
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          setAccessToken(data.token)
          window.location.href = "/setup-password"
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }),

    setupPassword: builder.mutation({
      query: (body) => ({
        url: "auth/setup-password",
        method: "PATCH",
        body
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          setAccessToken(data.token)
          window.location.href = "/instance"
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "auth/change-password",
        method: "PATCH",
        body
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          setAccessToken(data.token)
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }),

    sendPasswordResetVerification: builder.mutation({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body
      })
    }),

    resetPassword: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `auth/reset-password/${token}`,
        method: "PATCH",
        body
      })
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "auth/change-profile",
        method: "PATCH",
        body
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          setAccessToken(data.token)
          dispatch(
            authApi.util.updateQueryData("getSession", undefined, (draft) => {
              Object.assign(draft, data.user)
            })
          )
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST"
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          cookies.remove("access_token")
          dispatch(
            authApi.util.updateQueryData("getSession", undefined, () => null)
          )
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }),

    generate2FASecret: builder.mutation({
      query: () => ({
        url: "auth/2fa",
        method: "POST"
      })
    }),

    enable2FA: builder.mutation({
      query: (body) => ({
        url: "auth/2fa",
        method: "PATCH",
        body
      })
    }),

    disable2FA: builder.mutation({
      query: (body) => ({
        url: "auth/2fa/disable",
        method: "PATCH",
        body
      })
    }),

    verify2FALogin: builder.mutation({
      query: (body) => ({
        url: "auth/2fa/verify",
        method: "POST",
        body
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          setAccessToken(data.token)
          window.location.href =
            data.user?.role === "ADMIN"
              ? process.env.REACT_APP_ADMIN_URL
              : "/instance"

          // eslint-disable-next-line no-empty
        } catch {}
      }
    })
  })
})

export const {
  util: authUtil,
  useGetSessionQuery,
  useLoginMutation,
  useSendVerificationMutation,
  useVerifyCodeMutation,
  useSetupPasswordMutation,
  useSendPasswordResetVerificationMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useGenerate2FASecretMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
  useVerify2FALoginMutation
} = authApi

export default authApi
