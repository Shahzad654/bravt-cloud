// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// Async thunk for fetching the current user
export const fetchCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/getCurrentUser");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch user"
      );
    }
  }
);

export async function logoutUser() {
  try {
    const response = await api.post("/user/logout");
    return response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Unable to connect to server. Please check if the server is running."
      );
    }
    throw (
      error.response?.data || {
        message: "An error occurred during logout. Please try again.",
      }
    );
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "loading", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
