import { useEffect } from "react";
import api from "../../api/axios";
import { idToStack } from "../../utils/IdStackToStack";
import Swal from "sweetalert2";
import {
  allpendaftar,
  getLoading,
  type CalonSiswa,
} from "../../redux/resourceSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllCalonSiswa } from "../../redux/resourceThunk";

export default function CalonSiswa() {
  // const [daftarCalonSiswa, setDaftarCalonSiswa] = useState<CalonSiswa[]>([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoading);
  const daftarCalonSiswa = useAppSelector(allpendaftar);

  useEffect(() => {
    if (!daftarCalonSiswa || daftarCalonSiswa.length === 0) {
      dispatch(fetchAllCalonSiswa());
    }
  }, [dispatch, daftarCalonSiswa]);

  const hapusPendaftar = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api
            .delete(`/calonsiswa/${id}`)
            .then((res) => res.data);
          // console.log(response);
          if (response) {
            Swal.fire({
              title: "Terhapus!",
              text: "Calon Siswa Berhasil Dihapus",
              icon: "success",
            });
            // fetchData();
            dispatch(fetchAllCalonSiswa());
          }
        } catch (error) {
          console.log(error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Dibatalkan",
        });
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
                <th className="border border-gray-300 p-2">Batch</th>
                <th className="border border-gray-300 p-2">Stack</th>
                <th className="border border-gray-300 p-2">Nama Lengkap</th>
                <th className="border border-gray-300 p-2">Tanggal Lahir</th>
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
              {daftarCalonSiswa.map((item) => (
                <tr key={item.id} className="odd:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.batch}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {idToStack(item.stack)}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.namaLengkap}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.tanggalLahir}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.jenisKelamin}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    0{item.nomorHP}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.namaInstitusi}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.pendidikan}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.jurusan}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    {item.pengetahuan}
                  </td>
                  <td className="border border-gray-300 p-2 text-center capitalize">
                    <button
                      className="btn bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => hapusPendaftar(item.id)}
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
