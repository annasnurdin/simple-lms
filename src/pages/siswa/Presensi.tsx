import {
  Scanner,
  type IDetectedBarcode,
  useDevices,
} from "@yudiel/react-qr-scanner";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { getNama } from "../../redux/authSlice";

export default function Presensi() {
  const [hasil, setHasil] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [mobile, setMobile] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const namaSiswa = useAppSelector(getNama);
  const devices = useDevices();
  const navigate = useNavigate();

  useEffect(() => {
    const ambilToken = async () => {
      try {
        setLoading(true);
        const response = await api
          .get("/sesi_presensi")
          .then((res) => res.data)
          .then((data) => data[0].token);
        setToken(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    ambilToken();
    if (window.innerWidth < 800) {
      setMobile(true);
    }
  }, []);

  const tanggal = (waktuJam: boolean) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const jam = today.getHours();
    const menit = today.getMinutes();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    if (waktuJam) {
      const jamnya = `${jam}-${menit}`;
      return jamnya;
    } else {
      return formattedDate;
    }
  };

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    detectedCodes.forEach((code) => {
      if (code.rawValue === token) {
        setHasil(code.rawValue);
        setIsPaused(true);
        Swal.fire({
          title: "Good job!",
          text: "Absensi berhasil! Token: " + token,
          icon: "success",
          confirmButtonText: "Selesai",
        }).then(async () => {
          const dataSiswa = {
            id_siswa: `202`,
            nama_siswa: namaSiswa,
            tanggal: tanggal(false),
            waktu_masuk: new Date().toISOString(),
          };
          await api.post("/kehadiran", dataSiswa);
          navigate("/siswa/");
        });

        // console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
        return;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70dvh]">
        <h1 className="text-2xl font-bold">Tunggu sebentar, baru siap-siap</h1>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="min-h-[80dvh] flex flex-col gap-2 p-2">
        <select
          onChange={(e) => setSelectedDevice(e.target.value)}
          className="inputan"
        >
          <option value="">Select a camera</option>
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`btn ${isPaused ? "bg-amber-300" : "bg-amber-500"}`}
        >
          {isPaused ? "Resume" : "Pause"} Scanning
        </button>
        <div className="flex justify-center items-center mt-5">
          <div className="w-[20em] h-[20em]">
            <Scanner
              onScan={handleScan}
              onError={(error) => console.error(error)}
              paused={isPaused}
              constraints={{
                deviceId: selectedDevice,
                aspectRatio: 1,
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              }}
            />
          </div>
        </div>
        <div>{hasil}</div>
        <div>{token}</div>
      </div>
    );
  } else {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center">
        <h1>Scan Pakai Mobile Devices</h1>
      </div>
    );
  }
}
