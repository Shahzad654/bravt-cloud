// src/features/vultr/vultrSshSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// Async thunk for fetching all SSH keys
export const getAllSshKeys = createAsyncThunk(
  "vultr/getAllSshKeys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vultr/ssh/list"); // Assuming /vultr/ssh/list is the endpoint
      console.log("response",response);
      
      return response.data.data;  // Adjust based on the actual response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch SSH keys"
      );
    }
  }
);
export const deleteSshKey = createAsyncThunk(
    "vultr/deleteSshKey",
    async (sshKeyId, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/vultr/ssh/delete/${sshKeyId}`);
        return response.data.data;  // Adjust based on the actual response structure
      } catch (error) {
        return rejectWithValue(
          error.response?.data.message || "Failed to delete SSH key"
        );
      }
    }
  );
const vultrSshSlice = createSlice({
  name: "vultrSsh",
  initialState: {
    sshKeys: [],  // List of SSH keys
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSshKeys: (state) => {
      state.sshKeys = [];
    },
    clearStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSshKeys.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllSshKeys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sshKeys = action.payload;
      })
      .addCase(getAllSshKeys.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteSshKey.fulfilled, (state, action) => {
        state.sshKeys = state.sshKeys.filter((key) => key.id !== action.payload.id); // Remove deleted key
      })
      .addCase(deleteSshKey.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSshKeys, clearStatus } = vultrSshSlice.actions;

export default vultrSshSlice.reducer;
