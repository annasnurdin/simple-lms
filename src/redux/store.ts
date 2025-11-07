import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { peranSlice } from "./peran/peranSlice";
import { authSlice } from "./authSlice";

const rootReducer = combineSlices(peranSlice, authSlice);
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
