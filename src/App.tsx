import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import LandingDaftar from "./pages/pendaftaran/LandingDaftar";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import LayoutSiswa from "./layout/LayoutSiswa";
import LayoutGuru from "./layout/LayoutGuru";
import DaftarUlang from "./pages/pendaftaran/DaftarUlang";
import NotFound from "./pages/NotFound";
import Register from "./pages/pendaftaran/Register";
import RequireAuth from "./router/RequireAuth";
import { Suspense, lazy } from "react";

// Siswa Pages
const Dashboard = lazy(() => import("./pages/siswa/Dashboard"));
const Materi = lazy(() => import("./pages/siswa/Materi"));
const Presensi = lazy(() => import("./pages/siswa/Presensi"));
const Tugas = lazy(() => import("./pages/siswa/Tugas"));
const Ujian = lazy(() => import("./pages/siswa/Ujian"));

// Guru Pages
const Admin = lazy(() => import("./pages/guru/Admin"));
const DashboardGuru = lazy(() => import("./pages/guru/DashboardGuru"));
const KelolaMateri = lazy(() => import("./pages/guru/KelolaMateri"));
const KelolaUjian = lazy(() => import("./pages/guru/KelolaUjian"));
const GeneratePresensi = lazy(() => import("./pages/guru/GeneratePresensi"));
const KelolaTugas = lazy(() => import("./pages/guru/KelolaTugas"));
const Penilaian = lazy(() => import("./pages/guru/Penilaian"));
const CalonSiswa = lazy(() => import("./pages/guru/CalonSiswa"));
const KelolaSiswa = lazy(() => import("./pages/guru/KelolaSiswa"));
const Kehadiran = lazy(() => import("./pages/guru/Kehadiran"));

export default function App() {
  return (
    // Store dari redux
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {/* Route Tanpa Login */}
            <Route path="/" element={<LandingDaftar />} />

            <Route element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/daftar-ulang" element={<DaftarUlang />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* Route Login*/}
            <Route element={<RequireAuth role="Siswa" />}>
              <Route path="/siswa" element={<LayoutSiswa />}>
                {/* Default route jika ke /siswa => /siswa/dashboard */}
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
                <Route
                  path="generate-presensi"
                  element={<GeneratePresensi />}
                />
                <Route path="penilaian" element={<Penilaian />} />
                <Route path="pendaftar" element={<CalonSiswa />} />
                <Route path="kelola-siswa" element={<KelolaSiswa />} />
                <Route path="kehadiran" element={<Kehadiran />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
