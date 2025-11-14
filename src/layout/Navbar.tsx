import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export type LayoutProps = {
  guru: boolean;
};

export default function Navbar({ guru }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <nav className={`${guru ? "bg-purple-900" : "bg-blue-900"} text-white`}>
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4 shadow-lg">
        <h1 className="font-black text-2xl">Aku Codean</h1>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden "
        >
          {menuOpen ? (
            <i className="text-2xl text-white fa-solid fa-xmark"></i>
          ) : (
            <i className="text-2xl text-white fa-solid fa-bars"></i>
          )}
        </button>
        <div
          className={`w-full md:block md:w-auto  ${menuOpen ? "" : "hidden"}`}
        >
          {!guru ? (
            <ul
              className={`${
                guru ? "md:bg-purple-900" : "md:bg-blue-900"
              } font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0`}
            >
              <li>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 text-blue-900 ${
                      isActive
                        ? "text-yellow-500!"
                        : "lg:text-white md:text-white text-blue-900"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </ul>
          ) : (
            <ul
              className={`${
                guru ? "md:bg-purple-900" : "md:bg-blue-900"
              } font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0`}
            >
              <li>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 text-blue-900 ${
                      isActive
                        ? "text-yellow-500!"
                        : "lg:text-white md:text-white"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket block py-2 px-3 lg:text-white md:text-white text-red-700"></i>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
