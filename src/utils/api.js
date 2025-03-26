import axios from "axios";
import cookies from "js-cookie";
import { API_URL } from "./constants";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

// helps to avoid multiple requests to refresh the token
let refreshTokenPromise = null;

api.interceptors.request.use((request) => {
  const accessToken = cookies.get("access_token");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = (async () => {
          try {
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
              null,
              { withCredentials: true },
            );

            api.defaults.headers.common["Authorization"] =
              `Bearer ${data.token}`;
            setAccessToken(data.token);
          } catch (refreshError) {
            cookies.remove("access_token");
            throw refreshError;
          } finally {
            refreshTokenPromise = null;
          }
        })();
      }

      try {
        await refreshTokenPromise;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export function setAccessToken(token) {
  cookies.set("access_token", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}
