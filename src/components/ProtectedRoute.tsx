import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LogoutButton from "./LogoutButton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { loginInfo } = useAppContext();

  if (!loginInfo.isLoggedIn || (role && loginInfo.role !== role)) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <nav>
        navbar
        <LogoutButton />
      </nav>
      {children}

      <footer>footer</footer>
    </>
  );
};

export default ProtectedRoute;
