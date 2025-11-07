import { NavLink } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { getNama } from "../../redux/authSlice";

export default function Dashboard() {
  const namaUser = useAppSelector(getNama);
  return (
    <div className="min-h-[80dvh] p-4 sm:p-10 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl font-black my-4">Halo {namaUser}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <NavLink
          to="/siswa/materi"
          className="w-full border-t-4 border-t-green-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Materi</h5>
        </NavLink>

        <NavLink
          to="/siswa/tugas"
          className="w-full border-t-4 border-t-amber-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Tugas</h5>
        </NavLink>

        <NavLink
          to="/siswa/ujian"
          className="w-full border-t-4 border-t-red-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Ujian</h5>
        </NavLink>

        <NavLink
          to="/siswa/presensi"
          className="w-full border-t-4 border-t-blue-600 p-6 sm:px-10 sm:py-8 bg-white border border-gray-200 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <h5 className="mb-2 text-2xl sm:text-3xl font-bold">Presensi</h5>
        </NavLink>
      </div>
    </div>
  );
}
