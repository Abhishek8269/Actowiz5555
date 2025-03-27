import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import apiReducer from "./apiSlice"
import tokenReducer from "./tokenSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    token: tokenReducer,
  },
});

export default store;