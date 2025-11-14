import { startTransition, useOptimistic, useState } from "react";
import type { ProgresMateri } from "./Materi";
import api from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { getIDPengguna, getStack } from "../../redux/authSlice";

type LeftSideBarProps = {
  materi: ProgresMateri[];
  idMateri: number | string | undefined;
  pilihMateri: (materi: ProgresMateri) => void;
  fetchData: (index: number) => void;
};
type OptimisticAction = { id: number | string; newStatus: boolean };

export default function LeftSideBar({
  materi,
  idMateri,
  pilihMateri,
  fetchData,
}: LeftSideBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [optimisticMateri, setOptimisticMateri] = useOptimistic(
    //materi dimabil dari array ==> jadi state di callbackFN
    materi,
    //state ini === materi
    //action => mau dimodifikasi bagaimana UI optimistic nya
    (state, action: OptimisticAction) => {
      return state.map((item) =>
        //cari id materi yang sama dengan action.id
        //kalau sudah ketemu, tambahkan statusnya langsung.
        item.id === action.id ? { ...item, status: action.newStatus } : item
      );
    }
  );
  // useEffect(() => {
  //   console.log(optimisticMateri);
  // }, [optimisticMateri]);

  const id_stack = useAppSelector(getStack);
  const id_pengguna = useAppSelector(getIDPengguna);

  const handlePilihMateri = (item: ProgresMateri) => {
    pilihMateri(item);
    //kalau mobile, tutup
    if (window.innerWidth < 800) {
      setMenuOpen(false);
    }
  };

  const handleDoneMateri = async (
    id_materi: string | number,
    currentStatus: boolean,
    idProgres: string | number | boolean
  ) => {
    const status = !currentStatus;
    const index = optimisticMateri.findIndex((item) => item.id === id_materi);
    // console.log(index);
    //dibungkus dalam startTransition
    startTransition(() => {
      setOptimisticMateri({ id: id_materi, newStatus: status });
    });
    try {
      if (!idProgres) {
        //kalau idProgress belum ada, buat baru
        await api.post("/progres_materi", {
          id_stack,
          id_pengguna,
          id_materi,
          status,
        });
      } else {
        //kalau sudah pernah centang, ubah status saja
        await api.patch(`/progres_materi/${idProgres}`, {
          status,
        });
      }
    } catch (error) {
      console.log(error);
    }

    fetchData(index);
  };

  return (
    // medium 1/3, large 20%, small full, relative biar ngangkat
    <div className="md:w-1/3 lg:w-[20%] w-full relative bg-gray-800">
      {/* medium ke atas jangan tampilkan bar nya */}
      <div className="p-4 md:hidden flex justify-between items-center bg-gray-100 border-b border-gray-300">
        <h2 className="text-lg font-bold text-gray-800">Daftar Materi</h2>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg"
        >
          {menuOpen ? (
            <i className="text-2xl text-blue-700 fa-solid fa-xmark"></i>
          ) : (
            <i className="text-2xl text-blue-700 fa-solid fa-bars"></i>
          )}
        </button>
      </div>

      {/* small full width, kalau menu open, tampilkan, kalau tidak => hide */}
      <div
        className={`w-full ${
          menuOpen ? "block" : "hidden"
        } md:block md:min-h-screen`}
        id="sidebar-menu"
      >
        <aside className="w-full bg-gray-800 text-white p-6 shadow-xl md:min-h-screen">
          <h2 className="text-xl font-extrabold mb-4 border-b border-gray-700 pb-2 text-blue-300">
            Daftar Materi
          </h2>
          <ul className="space-y-1">
            {optimisticMateri.map((item) => (
              <li
                key={item.id}
                className={`flex justify-between
                  mb-2 p-3 rounded-lg text-sm transition-colors duration-200
                  hover:bg-gray-700 cursor-pointer 
                  ${
                    item.id === idMateri
                      ? "bg-blue-600 font-semibold shadow-lg text-white"
                      : "hover:text-blue-400"
                  } 
                `}
                onClick={() => handlePilihMateri(item)}
              >
                <p>{item.judul_materi}</p>
                <input
                  type="checkbox"
                  className="inputan"
                  checked={item.status}
                  onChange={() =>
                    handleDoneMateri(item.id, item.status, item.id_progres)
                  }
                />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
