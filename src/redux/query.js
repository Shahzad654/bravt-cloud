import cookies from "js-cookie"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { API_URL } from "../utils/constants"
import { authUtil } from "./apis/auth"
import { setAccessToken } from "../utils/api"

export const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = cookies.get("access_token")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  }
})

export const baseQueryWithReauth = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions)

  // 401 error (Token Expiry)
  if (result?.error?.status === 401) {
    //Trying to get new access token

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      credentials: "include",
      method: "POST"
    })

    if (!response.ok) {
      throw new Error("Unauthorized")
    }

    const data = await response.json()

    if (data) {
      setAccessToken(data.token)
      result = await baseQuery(args, store, extraOptions)
    } else {
      cookies.remove("access_token")
      store.dispatch(
        authUtil.updateQueryData("getSession", undefined, () => null)
      )
    }
  }

  return result
}
