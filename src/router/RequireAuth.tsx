import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import type { Decoded } from "../pages/login-register/Login";
import { useAppDispatch } from "../redux/hooks";
import {
  setIDPengguna,
  setNama,
  setRole,
  setStack,
  setToken,
} from "../redux/authSlice";

export default function RequireAuth({ role }: { role: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode<Decoded>(token);
    dispatch(setToken(token));
    dispatch(setNama(decoded.nama));
    dispatch(setRole(decoded.role));
    dispatch(setStack(decoded.id_stack));
    dispatch(setIDPengguna(decoded.id));
  }

  useEffect(() => {
    if (!userRole || !role.includes(userRole) || !token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, role, token, userRole]);

  return <Outlet />;
}
