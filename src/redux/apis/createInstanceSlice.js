import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api"; // Adjust the import based on your project setup

// Async thunk for creating an instance
export const createInstance = createAsyncThunk(
  "/vultr/createInstance", // Define the endpoint
  async (instanceData, { rejectWithValue }) => {
    try {
        console.log("instanceData",instanceData);
        
      // Send request to create the instance
      const response = await api.post("/vultr/createInstance", instanceData);
      console.log("response",response);
      
      return response.data; // Adjust based on your API's response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to create instance"
      );
    }
  }
);

// Slice for instance creation
const instanceSlice = createSlice({
  name: "instance",
  initialState: {
    instance: null, // Store created instance data
    instanceStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
  },
  reducers: {
    clearInstance: (state) => {
      state.instance = null;
      state.instanceStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInstance.pending, (state) => {
        state.instanceStatus = "loading";
        state.error = null;
      })
      .addCase(createInstance.fulfilled, (state, action) => {
        state.instanceStatus = "succeeded";
        state.instance = action.payload;
      })
      .addCase(createInstance.rejected, (state, action) => {
        state.instanceStatus = "error";
        state.error = action.payload;
      });
  },
});

// Export actions
// export const { clearInstance } = instanceSlice.actions;

export default instanceSlice.reducer;
