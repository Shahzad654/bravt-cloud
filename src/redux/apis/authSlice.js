// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://cloudbravt.centralindia.cloudapp.azure.com";

export const sendVerificationCode = createAsyncThunk(
  "/user/otp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/otp`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyAndSignup = createAsyncThunk(
  "/user/verifyOTP",
  async ({ email, code, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/verifyOTP`, {
        email,
        code,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    verificationSent: false,
    user: null,
    error: null,
    email: "", 
    password: "", 
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setEmailAndPassword: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.loading = false;
        state.verificationSent = true;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAndSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAndSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyAndSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setEmailAndPassword } = authSlice.actions;
export default authSlice.reducer;
