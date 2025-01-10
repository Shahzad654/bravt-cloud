import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// Async thunk for creating SSH key
export const createSshKey = createAsyncThunk(
  "vultr/createSshKey",
  async (sshData, { rejectWithValue }) => {
    try {
      const response = await api.post("/vultr/ssh/create", sshData);
      return response.data.data;  // Adjust based on the actual response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to create SSH key"
      );
    }
  }
);

// Async thunk for updating SSH key
export const updateSshKey = createAsyncThunk(
  "vultr/updateSshKey",
  async (updatedSshData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/vultr/ssh/update", updatedSshData);
      console.log("response",response);
      
      return response.data.data;  // Adjust based on the actual response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update SSH key"
      );
    }
  }
);

const vultrSshSlice = createSlice({
  name: "vultrSsh",
  initialState: {
    sshKey: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
    sshKeys: [],  // To store multiple SSH keys
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSshKey: (state) => {
      state.sshKey = null;
    },
    clearStatus: (state) => {
      state.status = "idle";
    },
    setSshKeys: (state, action) => {
      state.sshKeys = action.payload; // For storing the list of SSH keys
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSshKey.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createSshKey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sshKey = action.payload;
      })
      .addCase(createSshKey.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      
      // Handle SSH key update
      .addCase(updateSshKey.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSshKey.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the SSH key in the state (if needed)
        const updatedKey = action.payload;
        const index = state.sshKeys.findIndex((key) => key.id === updatedKey.id);
        if (index !== -1) {
          state.sshKeys[index] = updatedKey;
        }
      })
      .addCase(updateSshKey.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSshKey, clearStatus, setSshKeys } = vultrSshSlice.actions;

export default vultrSshSlice.reducer;
