import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import api from "../../api/axios";

export default function GeneratePresensi() {
  const [valueQR, setValueQR] = useState("");
  const handleGenerateQR = async () => {
    const token = `TOKEN-${Math.floor(Math.random() * Date.now())}`;
    console.log(token);
    setValueQR(token);
    try {
      await api.put(`/sesi_presensi/1`, { tanggal: tanggal(), token });
    } catch (error) {
      console.log(error);
    }
  };
  const tanggal = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  return (
    <div className="p-2">
      <button
        className="btn bg-purple-500 text-white hover:bg-purple-600"
        onClick={handleGenerateQR}
      >
        Generate QR Presensi
      </button>
      <div className="flex items-center my-20 justify-center">
        {valueQR && <QRCodeSVG size={256} value={valueQR} />}
      </div>
      <div>{tanggal()}</div>
    </div>
  );
}
