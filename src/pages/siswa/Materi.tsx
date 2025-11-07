import { useEffect, useState } from "react";
import LeftSideBar from "./LeftSideBar";
import MainMateri from "./MainMateri";
import type { Materi } from "../guru/KelolaMateri";
import api from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { getStack } from "../../redux/authSlice";

export default function Materi() {
  const [daftarMateri, setDaftarMateri] = useState<Materi[]>([]);
  const [materiAktif, setMateriAktif] = useState<Materi>();
  const [loading, setLoading] = useState(false);

  const idStack = useAppSelector(getStack);

  const fetchData = async () => {
    console.log(idStack);
    setLoading(true);
    try {
      const response = await api
        .get("/materi")
        .then((res) => res.data)
        .then((data) =>
          data.filter((item: Materi) => item.id_stack == idStack)
        );
      // console.log(response);
      setDaftarMateri(response);
      if (response && response.length > 0) {
        setMateriAktif(response[0]);
      } else {
        setMateriAktif(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const pilihMateri = (materi: Materi) => {
    setMateriAktif(materi);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70dvh]">
        <h1 className="text-2xl font-bold">Loading Data</h1>
      </div>
    );
  }

  if (!materiAktif && daftarMateri.length === 0) {
    return <div>Tidak ada materi yang tersedia.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <LeftSideBar
        materi={daftarMateri}
        idMateri={materiAktif!.id}
        pilihMateri={pilihMateri}
      />

      <MainMateri
        judulMateri={materiAktif!.judul_materi}
        konten={materiAktif!.deskripsi_materi}
      />
    </div>
  );
}
