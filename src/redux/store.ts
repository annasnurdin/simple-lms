import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { resourceSlice } from "./resourceSlice";

const rootReducer = combineSlices(authSlice, resourceSlice);
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
