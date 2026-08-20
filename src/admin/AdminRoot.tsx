import { AdminAuthProvider } from "./context/AdminAuthContext";
import { Outlet } from "react-router";

export function AdminRoot() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
}
