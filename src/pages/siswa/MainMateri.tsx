import { useMemo } from "react";
import { marked } from "marked";

type MainMateriProps = {
  judulMateri: string | undefined;
  konten: string;
};
export default function MainMateri({ judulMateri, konten }: MainMateriProps) {
  const kontenHTML = useMemo(() => {
    const htmlString = marked.parse(konten);
    return htmlString;
  }, [konten]);
  return (
    <main className="w-full md:w-2/3 lg:w-[80%] bg-white p-6 sm:p-8 lg:p-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 border-b pb-3">
        {judulMateri}
      </h1>
      <div
        className="konten-materi space-y-4 text-gray-700 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: kontenHTML }}
      />
    </main>
  );
}
