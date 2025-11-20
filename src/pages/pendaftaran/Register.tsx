import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { useNavigate } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
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
        email,
        password,
      };
      const response = await api
        .post("/register", data)
        .then((res) => res.data);
      // console.log(response);
      if (response) {
        Swal.fire({
          title: "Pendaftaran Berhasil",
          text: "Silakan Login",
          icon: "success",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
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
          <input
            type="password"
            placeholder="Password"
            required
            className="inputan"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            required
            className="inputan"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white btn hover:bg-blue-700"
          >
            REGISTRASI
          </button>
        </form>
      </div>
    </div>
  );
}
