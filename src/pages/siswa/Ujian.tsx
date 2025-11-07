import { useEffect, useState } from "react";
import api from "../../api/axios";
import type { Ujian } from "../guru/KelolaUjian";
import { useAppSelector } from "../../redux/hooks";
import { getStack } from "../../redux/authSlice";

export default function Ujian() {
  const [daftarUjian, setDaftarUjian] = useState<Ujian[]>([]);
  const [openId, setOpenId] = useState(0);
  const [loading, setLoading] = useState(false);

  const idStack = useAppSelector(getStack);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api
        .get("/ujian")
        .then((res) => res.data)
        .then((data) => data.filter((item: Ujian) => item.id_stack == idStack));
      // console.log(response);
      setDaftarUjian(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = (id: number) => {
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
      <h1 className="text-xl font-bold mb-4">Ujian Codean</h1>

      <div className="block w-full">
        {daftarUjian.map((item) => (
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
              <p className="mb-5 text-sm text-gray-500 p-2">
                {item.keterangan}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
