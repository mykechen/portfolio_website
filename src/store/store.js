import { configureStore } from "@reduxjs/toolkit";
import windowManagerReducer from "./windowManagerSlice";
import messagesReducer from "./messagesSlice";

export const store = configureStore({
  reducer: {
    windowManager: windowManagerReducer,
    messages: messagesReducer,
  },
});
