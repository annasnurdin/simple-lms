import { Link } from "react-router";
import FormPendaftaran from "./FormPendaftaran";

const photo1 = "https://placehold.co/600x400?text=Foto1";
const photo2 = "https://placehold.co/600x400?text=Foto2";
const photo3 = "https://placehold.co/600x400?text=Foto3";
const photo4 = "https://placehold.co/600x400?text=Foto4";

export default function LandingDaftar() {
  return (
    <>
      <div className="h-1/2 min-h-[50vh] bg-blue-500 px-5 sm:px-10 lg:px-20 py-10">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
          Sudah lulus SMA/SMK dan Kamu Belum Kerja?
        </h1>
        <br />
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
          Ikut Bootcamp Coding aja!!
        </h1>
        <p className="text-white mt-3 text-lg">
          Bagi kamu yang lagi di Jogja, ingin cepat dapat kerja, yukk gabung di
          Codean. Bootcamp Coding Gratis dijamin langsung dapat kerja
        </p>
        <br />

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button className="btn bg-amber-400 text-white hover:bg-amber-500">
            <a href="#daftar">Join Sekarang</a>
          </button>
          <button className="btn bg-blue-300 text-white hover:bg-blue-400">
            <a href="https://wa.me/6285171236493" target="_blank">
              Tanya Lebih Lanjut
            </a>
          </button>
        </div>
      </div>

      <div className="text-center p-10 sm:p-14 lg:p-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500">
          Apa keuntungan ikut Bootcamp di Codean?
        </h1>
      </div>

      <div className="mb-10 px-5 sm:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        <div className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
          <i className="fa-solid fa-users-rectangle text-6xl mb-2"></i>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Pelatihan Intensif
          </h5>
          <p className="font-normal text-gray-700">
            Kamu akan belajar coding selama 4 - 12 minggu dengan standard
            industri
          </p>
        </div>

        <div className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
          <i className="fa-solid fa-money-bill-wave text-6xl mb-2"></i>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Gratis Tanpa Biaya
          </h5>
          <p className="font-normal text-gray-700">
            Kamu akan dibimbing sampai bisa secara gratis jika sudah diterima
          </p>
        </div>

        <div className="block w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
          <i className="fa-solid fa-computer text-6xl mb-2"></i>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Langsung Kerja
          </h5>
          <p className="font-normal text-gray-700">
            Setelah selesai bootcamp dan lulus, kamu akan dikontrak dan/atau
            disalurkan kerja
          </p>
        </div>
      </div>

      <div className="text-center pt-10" id="daftar">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-pink-500">
          Daftar disini sekarang
        </h1>
      </div>

      <div className="px-5 sm:px-10 lg:px-20">
        <FormPendaftaran daftarUlang={false} />
      </div>

      <div className="flex justify-center my-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 w-full px-5 sm:w-5/6 gap-4">
          <img
            src={photo1}
            alt="Foto 1"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo2}
            alt="Foto 2"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo3}
            alt="Foto 3"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo4}
            alt="Foto 4"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo1}
            alt="Foto 1"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo2}
            alt="Foto 2"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo3}
            alt="Foto 3"
            className="w-full h-auto object-cover rounded-lg"
          />
          <img
            src={photo4}
            alt="Foto 4"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* [PERUBAHAN]:
        - Mengubah `mt-10` menjadi `mt-5` agar tidak terlalu jauh.
      */}
      <div
        className={`flex items-center justify-center text-center py-5 mt-5 ${"bg-blue-500"}`}
      >
        <h1 className="font-bold text-white">
          Copyright 2025 | <Link to={"/login"}>Login</Link>
        </h1>
      </div>
    </>
  );
}
