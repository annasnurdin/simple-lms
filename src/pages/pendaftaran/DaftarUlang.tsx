import FormPendaftaran from "./FormPendaftaran";

export default function DaftarUlang() {
  return (
    <>
      <div className="p-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Daftar Ulang
        </h1>

        <FormPendaftaran daftarUlang={true} />
      </div>
    </>
  );
}
