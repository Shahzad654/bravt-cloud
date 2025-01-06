import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const getInstances = createAsyncThunk(
  "vultr/getAllInstance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vultr/getAllInstance");
      return response.data.data.instances;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch instances"
      );
    }
  }
);

const instancesSlice = createSlice({
  name: "instances",
  initialState: {
    instances: [],
    status: "loading",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstances.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getInstances.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.instances = action.payload;
      })
      .addCase(getInstances.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default instancesSlice.reducer;
