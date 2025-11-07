import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <nav className={`${"bg-blue-900"} text-white`}>
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="font-black text-2xl">Aku Codean</h1>
        </div>
      </nav>
      <div className="min-h-[80dvh]">
        <Outlet />
      </div>
      <div
        className={`flex items-center justify-center text-center py-5 ${"bg-blue-900"}`}
      >
        <h1 className="font-bold text-white">Copyright 2025</h1>
      </div>
    </>
  );
}
