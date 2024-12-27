import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://cloudbravt.centralindia.cloudapp.azure.com";

const resetPasswordAPI = async (userId, password, confirmPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/resetPassword/${userId}`,
      { password, confirmPassword }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred. Please try again.",
      }
    );
  }
};

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetPasswordStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const resetPasswordThunk =
  (userId, password, confirmPassword) => async (dispatch) => {
    console.log("Dispatching resetPasswordThunk"); 
    dispatch(resetPasswordStart());
    try {
      const data = await resetPasswordAPI(userId, password, confirmPassword);
      console.log("Password reset response:", data);
      dispatch(resetPasswordSuccess(data.message));
    } catch (error) {
      console.error("Error during password reset:", error); 
      dispatch(resetPasswordFailure(error.message));
    }
  };


export const {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
