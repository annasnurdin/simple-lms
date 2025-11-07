import { useEffect, useState } from "react";
import api from "../../api/axios";
import { formatJamMenit } from "../../utils/FormatJam";

type SiswaHadir = {
  id: number;
  id_siswa: string;
  nama_siswa: string;
  tanggal: string;
  waktu_masuk: string;
};

export default function Kehadiran() {
  const [daftarSiswa, setDaftarSiswa] = useState<SiswaHadir[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/kehadiran").then((res) => res.data);
      setDaftarSiswa(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70dvh]">
        <h1 className="text-2xl font-bold">Loading Data</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full ">
      <div className="w-full overflow-x-auto lg:w-11/12">
        <div className="rounded-t-lg overflow-hidden min-w-max ">
          <table className="border-collapse border border-gray-400  w-full">
            <thead>
              <tr className="bg-blue-300">
                <th className="border border-gray-300 p-2">Nama</th>
                <th className="border border-gray-300 p-2">Tanggal</th>
                <th className="border border-gray-300 p-2">Waktu Masuk</th>
              </tr>
            </thead>
            <tbody>
              {daftarSiswa.map((item) => (
                <tr key={item.id} className="odd:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.nama_siswa}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.tanggal}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {formatJamMenit(item.waktu_masuk)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
