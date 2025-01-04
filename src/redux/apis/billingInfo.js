import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const saveBillingInfo = createAsyncThunk(
  "/user/BillingInfo",
  async (billingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/BillingInfo", billingData);
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
