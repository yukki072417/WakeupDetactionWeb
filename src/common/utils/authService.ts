import {
  universalLogin,
  universalLogout,
  universalSignup,
} from "../api/auth";
import { ApiRequestError } from "../api/http";
import {
  clearStoredSession,
  getStoredSession,
  isSessionValid,
  setStoredSession,
} from "./authStorage";
import { AuthError, type AuthSession } from "./authTypes";

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const normalizeErrorMessage = (err: unknown) => {
  if (err instanceof AuthError) return err.message;
  if (err instanceof ApiRequestError) return err.message;
  if (err instanceof Error) return err.message;
  return "不明なエラーが発生しました";
};

export const loadSession = (): AuthSession | null => {
  const session = getStoredSession();
  if (!session) return null;
  if (isSessionValid(session)) return session;
  clearStoredSession();
  return null;
};

export const loginWithUniversal = async (params: {
  email: string;
  password: string;
}): Promise<AuthSession> => {
  const email = params.email.trim();
  const password = params.password;

  if (!email || !password || !isValidEmail(email)) {
    throw new AuthError("INVALID_INPUT", "メールアドレスまたはパスワードが不正です");
  }

  try {
    const res = await universalLogin({ email, password });
    if (!res.success) {
      throw new AuthError(
        "UNAUTHORIZED",
        res.message ?? "ログインに失敗しました"
      );
    }

    const session: AuthSession = {
      userId: res.user_id,
      accessToken: res.access_token,
      tokenType: res.token_type,
      expiresAtMs: Date.now() + res.expires_in * 1000,
    };

    setStoredSession(session);
    return session;
  } catch (err) {
    const msg = normalizeErrorMessage(err);
    if (err instanceof AuthError) throw err;
    throw new AuthError("NETWORK", msg);
  }
};

export const signupWithUniversal = async (params: {
  email: string;
  password: string;
  nickname: string;
}): Promise<AuthSession> => {
  const email = params.email.trim();
  const password = params.password;
  const nickname = params.nickname.trim();

  if (!email || !password || !nickname || !isValidEmail(email)) {
    throw new AuthError("INVALID_INPUT", "入力内容を確認してください");
  }

  try {
    const res = await universalSignup({ email, password, nickname });
    if (!res.success) {
      throw new AuthError("UNAUTHORIZED", res.message ?? "サインアップに失敗しました");
    }

    const session: AuthSession = {
      userId: res.user_id,
      accessToken: res.access_token,
      tokenType: res.token_type,
      expiresAtMs: Date.now() + res.expires_in * 1000,
    };

    setStoredSession(session);
    return session;
  } catch (err) {
    const msg = normalizeErrorMessage(err);
    if (err instanceof AuthError) throw err;
    throw new AuthError("NETWORK", msg);
  }
};

export const logout = async (session: AuthSession | null) => {
  const token = session?.accessToken;
  clearStoredSession();

  if (!token) return;

  try {
    await universalLogout(token);
  } catch {
    // ignore
  }
};

