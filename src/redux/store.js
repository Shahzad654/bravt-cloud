import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apis/authSlice";
import billingReducer from "./apis/billingInfo";
import loginReducer from "./apis/loginSlice";
import userReducer from "./apis/userSlice";
import forgotPasswordReducer from "./apis/forgetSlice";
import resetPasswordReducer from "./apis/resetSlice";
import emailChangeReducer from "./apis/changeEmail";
import transactionsReducer from "./apis/transactionsSlice";
import regionsReducer from "./apis/regionsSlice";
import planReducer from "./apis/planSlice";
import imagesReducer from "./apis/imagesSlice";
import allInstanceReducer from "./apis/getAllInstanceSlice";

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
    regions: regionsReducer,
    plan: planReducer,
    images: imagesReducer,
    allInstance:allInstanceReducer
  },
});

export default store;
