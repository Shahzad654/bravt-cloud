// src/store/otpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const sendOTP = createAsyncThunk(
  "otp/send",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/sendOTPChangeEmail", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    error: null,
    success: false,
    verified: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = otpSlice.actions;
export default otpSlice.reducer;
