import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type InitState = {
  token: string;
  role: string;
  nama: string;
  stack: number | string;
  id: string | number;
};

const initialState: InitState = {
  token: "",
  role: "",
  nama: "",
  stack: "",
  id: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setNama: (state, action: PayloadAction<string>) => {
      state.nama = action.payload;
    },
    setStack: (state, action: PayloadAction<string | number>) => {
      state.stack = action.payload;
    },
    setIDPengguna: (state, action: PayloadAction<string | number>) => {
      state.id = action.payload;
    },
  },
});

export const getToken = (state: RootState) => state.auth.token;
export const getRole = (state: RootState) => state.auth.role;
export const getNama = (state: RootState) => state.auth.nama;
export const getStack = (state: RootState) => state.auth.stack;
export const getIDPengguna = (state: RootState) => state.auth.id;

export const { setToken, setRole, setNama, setStack, setIDPengguna } =
  authSlice.actions;
export default authSlice.reducer;
