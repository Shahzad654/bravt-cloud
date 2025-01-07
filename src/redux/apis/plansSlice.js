import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const fetchPlans = createAsyncThunk(
  "/vultr/getPlanId",
  async (region = "fra", { rejectWithValue }) => {
    try {
      const response = await api.get(`/vultr/getPlanId?region=${region}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch plan ID"
      );
    }
  }
);

const plansSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    status: "loading", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default plansSlice.reducer;
