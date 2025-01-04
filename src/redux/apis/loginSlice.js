import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { setUser } from "./userSlice";

export const loginAPI = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    setUser(response.data.data.user);
    return response.data.data;
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
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
