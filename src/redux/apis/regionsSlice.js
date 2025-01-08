import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { customSort } from "../../utils/helpers";

export const getRegions = createAsyncThunk(
  "vultr/getRegions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vultr/getRegions");
      return customSort(response.data.data, "country");
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch regions"
      );
    }
  }
);

const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
    status: "loading",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.regions = action.payload;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default regionsSlice.reducer;
