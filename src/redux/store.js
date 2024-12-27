import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apis/authSlice";
import billingReducer from './apis/billingInfo';
import loginReducer from './apis/loginSlice'
import forgotPasswordReducer from './apis/forgetSlice'
import resetPasswordReducer from "./apis/resetSlice";
import emailChangeReducer from './apis/changeEmail'

const store = configureStore({
  reducer: {
    auth: authReducer,
    billing: billingReducer,
    login: loginReducer,
    forgetPassword: forgotPasswordReducer,
    reserPassword: resetPasswordReducer,
    emailChange: emailChangeReducer,
  },
});

export default store;
