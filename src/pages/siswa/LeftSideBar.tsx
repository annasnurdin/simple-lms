import { useState } from "react";
import type { Materi } from "../guru/KelolaMateri";

type LeftSideBarProps = {
  materi: Materi[];
  idMateri: number | string | undefined;
  pilihMateri: (materi: Materi) => void;
};

export default function LeftSideBar({
  materi,
  idMateri,
  pilihMateri,
}: LeftSideBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePilihMateri = (item: Materi) => {
    pilihMateri(item);
    //kalau mobile, tutup
    if (window.innerWidth < 800) {
      setMenuOpen(false);
    }
  };

  return (
    // medium 1/3, large 20%, small full, relative biar ngangkat
    <div className="md:w-1/3 lg:w-[20%] w-full relative">
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
        className={`w-full ${menuOpen ? "block" : "hidden"} md:block`}
        id="sidebar-menu"
      >
        <aside className="w-full bg-gray-800 text-white p-6 overflow-y-auto md:h-screen md:sticky md:top-0 shadow-xl">
          <h2 className="text-xl font-extrabold mb-4 border-b border-gray-700 pb-2 text-blue-300">
            Frontend
          </h2>
          <ul className="space-y-1">
            {materi.map((item) => (
              <li
                key={item.id}
                className={`
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
                {item.judul_materi}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
