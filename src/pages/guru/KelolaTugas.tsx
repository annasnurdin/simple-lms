import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { idToStack } from "../../utils/IdStackToStack";
import api from "../../api/axios";
import Modal from "../../components/Modal";
import { nanoid } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { alltugas, type Tugas } from "../../redux/resourceSlice";
import { fetchAllTugas } from "../../redux/resourceThunk";

export default function KelolaTugas() {
  // const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValue, setFormValue] = useState({
    soal: "",
    deskripsi: "",
    stack: 0,
  });
  const [idEdit, setIdEdit] = useState<string | number>("");

  const dispatch = useAppDispatch();
  const daftarTugas = useAppSelector(alltugas);

  // const fetchData = async () => {
  //   const response = await api.get("/tugas").then((res) => res.data);
  //   // console.log(response);
  //   setDaftarTugas(response);
  // };
  useEffect(() => {
    if (!daftarTugas || daftarTugas.length === 0) {
      dispatch(fetchAllTugas());
    }
    // fetchData();
  }, []);

  const bukaModal = () => {
    setShowModal(true);
    setIsEdit(false);
    setFormValue({
      soal: "",
      stack: 0,
      deskripsi: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "stack") {
      setFormValue((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  const tambahTugas = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTugas = {
      id: isEdit ? idEdit : nanoid(),
      id_stack: formValue.stack,
      id_guru: 101,
      soal: formValue.soal,
      deskripsi: formValue.deskripsi,
    };
    if (isEdit) {
      try {
        const response = await api
          .put(`/tugas/${idEdit}`, newTugas)
          .then((res) => res.data);
        if (response) {
          Swal.fire({
            title: "Berhasil Mengubah Tugas",
            text: "Jangan lupa beritahu siswa tugas yang sudah diubah",
            icon: "success",
          });
          setShowModal(false);
          setFormValue({
            soal: "",
            stack: 0,
            deskripsi: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await api
          .post("/tugas", newTugas)
          .then((res) => res.data);
        if (response) {
          Swal.fire({
            title: "Berhasil Menambah Tugas",
            text: "Jangan lupa beritahu siswa Tugas barunya",
            icon: "success",
          });
          setShowModal(false);
          setFormValue({
            soal: "",
            stack: 0,
            deskripsi: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    // fetchData();
    dispatch(fetchAllTugas());
  };

  const handleEdit = (tugas: Tugas) => {
    setShowModal(true);
    setIsEdit(true);
    setFormValue({
      soal: tugas.soal,
      stack: tugas.id_stack,
      deskripsi: tugas.deskripsi,
    });
    setIdEdit(tugas.id);
  };

  const handleDelete = (id: number | string) => {
    Swal.fire({
      title: "Apakah kanda yakin?",
      text: "Setelah dihapus, kanda harus input lagi",
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
            .delete(`/tugas/${id}`)
            .then((res) => res.data);
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Tugas Sudah Dihapus",
              icon: "success",
              confirmButtonText: "Baik",
            });
            // fetchData();
            dispatch(fetchAllTugas());
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form className="flex flex-col gap-2" onSubmit={tambahTugas}>
            <input
              type="text"
              name="soal"
              placeholder="Judul Soal"
              className="inputan"
              value={formValue.soal}
              onChange={handleChange}
            />
            <textarea
              name="deskripsi"
              placeholder="Deskripsi Soal"
              className="inputan h-[10em]"
              value={formValue.deskripsi}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <label htmlFor="fe">
                <input
                  type="radio"
                  name="stack"
                  id="fe"
                  value={1}
                  onChange={handleChange}
                  checked={formValue.stack === 1}
                />
                Frontend
              </label>
              <label htmlFor="be">
                <input
                  type="radio"
                  name="stack"
                  id="be"
                  value={2}
                  onChange={handleChange}
                  checked={formValue.stack === 2}
                />
                Backend
              </label>
            </div>
            <button
              className={`btn ${
                isEdit
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isEdit ? "Update" : "Tambah Soal"}
            </button>
          </form>
        </Modal>
      )}
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="font-black mt-3 text-4xl">Kelola Tugas</h1>

        <div className="w-4/5 mx-auto">
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white my-3"
            onClick={bukaModal}
          >
            Tambah Tugas
          </button>
          <div className="rounded-t-lg overflow-hidden">
            <table className="border-collapse border border-gray-400  w-full">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-gray-300 p-2 w-[70%]">Tugas</th>
                  <th className="border border-gray-300 p-2 w-[10%]">Stack</th>
                  <th className="border border-gray-300 p-2 w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarTugas.map((tugas) => (
                  <tr key={tugas.id} className="odd:bg-gray-100">
                    <td className="border border-gray-300 p-2">{tugas.soal}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {idToStack(tugas.id_stack)}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-start gap-2">
                      <button
                        className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() => handleEdit(tugas)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleDelete(tugas.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
