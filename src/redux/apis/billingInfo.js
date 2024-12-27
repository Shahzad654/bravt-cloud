import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_BASE_URL = "http://cloudbravt.centralindia.cloudapp.azure.com";

export const saveBillingInfo = createAsyncThunk(
  "/user/BillingInfo",
  async (billingData, { rejectWithValue }) => {
    try {
      const userEmail = getEmailFromStorage();
      const dataWithEmail = {
        ...billingData,
        email: userEmail,
      };

      const response = await axios.post(
        `${API_BASE_URL}/user/BillingInfo`,
        dataWithEmail
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to save billing information";
      return rejectWithValue(errorMessage);
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    loading: false,
    billingInfo: null,
    error: null,
  },
  reducers: {
    clearBillingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBillingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBillingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.billingInfo = action.payload;
        state.error = null;
      })
      .addCase(saveBillingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBillingError } = billingSlice.actions;
export default billingSlice.reducer;
