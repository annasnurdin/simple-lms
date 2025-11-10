import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllMateri,
  fetchAllProgress,
  fetchAllSiswa,
  fetchAllTugas,
  fetchAllUjian,
  fetchHasilTugas,
  fetchHasilUjian,
} from "./resourceThunk";
import type { RootState } from "./store";

export interface Materi {
  id: number | string;
  id_stack: 1 | 2;
  judul_materi: string;
  deskripsi_materi: string;
}
export interface Tugas {
  id: number | string;
  id_stack: 1 | 2;
  id_guru: number | string;
  soal: string;
  deskripsi: string;
}
export interface Ujian {
  id: number;
  id_stack: 1 | 2;
  soal: string;
  keterangan: string;
}

type DetailSiswa = {
  nama_sekolah: string;
  jurusan: string;
  pendidikan: "SMA" | "D3" | "S1" | string;
  pengetahuan_koding: "nol" | "sedang" | "pemula" | "lanjut";
};

export type Siswa = {
  id: number;
  role: "Siswa" | "Guru";
  nama_lengkap: string;
  no_wa: string;
  jenis_kelamin: "L" | "P" | string;
  stack: "FE" | "BE";
  detail_siswa: DetailSiswa;
};

export type NilaiTugas = {
  id: number | string;
  id_pengguna: number | string;
  nama_pengguna: string;
  id_tugas: number | string;
  nilai: number | string;
};
export type NilaiUjian = {
  id: number | string;
  id_pengguna: number | string;
  nama_pengguna: string;
  id_ujian: number | string;
  nilai: number | string;
};
export interface TugasDanNilai extends Tugas {
  nilai?: number | string;
  idNilai?: string | number;
}
export interface UjianDanNilai extends Ujian {
  nilai?: number | string;
  idNilai?: string | number;
}
export interface ProgresMateri extends Materi {
  status: boolean;
  id_materi?: string | number;
  id_progres: string | number | boolean;
}

type InitState = {
  allmateri: Materi[];
  alltugas: Tugas[];
  tugasStack: Tugas[];
  allujian: Ujian[];
  allpendaftar: [];
  allsiswa: Siswa[];
  hasilTugas: NilaiTugas[];
  hasilUjian: NilaiUjian[];
  progresMateri: ProgresMateri[];
  loading: boolean;
};

const initialState: InitState = {
  allmateri: [],
  alltugas: [],
  tugasStack: [],
  allujian: [],
  allpendaftar: [],
  allsiswa: [],
  hasilTugas: [],
  hasilUjian: [],
  progresMateri: [],
  loading: false,
};

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //materi
      .addCase(fetchAllMateri.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMateri.fulfilled, (state, action) => {
        state.loading = false;
        state.allmateri = action.payload;
      })
      .addCase(fetchAllMateri.rejected, (state) => {
        state.loading = false;
      })
      //tugas
      .addCase(fetchAllTugas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTugas.fulfilled, (state, action) => {
        state.loading = false;
        state.alltugas = action.payload;
      })
      .addCase(fetchAllTugas.rejected, (state) => {
        state.loading = false;
      })
      //ujian
      .addCase(fetchAllUjian.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUjian.fulfilled, (state, action) => {
        state.loading = false;
        state.allujian = action.payload;
      })
      .addCase(fetchAllUjian.rejected, (state) => {
        state.loading = false;
      })
      //all siswa
      .addCase(fetchAllSiswa.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSiswa.fulfilled, (state, action) => {
        state.loading = false;
        state.allsiswa = action.payload;
      })
      .addCase(fetchAllSiswa.rejected, (state) => {
        state.loading = false;
      })
      //hasil tugas
      .addCase(fetchHasilTugas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHasilTugas.fulfilled, (state, action) => {
        state.loading = false;
        state.hasilTugas = action.payload;
      })
      .addCase(fetchHasilTugas.rejected, (state) => {
        state.loading = false;
      })
      //hasil ujian
      .addCase(fetchHasilUjian.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHasilUjian.fulfilled, (state, action) => {
        state.loading = false;
        state.hasilUjian = action.payload;
      })
      .addCase(fetchHasilUjian.rejected, (state) => {
        state.loading = false;
      })
      //progres materi
      .addCase(fetchAllProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.hasilUjian = action.payload;
      })
      .addCase(fetchAllProgress.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { } = resourceSlice.actions;
export const allmateri = (state: RootState) => state.resource.allmateri;
export const alltugas = (state: RootState) => state.resource.alltugas;
export const allujian = (state: RootState) => state.resource.allujian;
export const allsiswa = (state: RootState) => state.resource.allsiswa;
export const getLoading = (state: RootState) => state.resource.loading;
export const hasilTugas = (state: RootState) => state.resource.hasilTugas;
export const hasilUjian = (state: RootState) => state.resource.hasilUjian;
export const progresMateri = (state: RootState) => state.resource.progresMateri;
// export const tugasStack = (state: RootState, idStack: string | number) =>
//   (state.resource.tugasStack = state.resource.alltugas.filter(
//     (item) => item.id_stack === idStack
//   ));
export const tugasStack = (state: RootState, idStack: string | number) =>
  state.resource.alltugas.filter((item) => item.id_stack === idStack);
export default resourceSlice.reducer;
