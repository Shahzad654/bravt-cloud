import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { customSort } from "../../utils/helpers";

export const getImages = createAsyncThunk(
  "vultr/getImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vultr/getOS");
      return customSort(response.data.data, "family");
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch images"
      );
    }
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    status: "loading",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default imagesSlice.reducer;
