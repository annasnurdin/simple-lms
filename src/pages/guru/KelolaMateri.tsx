import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { idToStack } from "../../utils/IdStackToStack";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allmateri, type Materi } from "../../redux/resourceSlice";
import { fetchAllMateri } from "../../redux/resourceThunk";

export default function KelolaMateri() {
  // const [daftarMateri, setDaftarMateri] = useState<Materi[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValue, setFormValue] = useState({
    judul: "",
    deskripsi: "",
    stack: 0,
  });
  const [idEdit, setIdEdit] = useState<string | number>("");
  const dispatch = useAppDispatch();
  const daftarMateri = useAppSelector(allmateri);

  // const fetchData = async () => {
  //   const response = await api.get("/materi").then((res) => res.data);
  //   // console.log(response);
  //   setDaftarMateri(response);
  // };
  useEffect(() => {
    // fetchData();
    if (!daftarMateri || daftarMateri.length === 0) {
      dispatch(fetchAllMateri());
    }
    
  }, []);

  const bukaModal = () => {
    setShowModal(true);
    setIsEdit(false);
    setFormValue({
      judul: "",
      deskripsi: "",
      stack: 0,
    });
  };

  const handleEdit = (materi: Materi) => {
    setShowModal(true);
    setIsEdit(true);
    setFormValue({
      judul: materi.judul_materi,
      deskripsi: materi.deskripsi_materi,
      stack: materi.id_stack,
    });
    setIdEdit(materi.id);
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
            .delete(`/materi/${id}`)
            .then((res) => res.data);
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Materi Sudah Dihapus",
              icon: "success",
              confirmButtonText: "Baik",
            });
            // fetchData();
            dispatch(fetchAllMateri());
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const tambahMateri = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMateri = {
      id: isEdit ? idEdit : nanoid(),
      id_stack: formValue.stack,
      judul_materi: formValue.judul,
      deskripsi_materi: formValue.deskripsi,
    };
    if (isEdit) {
      try {
        const response = await api
          .put(`/materi/${idEdit}`, newMateri)
          .then((res) => res.data);
        if (response) {
          Swal.fire({
            title: "Berhasil Mengubah Materi",
            text: "Jangan lupa beritahu siswa materi yang sudah diubah",
            icon: "success",
          });
          setShowModal(false);
          setFormValue({
            judul: "",
            deskripsi: "",
            stack: 0,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await api
          .post("/materi", newMateri)
          .then((res) => res.data);
        if (response) {
          Swal.fire({
            title: "Berhasil Menambah Materi",
            text: "Jangan lupa beritahu siswa materi barunya",
            icon: "success",
          });
          setShowModal(false);
          setFormValue({
            judul: "",
            deskripsi: "",
            stack: 0,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    // fetchData();
    dispatch(fetchAllMateri());
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

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form className="flex flex-col gap-2" onSubmit={tambahMateri}>
            <input
              type="text"
              name="judul"
              placeholder="Judul Materi"
              className="inputan"
              value={formValue.judul}
              onChange={handleChange}
            />
            <textarea
              name="deskripsi"
              placeholder="Deskripsi Materi (pakai format markdown)"
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
        <h1 className="font-black mt-3 text-4xl">Kelola Materi</h1>
        <div className="w-4/5 mx-auto">
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white my-3"
            onClick={bukaModal}
          >
            Tambah Materi
          </button>
          <div className="rounded-t-lg overflow-hidden">
            <table className="border-collapse border border-gray-400  w-full">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-gray-300 p-2 w-[70%]">Materi</th>
                  <th className="border border-gray-300 p-2 w-[10%]">Stack</th>
                  <th className="border border-gray-300 p-2 w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarMateri.map((materi) => (
                  <tr key={materi.id} className="odd:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {materi.judul_materi}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {idToStack(materi.id_stack)}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-start gap-2">
                      <button
                        className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() => handleEdit(materi)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleDelete(materi.id)}
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
