import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const saveBillingInfo = createAsyncThunk(
  "/user/BillingInfo",
  async (billingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/BillingInfo`,
        billingData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      })
      .addCase(saveBillingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBillingError } = billingSlice.actions;
export default billingSlice.reducer;
