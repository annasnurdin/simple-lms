import { useEffect } from "react";
import api from "../../api/axios";
import { idToStack } from "../../utils/IdStackToStack";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allsiswa, getLoading } from "../../redux/resourceSlice";
import { fetchAllSiswa } from "../../redux/resourceThunk";

export default function KelolaSiswa() {
  // const [daftarSiswa, setDaftarSiswa] = useState<Siswa[]>([]);
  // const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const daftarSiswa = useAppSelector(allsiswa);
  const loading = useAppSelector(getLoading);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await api
  //       .get("/users")
  //       .then((res) => res.data)
  //       .then((data) => data.filter((item: Siswa) => item.role === "Siswa"));
  //     // console.log(response);
  //     setDaftarSiswa(response);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    // fetchData();
    if (!daftarSiswa || daftarSiswa.length === 0) {
      dispatch(fetchAllSiswa());
    }
  }, []);

  const handleDelete = (id: string | number) => {
    Swal.fire({
      title: "Apakah kanda yakin?",
      text: "Setelah dihapus, kanda harus minta siswa input lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Iya, hapus saja",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // FUNGSI HAPUS KE API
        try {
          const response = await api
            .delete(`/users/${id}`)
            .then((res) => res.data);
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Siswa Sudah Dihapus",
              icon: "success",
              confirmButtonText: "Baik",
            });
            // fetchData();
            dispatch(fetchAllSiswa());
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

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
                <th className="border border-gray-300 p-2">Stack</th>
                <th className="border border-gray-300 p-2">Nama Lengkap</th>
                <th className="border border-gray-300 p-2">Jenis Kelamin</th>
                <th className="border border-gray-300 p-2">No HP</th>
                <th className="border border-gray-300 p-2">
                  Institusi Pendidikan
                </th>
                <th className="border border-gray-300 p-2">Jenjang</th>
                <th className="border border-gray-300 p-2">Jurusan</th>
                <th className="border border-gray-300 p-2">Level</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {daftarSiswa.map((item) => (
                <tr key={item.id} className="odd:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.stack === "FE" ? "FE" : idToStack(item.stack)}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.nama_lengkap}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.jenis_kelamin}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    0{item.no_wa}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.detail_siswa.nama_sekolah}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.detail_siswa.pendidikan}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.detail_siswa.jurusan}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.detail_siswa.pengetahuan_koding}
                  </td>
                  <td className="flex justify-around border border-gray-300 p-2 text-center">
                    <button
                      className="btn bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
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
