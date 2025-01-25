import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "../utils/constants";
import { authUtil } from "./apis/auth";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  // 401 error (Token Expiry)
  if (result?.error?.status === 401) {
    //Trying to get new access token

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const data = await response.json();

    if (data) {
      localStorage.setItem("access_token", data.token);
      result = await baseQuery(args, store, extraOptions);
    } else {
      localStorage.removeItem("access_token");
      store.dispatch(
        authUtil.updateQueryData("getSession", undefined, () => null)
      );
    }
  }

  return result;
};
