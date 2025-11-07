import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { RootState } from "../store";

type Peran = {
  idperan: string;
  namaperan: string;
};
type PeranState = {
  daftarPeran: Peran[];
  loading: boolean;
};

export const fetchPeran = createAsyncThunk("peran/fetchPeran", async () => {
  const response = await api.get("/peran").then((res) => res.data);
  return response;
});

const initialState: PeranState = {
  daftarPeran: [],
  loading: false,
};
export const peranSlice = createSlice({
  name: "sesi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeran.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeran.fulfilled, (state, action) => {
        state.loading = false;
        state.daftarPeran = action.payload;
      })
      .addCase(fetchPeran.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getPeran = (state: RootState) => state.sesi.daftarPeran;
export const getLoadingPeran = (state: RootState) => state.sesi.loading;

export default peranSlice.reducer;
