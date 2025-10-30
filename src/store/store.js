import { configureStore } from "@reduxjs/toolkit";
import windowManagerReducer from "./windowManagerSlice";

export const store = configureStore({
  reducer: {
    windowManager: windowManagerReducer,
  },
});
