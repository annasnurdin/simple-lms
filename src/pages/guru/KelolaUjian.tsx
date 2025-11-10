import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { idToStack } from "../../utils/IdStackToStack";
import api from "../../api/axios";
import { nanoid } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";
import { allujian, type Ujian } from "../../redux/resourceSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllUjian } from "../../redux/resourceThunk";

export default function KelolaUjian() {
  // const [daftarUjian, setDaftarUjian] = useState<Ujian[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValue, setFormValue] = useState({
    soal: "",
    keterangan: "",
    stack: 0,
  });
  const [idEdit, setIdEdit] = useState<string | number>("");

  const dispatch = useAppDispatch();
  const daftarUjian = useAppSelector(allujian);

  // const fetchData = async () => {
  //   const response = await api.get("/ujian").then((res) => res.data);
  //   // console.log(response);
  //   setDaftarUjian(response);
  // };
  useEffect(() => {
    if (!daftarUjian || daftarUjian.length === 0) {
      dispatch(fetchAllUjian());
    }
    // fetchData();
  }, []);

  const bukaModal = () => {
    setShowModal(true);
    setIsEdit(false);
    setFormValue({
      soal: "",
      stack: 0,
      keterangan: "",
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

  const tambahUjian = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUjian = {
      id: isEdit ? idEdit : nanoid(),
      id_stack: formValue.stack,
      soal: formValue.soal,
      keterangan: formValue.keterangan,
    };
    if (isEdit) {
      try {
        const response = await api
          .put(`/ujian/${idEdit}`, newUjian)
          .then((res) => res.data);
        if (response) {
          Swal.fire({
            title: "Berhasil Mengubah Ujian",
            text: "Jangan lupa beritahu siswa Ujian yang sudah diubah",
            icon: "success",
          });
          setShowModal(false);
          setFormValue({
            soal: "",
            stack: 0,
            keterangan: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await api
          .post("/tugas", newUjian)
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
            keterangan: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    // fetchData();
    dispatch(fetchAllUjian());
  };

  const handleEdit = (ujian: Ujian) => {
    setShowModal(true);
    setIsEdit(true);
    setFormValue({
      soal: ujian.soal,
      stack: ujian.id_stack,
      keterangan: ujian.keterangan,
    });
    setIdEdit(ujian.id);
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
            .delete(`/ujian/${id}`)
            .then((res) => res.data);
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Ujian Sudah Dihapus",
              icon: "success",
              confirmButtonText: "Baik",
            });
            // fetchData();
            dispatch(fetchAllUjian());
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
          <form className="flex flex-col gap-2" onSubmit={tambahUjian}>
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
              value={formValue.keterangan}
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
        <h1 className="font-black mt-3 text-4xl">Kelola Ujian</h1>

        <div className="w-4/5 mx-auto">
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white my-3"
            onClick={bukaModal}
          >
            Tambah Ujian
          </button>
          <div className="rounded-t-lg overflow-hidden">
            <table className="border-collapse border border-gray-400  w-full">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-gray-300 p-2 w-[70%]">Ujian</th>
                  <th className="border border-gray-300 p-2 w-[10%]">Stack</th>
                  <th className="border border-gray-300 p-2 w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarUjian.map((ujian) => (
                  <tr key={ujian.id} className="odd:bg-gray-100">
                    <td className="border border-gray-300 p-2">{ujian.soal}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {idToStack(ujian.id_stack)}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-start gap-2">
                      <button
                        className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() => handleEdit(ujian)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleDelete(ujian.id)}
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
