import { configureStore } from "@reduxjs/toolkit";
import { authReducer, themeReducer } from "./Slices";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    // chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
