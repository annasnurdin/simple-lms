import { useEffect, useState } from "react";
import LeftSideBar from "./LeftSideBar";
import MainMateri from "./MainMateri";
import api from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { getIDPengguna, getStack } from "../../redux/authSlice";
import type { Materi } from "../../redux/resourceSlice";

export interface ProgresMateri extends Materi {
  status: boolean;
  id_materi?: string | number;
  id_progres: string | number | boolean;
  id_pengguna: number;
}

export default function Materi() {
  const [materiList, setMateriList] = useState<ProgresMateri[]>([]);
  const [materiAktif, setMateriAktif] = useState<ProgresMateri>();
  // const [loading, setLoading] = useState(false);

  const idStack = useAppSelector(getStack);
  const idPengguna = useAppSelector(getIDPengguna);

  const fetchData = async (index: number) => {
    // console.log(idStack);
    // setLoading(true);
    try {
      const progress = await api
        .get("/progres_materi")
        .then((res) => res.data)
        .then((data) =>
          data.filter(
            (item: ProgresMateri) =>
              item.id_stack == idStack && item.id_pengguna == idPengguna
          )
        );
      const materi = await api
        .get("/materi")
        .then((res) => res.data)
        .then((data) =>
          data.filter((item: ProgresMateri) => item.id_stack == idStack)
        );

      const materidanprogres = materi.map((materi: Materi) => {
        const progressItem = progress.find(
          (item: ProgresMateri) => item.id_materi === materi.id
        );
        // if (progressItem) {
        //   console.log(progressItem.id);
        // }
        return {
          ...materi,
          status: progressItem ? progressItem.status : false,
          id_progres: progressItem ? progressItem.id : false,
        };
      });
      // console.log(response);
      // console.log(progress);
      console.log(materidanprogres);
      setMateriList(materidanprogres);
      if (materi && materi.length > 0) {
        setMateriAktif(materidanprogres[index]);
      } else {
        setMateriAktif(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  const pilihMateri = (materi: ProgresMateri) => {
    setMateriAktif(materi);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[70dvh]">
  //       <h1 className="text-2xl font-bold">Loading Data</h1>
  //     </div>
  //   );
  // }

  if (!materiAktif && materiList.length === 0) {
    return <div>Tidak ada materi yang tersedia.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <LeftSideBar
        materi={materiList}
        idMateri={materiAktif!.id}
        pilihMateri={pilihMateri}
        fetchData={fetchData}
      />

      <MainMateri
        judulMateri={materiAktif!.judul_materi}
        konten={materiAktif!.deskripsi_materi}
      />
    </div>
  );
}
