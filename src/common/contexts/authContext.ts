import { createContext, useContext } from "react";
import type { AuthSession } from "../utils/authTypes";

export type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
    username: string;
    userId: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
