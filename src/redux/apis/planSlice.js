import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// Async thunk for fetching the plan ID
export const fetchPlanId = createAsyncThunk(
  "/vultr/getPlanId?region=fra",
  async (region = "fra", { rejectWithValue }) => {
    try {
      const response = await api.get(`/vultr/getPlanId?region=${region}`);
      return response.data; // Adjust based on your API's response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch plan ID"
      );
    }
  }
);

// Slice for plan
const planSlice = createSlice({
  name: "plan",
  initialState: {
    plan: [],
    status: "loading", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
  },
  reducers: {
    clearPlan: (state) => {
      state.plan = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPlanId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plan = action.payload;
      })
      .addCase(fetchPlanId.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

// export const { clearPlan } = planSlice.actions;

export default planSlice.reducer;
