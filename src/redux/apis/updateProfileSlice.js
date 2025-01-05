import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const updateProfileInfo = createAsyncThunk(
  "/user/updateUserDetails",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await api.put("/user/updateUserDetails", userDetails);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to save user information";
      return rejectWithValue(errorMessage);
    }
  }
);

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileInfo.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateProfileSlice.reducer;
