import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://cloudbravt.centralindia.cloudapp.azure.com";

// Helper function to save email to localStorage
const saveEmailToStorage = (email) => {
  localStorage.setItem("userEmail", email);
};

// Helper function to get email from localStorage
export const getEmailFromStorage = () => {
  return localStorage.getItem("userEmail");
};

export const sendVerificationCode = createAsyncThunk(
  "/user/otp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/otp`, { email });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send verification code";
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyAndSignup = createAsyncThunk(
  "/user/verifyOTP",
  async ({ email, code, password }, { rejectWithValue }) => {
    try {
      console.log("Request payload:", { email, code, password });
      const response = await axios.post(`${API_BASE_URL}/user/verifyOTP`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, code: code.trim(), password },
      });

      console.log("Response data:", response.data);
      saveEmailToStorage(email);
      return response.data;
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Signup failed";
      return rejectWithValue(errorMessage);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    verificationSent: false,
    user: null,
    error: null,
    email: "",
    password: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setEmailAndPassword: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.loading = false;
        state.verificationSent = true;
        state.error = null;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAndSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAndSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyAndSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setEmailAndPassword } = authSlice.actions;
export default authSlice.reducer;
