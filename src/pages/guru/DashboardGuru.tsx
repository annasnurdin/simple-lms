import { NavLink } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { getNama } from "../../redux/authSlice";

export default function DashboardGuru() {
  const namaUser = useAppSelector(getNama);

  return (
    <div className="p-4 sm:p-10 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl font-black my-4">
        Halo Pak Guru {namaUser}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <NavLink
          to="/guru/kelola-materi"
          className="border-t-4 border-t-red-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Kelola Materi</h5>
        </NavLink>

        <NavLink
          to="/guru/kelola-tugas"
          className="border-t-4 border-t-orange-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Kelola Tugas</h5>
        </NavLink>

        <NavLink
          to="/guru/kelola-ujian"
          className="border-t-4 border-t-lime-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Kelola Ujian</h5>
        </NavLink>

        <NavLink
          to="/guru/generate-presensi"
          className="border-t-4 border-t-green-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Presensi</h5>
        </NavLink>

        <NavLink
          to="/guru/pendaftar"
          className="border-t-4 border-t-teal-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Pendaftar</h5>
        </NavLink>

        <NavLink
          to="/guru/kelola-siswa"
          className="border-t-4 border-t-amber-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Kelola Siswa</h5>
        </NavLink>

        <NavLink
          to="/guru/penilaian"
          className="border-t-4 border-t-blue-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Penilaian</h5>
        </NavLink>

        <NavLink
          to="/guru/kehadiran"
          className="border-t-4 border-t-rose-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Kehadiran</h5>
        </NavLink>
      </div>
    </div>
  );
}
