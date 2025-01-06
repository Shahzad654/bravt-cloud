import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api"; // Adjust the import based on your project setup

// Async thunk for fetching all instances
export const fetchAllInstances = createAsyncThunk(
  "/vultr/getAllInstance", // Define the endpoint
  async (_, { rejectWithValue }) => {
    try {
      // Send GET request to fetch all instances
      const response = await api.get("/vultr/getAllInstance");
      console.log("response",response.data.data.instances);
      
      return response.data.data.instances; // Adjust based on your API's response structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch instances"
      );
    }
  }
);

// Slice for fetching all instances
const getAllInstanceSlice = createSlice({
  name: "getAllInstance",
  initialState: {
    instances: [], // Store fetched instances data
    instancesStatus: "loading", // 'idle' | 'loading' | 'succeeded' | 'error'
    error: null,
  },
  reducers: {
    clearInstances: (state) => {
      state.instances = [];
      state.instancesStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInstances.pending, (state) => {
        state.instancesStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAllInstances.fulfilled, (state, action) => {
        console.log("action.payload",action.payload);
        
        state.instancesStatus = "succeeded";
        state.instances = action.payload;
      })
      .addCase(fetchAllInstances.rejected, (state, action) => {
        state.instancesStatus = "error";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearInstances } = getAllInstanceSlice.actions;
export default getAllInstanceSlice.reducer;
