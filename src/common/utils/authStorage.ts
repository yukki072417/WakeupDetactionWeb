import type { AuthSession } from "./authTypes";

const STORAGE_KEY = "wakeup_detact.auth.session.v1";

export const getStoredSession = (): AuthSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
};

export const setStoredSession = (session: AuthSession) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isSessionValid = (session: AuthSession | null) => {
  if (!session) return false;
  return Date.now() < session.expiresAtMs;
};

