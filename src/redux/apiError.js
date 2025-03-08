import { createSlice } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

export const apiErrorSlice = createSlice({
  name: "apiError",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = apiErrorSlice.actions;

export default apiErrorSlice.reducer;

/**
 * Log a warning and show a toast!
 *
 * @type {import('@reduxjs/toolkit').Middleware}
 */
export const apiErrorMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (
      isRejectedWithValue(action) &&
      action.meta.arg.type === "query" &&
      ![401, 403].includes(action.payload?.status)
    ) {
      dispatch(
        setError({
          status: String(action.payload?.status),
          message: action.payload.data?.message,
        })
      );
    }

    return next(action);
  };
