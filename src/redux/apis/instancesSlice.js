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
  reducers: {
    removeInstance: (state, action) => {
      state.instances = state.instances.filter((i) => i.id === action.payload);
    },
    updateInstance: (state, action) => {
      state.instances = state.instances.map((instance) => {
        if (instance.id === action.payload.id) {
          return { ...instance, ...action.payload };
        } else {
          return instance;
        }
      });
    },
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

export const { addInstance, removeInstance, updateInstance } =
  instancesSlice.actions;

export default instancesSlice.reducer;
