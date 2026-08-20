import { Outlet, useNavigate, useLocation } from "react-router";
import { AppProvider, useApp } from "../context/AppContext";
import { useEffect } from "react";

function AuthGuard() {
  const { isAuthenticated, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/auth") {
      navigate("/auth");
    } else if (isAuthenticated && location.pathname === "/auth") {
      if (currentUser?.accountType === "company") navigate("/company/snapp/admin");
      else if (currentUser?.accountType === "startup") navigate("/startup/nextgen/admin");
      else navigate("/");
    }
  }, [isAuthenticated, currentUser, navigate, location]);

  return <Outlet />;
}

export function Root() {
  return (
    <AppProvider>
      <AuthGuard />
    </AppProvider>
  );
}
