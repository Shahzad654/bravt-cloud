import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://cloudbravt.centralindia.cloudapp.azure.com";

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      { email, password },
      // {
      //   withCredentials: true,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   credentials: "include",
      // }
    );
    return response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Unable to connect to server. Please check if the server is running."
      );
    }
    throw (
      error.response?.data || {
        message: "An error occurred during login. Please try again.",
      }
    );
  }
};

const initialState = {
  email: localStorage.getItem("email") || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.user = action.payload.user;

     
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    
  },
});

export const { loginStart, loginSuccess, loginFailure } =
  loginSlice.actions;
export default loginSlice.reducer;
