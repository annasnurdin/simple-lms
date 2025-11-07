import { useEffect, useState } from "react";
import type { Tugas } from "../guru/KelolaTugas";
import api from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { getStack } from "../../redux/authSlice";

export default function Tugas() {
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<string | number>(0);

  const idStack = useAppSelector(getStack);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api
        .get("/tugas")
        .then((res) => res.data)
        .then((data) => data.filter((item: Tugas) => item.id_stack == idStack));
      // console.log(response);
      setDaftarTugas(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = (id: number | string) => {
    setOpenId((prev) => (prev === id ? 0 : id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70dvh]">
        <h1 className="text-2xl font-bold">Loading Data</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-2 p-2">
      <h1 className="font-black my-3 text-4xl">Daftar Tugas</h1>

      <div className="block w-full">
        {daftarTugas.map((item) => (
          <div key={item.id}>
            <div
              onClick={() => handleToggle(item.id)}
              className="flex items-center justify-between w-full py-5 cursor-pointer border-t border-gray-300"
            >
              {item.soal}
              <i
                className={`fa-solid fa-chevron-up transition-transform duration-300 ${
                  openId === item.id ? "rotate-0" : "rotate-180"
                }`}
              ></i>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openId === item.id
                  ? "max-h-100 opacity-100 border-b border-gray-200"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="mb-5 text-sm text-gray-500 p-2">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
