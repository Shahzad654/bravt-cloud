import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apis/authSlice";
import billingReducer from "./apis/billingInfo";
import loginReducer from "./apis/loginSlice";
import userReducer from "./apis/userSlice";
import forgotPasswordReducer from "./apis/forgetSlice";
import resetPasswordReducer from "./apis/resetSlice";
import emailChangeReducer from "./apis/changeEmail";
import transactionsReducer from "./apis/transactionsSlice";
import apiSlice from "./apis/apiSlice";
import addShhReducer from "./apis/createShhSlice";
import getShhReducer from "./apis/getAllShhSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    billing: billingReducer,
    login: loginReducer,
    user: userReducer,
    forgetPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    emailChange: emailChangeReducer,
    transactions: transactionsReducer,
    createShh: addShhReducer,
    getAllShh: getShhReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
