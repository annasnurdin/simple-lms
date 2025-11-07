import { useEffect, useState } from "react";
import api from "../../api/axios";
import type { Siswa } from "./KelolaSiswa";
import type { Tugas } from "./KelolaTugas";
import axios from "axios";
import type { Ujian } from "./KelolaUjian";
import Swal from "sweetalert2";
import { nanoid } from "@reduxjs/toolkit";

type NilaiTugas = {
  id: number | string;
  id_pengguna: number | string;
  nama_pengguna: string;
  id_tugas: number | string;
  nilai: number | string;
};
type NilaiUjian = {
  id: number | string;
  id_pengguna: number | string;
  nama_pengguna: string;
  id_ujian: number | string;
  nilai: number | string;
};
interface TugasDanNilai extends Tugas {
  nilai?: number | string;
  idNilai?: string | number;
}
interface UjianDanNilai extends Ujian {
  nilai?: number | string;
  idNilai?: string | number;
}

export default function Penilaian() {
  const [daftarSiswa, setDaftarSiswa] = useState<Siswa[]>([]);
  const [siswa, setSiswa] = useState<Siswa | undefined>();

  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([]);
  const [daftarUjian, setDaftarUjian] = useState<Ujian[]>([]);

  const [nilaiTugas, setNilaiTugas] = useState<NilaiTugas[]>([]);
  const [nilaiUjian, setNilaiUjian] = useState<NilaiUjian[]>([]);

  const [ujianDanNilai, setUjianDanNilai] = useState<UjianDanNilai[]>([]);
  const [tugasDanNilai, setTugasDanNilai] = useState<TugasDanNilai[]>([]);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const requsers = await api.get("/users").then((res) => res.data);
      const reqsoaltugas = await api.get("/tugas").then((res) => res.data);
      const reqsoalujian = await api.get("/ujian").then((res) => res.data);
      const reqhasilujian = await api
        .get("/hasil_ujian")
        .then((res) => res.data);
      const reqhasiltugas = await api
        .get("/hasil_tugas")
        .then((res) => res.data);

      const [users, soaltugas, soalujian, hasilujian, hasiltugas] =
        await axios.all([
          requsers,
          reqsoaltugas,
          reqsoalujian,
          reqhasilujian,
          reqhasiltugas,
        ]);

      const siswa = users.filter((user: Siswa) => user.role === "Siswa");
      setDaftarSiswa(siswa);
      setDaftarTugas(soaltugas);
      setDaftarUjian(soalujian);
      setNilaiTugas(hasiltugas);
      setNilaiUjian(hasilujian);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const tampilkanNilai = (
    idSiswa: number | string,
    stack: string,
    siswa: Siswa
  ) => {
    setShow(true);
    setSiswa(siswa);
    const nilaiTugasSiswa = nilaiTugas.filter(
      (item) => item.id_pengguna === idSiswa
    );
    const nilaiUjianSiswa = nilaiUjian.filter(
      (item) => item.id_pengguna === idSiswa
    );
    const listTugas = daftarTugas.filter((item) => {
      if (stack == "FE") {
        return item.id_stack === 1;
      } else if (stack === "BE") {
        return item.id_stack === 2;
      }
    });
    const listUjian = daftarUjian.filter((item) => {
      if (stack == "FE") {
        return item.id_stack === 1;
      } else if (stack === "BE") {
        return item.id_stack === 2;
      }
    });
    const tugasplusnilai = listTugas.map((item) => {
      const hasil = nilaiTugasSiswa.find((h) => h.id_tugas === item.id);
      return {
        ...item,
        nilai: hasil ? hasil.nilai : "Belum Dinilai",
        idNilai: hasil?.id,
      };
    });
    const ujianplusnilai = listUjian.map((item) => {
      const hasil = nilaiUjianSiswa.find((h) => h.id_ujian === item.id);
      return {
        ...item,
        nilai: hasil ? hasil.nilai : "Belum Dinilai",
        idNilai: hasil?.id,
      };
    });
    setTugasDanNilai(tugasplusnilai);
    setUjianDanNilai(ujianplusnilai);
  };

  const closeDetail = () => {
    setShow(false);
  };

  const editNilai = async (
    idNilai: string | number,
    idSoal: string | number,
    nilainya: string | number,
    tugas: boolean
  ) => {
    console.log(idNilai);
    const inputValue = nilainya;
    const { value } = await Swal.fire({
      title: "Masukkan Nilai",
      input: "number",
      inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Pak, masih kosong...";
        }
      },
    });
    if (value) {
      if (tugas) {
        const nilaiTugas = {
          id: idNilai ? idNilai : nanoid(),
          id_pengguna: siswa?.id,
          nama_pengguna: siswa?.nama_lengkap,
          id_tugas: idSoal,
          nilai: value,
        };
        try {
          if (idNilai) {
            await api.put(`/hasil_tugas/${idNilai}`, nilaiTugas);
          } else {
            await api.post("/hasil_tugas", nilaiTugas);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const nilaiUjian = {
          id: idNilai ? idNilai : nanoid(),
          id_pengguna: siswa?.id,
          nama_pengguna: siswa?.nama_lengkap,
          id_ujian: idSoal,
          nilai: value,
        };
        try {
          if (idNilai) {
            await api.put(`/hasil_ujian/${idNilai}`, nilaiUjian);
          } else {
            await api.post("/hasil_ujian", nilaiUjian);
          }
        } catch (error) {
          console.log(error);
        }
      }
      await fetchAllData();
      if (siswa) {
        tampilkanNilai(siswa.id, siswa.stack, siswa);
      }
      Swal.fire(`Nilainya ${value}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70dvh]">
        <h1 className="text-2xl font-bold">Loading Data</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="font-black mt-3 text-4xl">Kelola Nilai</h1>
        <div className="w-4/5 mx-auto">
          {/* <button className="btn bg-blue-500 hover:bg-blue-600 text-white my-3">
            Tambah pengguna
          </button> */}
          <div className="rounded-t-lg overflow-hidden">
            <table className="border-collapse border border-gray-400  w-full">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-gray-300 p-2 w-[70%]">
                    Nama Lengkap
                  </th>
                  <th className="border border-gray-300 p-2 w-[10%]">Stack</th>
                  <th className="border border-gray-300 p-2 w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarSiswa.map((siswa) => (
                  <tr key={siswa.id} className="odd:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {siswa.nama_lengkap}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {siswa.stack}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center gap-2">
                      <button
                        className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() =>
                          tampilkanNilai(siswa.id, siswa.stack, siswa)
                        }
                      >
                        Nilai
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {show && (
          <div className="w-4/5 mx-auto">
            <button
              className="btn bg-amber-500 hover:bg-amber-600 text-white my-3"
              onClick={closeDetail}
            >
              Close
            </button>
            <h1 className="font-black mt-3 text-4xl text-gray-700 mb-2">
              {siswa?.nama_lengkap}
            </h1>
            <table className="border-collapse border border-gray-400  w-full">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-gray-300 p-2 w-[70%]">Tugas</th>
                  <th className="border border-gray-300 p-2 w-[10%]">Nilai</th>
                  <th className="border border-gray-300 p-2 w-[20%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {tugasDanNilai.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-100">
                    <td className="border border-gray-300 p-2">{item.soal}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.nilai}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center gap-2">
                      <button
                        className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() =>
                          editNilai(item.idNilai!, item.id, item.nilai!, true)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="my-10"></div>
            <table className="border-collapse border border-gray-400  w-full">
              <thead>
                <tr className="bg-blue-300">
                  <th className="border border-gray-300 p-2 w-[70%]">Ujian</th>
                  <th className="border border-gray-300 p-2 w-[10%]">Nilai</th>
                  <th className="border border-gray-300 p-2 w-[20%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {ujianDanNilai.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-100">
                    <td className="border border-gray-300 p-2">{item.soal}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.nilai}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center gap-2">
                      <button
                        className="btn bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() =>
                          editNilai(item.idNilai!, item.id, item.nilai!, false)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
