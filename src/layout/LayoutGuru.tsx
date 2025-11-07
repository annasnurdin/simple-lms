import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutGuru() {
  return (
    <>
      <Navbar guru={true} />
      <div className="min-h-[80dvh] p-2">
        <Outlet />
      </div>
      <Footer guru={true} />
    </>
  );
}
