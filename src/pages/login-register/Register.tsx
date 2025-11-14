import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router";
import InputWithToggle from "./InputWithToggle";
import { capitalizeFirst } from "../../utils/CapitalizeFirstLetter";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [stack, setStack] = useState(1);
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cpassword !== password) {
      return Swal.fire({
        title: "Konfirmasi Password Tidak Sesuai!",
        text: "Tolong diubah dulu",
        icon: "warning",
      });
    }
    try {
      const data = {
        nama,
        email,
        password,
        role: "Siswa",
        id_stack: stack,
      };
      // console.log("data", data);
      const response = await api
        .post("/register", data)
        .then((res) => res.data);
      console.log(response);
      if (response) {
        Swal.fire({
          title: "Pendaftaran Berhasil",
          text: "Silakan Login",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nama"
            required
            className="inputan w-full"
            value={capitalizeFirst(nama)}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="inputan w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputWithToggle password={password} setPassword={setPassword} />
          <InputWithToggle password={cpassword} setPassword={setCpassword} />

          <div className="flex gap-1">
            <label htmlFor="fe">
              <input
                type="radio"
                id="fe"
                value="1"
                checked={stack === 1}
                onChange={() => setStack(1)}
              />{" "}
              Frontend
            </label>
            <label htmlFor="be">
              <input
                type="radio"
                id="be"
                value="2"
                checked={stack === 2}
                onChange={() => setStack(2)}
              />{" "}
              Backend
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white btn hover:bg-blue-700"
          >
            REGISTRASI
          </button>
          <p className="text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-800 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
