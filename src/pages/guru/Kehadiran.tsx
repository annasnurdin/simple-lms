import { useEffect } from "react";
import { formatJamMenit } from "../../utils/FormatJam";
import { getLoading, siswahadir } from "../../redux/resourceSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchKehadiran } from "../../redux/resourceThunk";

export default function Kehadiran() {
  // const [daftarSiswa, setDaftarSiswa] = useState<SiswaHadir[]>([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoading);
  const daftarSiswa = useAppSelector(siswahadir);

  useEffect(() => {
    // fetchData();
    if (!daftarSiswa || daftarSiswa.length === 0) {
      dispatch(fetchKehadiran());
    }
  }, [dispatch, daftarSiswa]);

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
