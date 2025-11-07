import { useState, type FormEvent } from "react";
import { capitalizeFirst } from "../../utils/CapitalizeFirstLetter";
import { validateNomorHP } from "../../utils/ValidateNomorHP";
import api from "../../api/axios";
import { nanoid } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

type FormPendaftaranProps = {
  daftarUlang: boolean;
};
export default function FormPendaftaran({ daftarUlang }: FormPendaftaranProps) {
  // TODO: refactor ke dalam 1 state
  // const initialForm = {
  //   batch: ""
  //   nama
  // }
  // const [formValues, setFormValues] = useState({});
  const [batch, setBatch] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [nomorHP, setNomorHp] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [namaInstitusi, setNamaInstitusi] = useState("");
  const [pendidikan, setPendidikan] = useState("SMA");
  const [jurusan, setJurusan] = useState("");
  const [pengetahuan, setPengetahuan] = useState("");
  const [stack, setStack] = useState("");

  const tambahCalon = async () => {
    const calonSiswa = {
      id: nanoid(),
      batch,
      stack,
      namaLengkap,
      tanggalLahir,
      jenisKelamin,
      nomorHP,
      namaInstitusi,
      pendidikan,
      jurusan,
      pengetahuan,
    };
    try {
      const response = await api
        .post("/calonsiswa", calonSiswa)
        .then((res) => res.data);
      if (response) {
        Swal.fire({
          title: "Berhasil Mendaftar",
          text: "Silakan menunggu, admin akan menghubungi",
          icon: "success",
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const tambahSiswa = async () => {
    const siswa = {
      tanggalLahir,
      batch,
      role: "Siswa",
      nama_lengkap: namaLengkap,
      no_wa: nomorHP,
      jenis_kelamin: jenisKelamin,
      stack,
      detail_siswa: {
        nama_sekolah: namaInstitusi,
        jurusan: jurusan,
        pendidikan,
        pengetahuan_koding: pengetahuan,
      },
    };
    try {
      const response = await api.post("/users", siswa).then((res) => res.data);
      if (response) {
        Swal.fire({
          title: "Berhasil Daftar Ulang",
          text: "Silakan menunggu, admin akan menghubungi",
          icon: "success",
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (daftarUlang) {
      tambahSiswa();
    } else {
      tambahCalon();
    }
  };

  const resetForm = () => {
    setBatch("");
    setNamaLengkap("");
    setNomorHp("");
    setTanggalLahir("");
    setNamaInstitusi("");
    setPendidikan("SMA");
    setJurusan("");
    setPengetahuan("");
    setJenisKelamin("");
    setStack("");
  };

  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   if (name === "stack") {
  //     setFormValues((prev) => ({ ...prev, [name]: Number(value) }));
  //   } else {
  //     setFormValues((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  return (
    <form className="p-6 md:p-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
        <div className="flex flex-col mb-6">
          <label htmlFor="stack" className="label">
            Stack *
          </label>
          <select
            id="stack"
            name="stack"
            className="w-full inputan"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="FE">Frontend</option>
            <option value="BE">Backend</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="batch" className="label">
            Batch *
          </label>
          <select
            id="batch"
            name="batch"
            className="w-full inputan"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="b9">Batch #9</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="nama_lengkap" className="label">
            Nama Lengkap *
          </label>
          <input
            id="nama_lengkap"
            name="namaLengkap"
            type="text"
            placeholder="Nama Lengkap Anda"
            className="w-full inputan"
            value={capitalizeFirst(namaLengkap)}
            onChange={(e) => setNamaLengkap(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="nomor_hp" className="label">
            Nomor HP / WhatsApp *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
              +62
            </span>
            <input
              id="nomor_hp"
              name="nomorHP"
              type="number"
              placeholder="8123456789"
              className={`flex-1 inputan`}
              value={validateNomorHP(nomorHP)}
              onChange={(e) => setNomorHp(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="tanggal_lahir" className="label">
            Tanggal Lahir *
          </label>
          <input
            id="tanggal_lahir"
            name="tanggalLahir"
            type="date"
            placeholder="dd-mm-yyyy"
            className={`w-full inputan appearance-none`}
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="label">Jenis Kelamin *</label>
          <div className="flex space-x-6 pt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="jenisKelamin"
                value="pria"
                checked={jenisKelamin === "pria"}
                onChange={(e) => setJenisKelamin(e.target.value)}
                className={`form-radio h-4 w-4 text-pink-500 border-gray-300 `}
              />
              <span className="ml-2 text-gray-700">Pria</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="jenisKelamin"
                value="wanita"
                checked={jenisKelamin === "wanita"}
                onChange={(e) => setJenisKelamin(e.target.value)}
                className={`form-radio h-4 w-4 text-pink-500 border-gray-300 `}
              />
              <span className="ml-2 text-gray-700">Wanita</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="sekolah" className="label">
            Nama Sekolah / Universitas *
          </label>
          <input
            id="sekolah"
            name="sekolah"
            type="text"
            placeholder="Nama Institusi Pendidikan"
            className="w-full inputan"
            value={namaInstitusi}
            onChange={(e) => setNamaInstitusi(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="pendidikan" className="label">
            Pendidikan *
          </label>
          <select
            id="pendidikan"
            name="pendidikan"
            className="w-full inputan"
            value={capitalizeFirst(pendidikan)}
            onChange={(e) => setPendidikan(e.target.value)}
            required
          >
            <option value="SMA">SLTA / SMK / Sederajat</option>
            <option value="D3">D3</option>
            <option value="S1">S1</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="jurusan" className="label">
            Jurusan *
          </label>
          <input
            id="jurusan"
            name="jurusan"
            type="text"
            placeholder="Jurusan Pendidikan Anda"
            className="w-full inputan"
            value={capitalizeFirst(jurusan)}
            onChange={(e) => setJurusan(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="label">Pengetahuan Coding *</label>
          <div className="flex space-x-4 pt-2 text-sm">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="coding"
                value="nol"
                checked={pengetahuan === "nol"}
                onChange={(e) => setPengetahuan(e.target.value)}
                className={`form-radio h-4 w-4 text-pink-500 border-gray-300 `}
              />
              <span className="ml-1 text-gray-700">Nol</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="coding"
                value="pemula"
                checked={pengetahuan === "pemula"}
                onChange={(e) => setPengetahuan(e.target.value)}
                className={`form-radio h-4 w-4 text-pink-500 border-gray-300 `}
              />
              <span className="ml-1 text-gray-700">Pemula</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="coding"
                value="sedang"
                checked={pengetahuan === "sedang"}
                onChange={(e) => setPengetahuan(e.target.value)}
                className={`form-radio h-4 w-4 text-pink-500 border-gray-300 `}
              />
              <span className="ml-1 text-gray-700">Sedang</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="coding"
                value="lanjut"
                checked={pengetahuan === "lanjut"}
                onChange={(e) => setPengetahuan(e.target.value)}
                className={`form-radio h-4 w-4 text-pink-500 border-gray-300 `}
              />
              <span className="ml-1 text-gray-700">Lanjut</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="btn bg-pink-500 hover:bg-pink-600 text-white"
        >
          Daftar
        </button>
      </div>
    </form>
  );
}
