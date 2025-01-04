import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const forgotPasswordAPI = async (email) => {
  try {
    const response = await api.post("/user/forgotPassword", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Unable to connect to the server. Please check your connection."
      );
    }
    throw (
      error.response?.data || {
        message: "An error occurred. Please try again.",
      }
    );
  }
};

const initialState = {
  loading: false,
  success: null,
  error: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} = forgotPasswordSlice.actions;

export const forgotPasswordThunk = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    const data = await forgotPasswordAPI(email);
    dispatch(forgotPasswordSuccess({ message: data.message }));
  } catch (error) {
    dispatch(forgotPasswordFailure({ message: error.message }));
  }
};

export default forgotPasswordSlice.reducer;
