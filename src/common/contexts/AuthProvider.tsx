import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  loadSession,
  loginWithUniversal,
  logout,
  loginWithAuth0Social,
  completeAuth0SocialSignup,
  verifySessionWithBackend,
  signupWithUniversal,
} from "../utils/authService";
import { AuthContext, type AuthContextValue } from "./authContext";
import type { AuthSession } from "../utils/authTypes";
import { clearStoredSession } from "../utils/authStorage";

const AUTH0_POST_ACTION_KEY = "wakeup_detact.auth0.post_action";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialSessionRef = useRef(loadSession());
  const [session, setSession] = useState<AuthSession | null>(initialSessionRef.current);
  const [isVerifying, setIsVerifying] = useState<boolean>(!!initialSessionRef.current);
  const syncingAuth0Ref = useRef(false);
  const verifiedOnLoadRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated: isAuth0Authenticated,
    isLoading: isAuth0Loading,
    getAccessTokenSilently,
    logout: auth0Logout,
  } = useAuth0();

  useEffect(() => {
    if (verifiedOnLoadRef.current) return;
    verifiedOnLoadRef.current = true;
    if (!session?.accessToken) return;

    (async () => {
      setIsVerifying(true);
      try {
        const next = await verifySessionWithBackend({
          accessToken: session.accessToken,
          provider: session.provider,
        });
        setSession(next);
      } catch {
        clearStoredSession();
        setSession(null);
        const pathname = location.pathname;
        if (!pathname.startsWith("/login") && !pathname.startsWith("/signup") && pathname !== "/") {
          navigate("/login", { replace: true, state: { from: pathname } });
        }
      } finally {
        setIsVerifying(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuth0Loading) return;
    if (!isAuth0Authenticated) return;
    if (syncingAuth0Ref.current) return;
    if (session?.provider === "auth0" && Date.now() < session.expiresAtMs)
      return;

    syncingAuth0Ref.current = true;

    (async () => {
      try {
        const audience = import.meta.env.VITE_AUTH0_AUDIENCE as
          | string
          | undefined;
        const normalizedAudience = audience || undefined;
        const accessToken = await getAccessTokenSilently(
          normalizedAudience
            ? { authorizationParams: { audience: normalizedAudience } }
            : undefined
        );

        const mode =
          sessionStorage.getItem(AUTH0_POST_ACTION_KEY) === "signup"
            ? "signup"
            : "login";
        sessionStorage.removeItem(AUTH0_POST_ACTION_KEY);

        if (mode === "signup") {
          return;
        }

        const next = await loginWithAuth0Social({ accessToken, mode: "login" });
        setSession(next);
      } catch (e) {
        console.error(e);
      } finally {
        syncingAuth0Ref.current = false;
      }
    })();
  }, [getAccessTokenSilently, isAuth0Authenticated, isAuth0Loading, session]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      session,
      isAuthenticated: !!session,
      isVerifying,
      login: async ({ email, password }) => {
        const next = await loginWithUniversal({ email, password });
        setSession(next);
      },
      signup: async ({ email, password, username, userId }) => {
        const next = await signupWithUniversal({
          email,
          password,
          username,
          userId,
        });
        setSession(next);
      },
      completeSocialSignup: async ({ username, userId }) => {
        const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined;
        const normalizedAudience = audience || undefined;
        const accessToken = await getAccessTokenSilently(
          normalizedAudience
            ? { authorizationParams: { audience: normalizedAudience } }
            : undefined
        );

        const next = await completeAuth0SocialSignup({
          accessToken,
          userId,
          username,
        });
        setSession(next);
      },
      logout: async () => {
        const current = session;
        await logout(current);
        setSession(null);
        if ((current?.provider ?? "universal") === "auth0") {
          await auth0Logout({
            logoutParams: { returnTo: window.location.origin },
          });
        }
      },
    };
  }, [auth0Logout, getAccessTokenSilently, isVerifying, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
