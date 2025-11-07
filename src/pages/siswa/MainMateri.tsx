type MainMateriProps = {
  judulMateri: string | undefined;
  konten: string;
};
export default function MainMateri({ judulMateri, konten }: MainMateriProps) {
  return (
    <main className="w-full md:w-2/3 lg:w-[80%] bg-white p-6 sm:p-8 lg:p-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 border-b pb-3">
        {judulMateri}
      </h1>
      <div
        className="content-body space-y-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: konten }}
      />
    </main>
  );
}
