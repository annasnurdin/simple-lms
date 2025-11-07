import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutSiswa() {
  return (
    <>
      <Navbar guru={false} />
      <Outlet />
      <Footer guru={false} />
    </>
  );
}
