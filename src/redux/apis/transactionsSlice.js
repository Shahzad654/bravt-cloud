import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const getTransactions = createAsyncThunk(
  "payment/transactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payment/transactions");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch transactions"
      );
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    status: "loading",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
