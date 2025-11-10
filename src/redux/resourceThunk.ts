import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { Siswa } from "./resourceSlice";

export const fetchAllMateri = createAsyncThunk(
  "resource/fetchAllMateri",
  async () => {
    const response = await api.get("/materi").then((res) => res.data);
    return response;
  }
);

export const fetchAllTugas = createAsyncThunk(
  "resource/fetchAllTugas",
  async () => {
    const response = await api.get("/tugas").then((res) => res.data);
    return response;
  }
);

export const fetchAllUjian = createAsyncThunk(
  "resource/fetchAllUjian",
  async () => {
    const response = await api.get("/ujian").then((res) => res.data);
    return response;
  }
);

// export const fetchAllPendaftar = createAsyncThunk(
//   "resource/fetchAllPendaftar",
//   async () => {
//     const response = await api.get("/calonsiswa").then((res) => res.data);
//     return response;
//   }
// );

export const fetchAllSiswa = createAsyncThunk(
  "resource/fetchAllSiswa",
  async () => {
    const response = await api
      .get("/users")
      .then((res) => res.data)
      .then((data) => data.filter((item: Siswa) => item.role === "Siswa"));
    return response;
  }
);

export const fetchHasilTugas = createAsyncThunk(
  "resource/fetchHasilTugas",
  async () => {
    const response = await api.get("/hasil_tugas").then((res) => res.data);
    return response;
  }
);

export const fetchHasilUjian = createAsyncThunk(
  "resource/fetchHasilUjian",
  async () => {
    const response = await api.get("/hasil_ujian").then((res) => res.data);
    return response;
  }
);

export const fetchAllProgress = createAsyncThunk(
  "resource/fetchAllProgress",
  async () => {
    const response = await api.get("/progres_materi").then((res) => res.data);
    return response;
  }
);
