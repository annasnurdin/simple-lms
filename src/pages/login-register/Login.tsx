import { useState, type FormEvent } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../redux/hooks";
import {
  setIDPengguna,
  setNama,
  setRole,
  setToken,
} from "../../redux/authSlice";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { Link, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import InputWithToggle from "./InputWithToggle";

export interface Decoded extends JwtPayload {
  id: string | number;
  nama: string;
  role: string;
  id_stack: number | string;
}
// type User = {
//   email: string;
//   id: string | number;
//   role: string;
//   token: string;
//   password: string;
// };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const response = await api.get("/auth_mocks").then((res) => res.data);
  //   const foundUser = response.find(
  //     (item: User) => item.email === email && item.password === password
  //   );

  //   if (foundUser) {
  //     console.log("Login Berhasil! Role:", foundUser.role);
  //     localStorage.setItem("token", foundUser.token);
  //     localStorage.setItem("role", foundUser.role);
  //     dispatch(setToken(foundUser.token));

  //     const tokenLokal = localStorage.getItem("token");
  //     const decoded = jwtDecode<Decoded>(tokenLokal!);
  //     dispatch(setNama(decoded.nama));
  //     dispatch(setRole(decoded.role));
  //     dispatch(setIDPengguna(decoded.id));
  //     Swal.fire({
  //       title: "Login Berhasil!",
  //       text: "menuju ke Dashboard",
  //       icon: "success",
  //       confirmButtonText: "Baik",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate(`/${foundUser.role}`);
  //       }
  //     });
  //   } else {
  //     console.error("Login Gagal! Email atau password salah.");
  //     Swal.fire({
  //       title: "Login Gagal!",
  //       text: "Email atau password salah.",
  //       icon: "warning",
  //     });
  //   }
  // };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api
        .post("/login", { email, password })
        .then((res) => res.data);
      console.log(response);
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("role", response.role);

      dispatch(setToken(response.accessToken));
      const decoded = jwtDecode<Decoded>(response.accessToken);
      dispatch(setNama(decoded.nama));
      dispatch(setRole(decoded.role));
      dispatch(setIDPengguna(decoded.id));
      Swal.fire({
        title: "Login Berhasil!",
        text: "menuju ke Dashboard",
        icon: "success",
        confirmButtonText: "Baik",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${response.role}`);
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        // console.error("Status Code:", error.response?.status);
        // console.error("Pesan Error:", error.message);
        Swal.fire({
          title: "Login Gagal!",
          text: "Email atau password salah.",
          icon: "warning",
        });

        console.log(axiosError.response?.data);
      } else {
        console.error("Error tak dikenal:", error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          LOGIN
        </h1>
        <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            className="inputan w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputWithToggle password={password} setPassword={setPassword} />
          <button
            type="submit"
            className="bg-blue-600 text-white btn hover:bg-blue-700"
          >
            LOGIN
          </button>
          <p className="text-center">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-800 cursor-pointer"
            >
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
