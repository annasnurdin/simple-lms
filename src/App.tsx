import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import LandingDaftar from "./pages/pendaftaran/LandingDaftar";
import Login from "./pages/login-register/Login";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/siswa/Dashboard";
import Admin from "./pages/guru/Admin";
import Materi from "./pages/siswa/Materi";
import LayoutSiswa from "./layout/LayoutSiswa";
import Presensi from "./pages/siswa/Presensi";
import Tugas from "./pages/siswa/Tugas";
import Ujian from "./pages/siswa/Ujian";
import LayoutGuru from "./layout/LayoutGuru";
import KelolaMateri from "./pages/guru/KelolaMateri";
import KelolaUjian from "./pages/guru/KelolaUjian";
import GeneratePresensi from "./pages/guru/GeneratePresensi";
import DaftarUlang from "./pages/pendaftaran/DaftarUlang";
import NotFound from "./pages/NotFound";
import KelolaTugas from "./pages/guru/KelolaTugas";
import Penilaian from "./pages/guru/Penilaian";
import DashboardGuru from "./pages/guru/DashboardGuru";
import CalonSiswa from "./pages/guru/CalonSiswa";
import KelolaSiswa from "./pages/guru/KelolaSiswa";
import Kehadiran from "./pages/guru/Kehadiran";
import Register from "./pages/login-register/Register";
import RequireAuth from "./router/RequireAuth";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingDaftar />} />

          <Route element={<MainLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/daftar-ulang" element={<DaftarUlang />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<RequireAuth role="Siswa" />}>
            <Route path="/siswa" element={<LayoutSiswa />}>
              <Route path="" element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="materi" element={<Materi />} />
              <Route path="presensi" element={<Presensi />} />
              <Route path="tugas" element={<Tugas />} />
              <Route path="ujian" element={<Ujian />} />
            </Route>
          </Route>
          <Route element={<RequireAuth role="Guru" />}>
            <Route path="/guru" element={<LayoutGuru />}>
              <Route path="" element={<Navigate to="dashboard" replace />} />
              <Route path="admin" element={<Admin />} />
              <Route path="dashboard" element={<DashboardGuru />} />
              <Route path="kelola-materi" element={<KelolaMateri />} />
              <Route path="kelola-ujian" element={<KelolaUjian />} />
              <Route path="kelola-tugas" element={<KelolaTugas />} />
              <Route path="generate-presensi" element={<GeneratePresensi />} />
              <Route path="penilaian" element={<Penilaian />} />
              <Route path="pendaftar" element={<CalonSiswa />} />
              <Route path="kelola-siswa" element={<KelolaSiswa />} />
              <Route path="kehadiran" element={<Kehadiran />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
