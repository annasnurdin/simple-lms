import type { LayoutProps } from "./Navbar";

export default function Footer({ guru }: LayoutProps) {
  return (
    <div
      className={`flex items-center justify-center text-center py-5 ${
        guru ? "bg-purple-900" : "bg-blue-900"
      }`}
    >
      <h1 className="font-bold text-white">Copyright 2025</h1>
    </div>
  );
}
