import axios from "axios";
import { API_URL } from "./constants";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : null,
  },
});
