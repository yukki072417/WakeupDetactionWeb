import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isVerifying } = useAuth();
  const location = useLocation();

  if (isVerifying) {
    return <div style={{ padding: 16 }}>認証中...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
};

