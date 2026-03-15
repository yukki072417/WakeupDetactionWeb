import { useMemo, useState, type ReactNode } from "react";
import {
  loadSession,
  loginWithUniversal,
  logout,
  signupWithUniversal,
} from "../utils/authService";
import { AuthContext, type AuthContextValue } from "./authContext";
import type { AuthSession } from "../utils/authTypes";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());

  const value = useMemo<AuthContextValue>(() => {
    return {
      session,
      isAuthenticated: !!session,
      login: async ({ email, password }) => {
        const next = await loginWithUniversal({ email, password });
        setSession(next);
      },
      signup: async ({ email, password, nickname }) => {
        const next = await signupWithUniversal({ email, password, nickname });
        setSession(next);
      },
      logout: async () => {
        await logout(session);
        setSession(null);
      },
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
