import {
  universalLogin,
  universalLogout,
  universalSignup,
  socialLogin,
  socialSignup,
  socialSignupPrepare,
  socialSignupComplete,
  socialLogout,
} from "../api/auth";
import { editProfile } from "../api/profile";
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
      provider: "universal",
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
  username: string;
  userId: string;
}): Promise<AuthSession> => {
  const email = params.email.trim();
  const password = params.password;
  const username = params.username.trim();
  const userId = params.userId.trim();

  if (!email || !password || !username || !userId || !isValidEmail(email)) {
    throw new AuthError("INVALID_INPUT", "入力内容を確認してください");
  }

  try {
    const req = { user_id: userId, email, password, username };
    const res = await universalSignup(req);
    if (!res.success) {
      throw new AuthError("UNAUTHORIZED", res.message ?? "サインアップに失敗しました");
    }

    const session: AuthSession = {
      userId: res.user_id,
      accessToken: res.access_token,
      tokenType: res.token_type,
      expiresAtMs: Date.now() + res.expires_in * 1000,
      provider: "universal",
    };

    setStoredSession(session);
    return session;
  } catch (err) {
    if (err instanceof AuthError) throw err;
    if (err instanceof ApiRequestError && err.status === 409) {
      throw new AuthError("CONFLICT", "このメールアドレスまたはユーザーIDはすでに使用されています");
    }
    throw new AuthError("NETWORK", normalizeErrorMessage(err));
  }
};

export const logout = async (session: AuthSession | null) => {
  const token = session?.accessToken;
  const provider = session?.provider ?? "universal";
  clearStoredSession();

  if (!token) return;

  try {
    if (provider === "auth0") {
      await socialLogout(token);
    } else {
      await universalLogout(token);
    }
  } catch {
    // ignore
  }
};

const getJwtExpiresAtMs = (jwt: string): number | null => {
  const parts = jwt.split(".");
  if (parts.length < 2) return null;
  try {
    const payloadJson = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (!payload.exp) return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
};

export const loginWithAuth0Social = async (params: {
  accessToken: string;
  mode: "login" | "signup";
}): Promise<AuthSession> => {
  try {
    const res =
      params.mode === "signup"
        ? await socialSignup(params.accessToken)
        : await socialLogin(params.accessToken);

    if (!res.success) {
      throw new AuthError(
        "UNAUTHORIZED",
        res.message ?? "ソーシャルログインに失敗しました"
      );
    }

    const expiresAtMs =
      getJwtExpiresAtMs(params.accessToken) ?? Date.now() + 3600 * 1000;

    const session: AuthSession = {
      userId: res.user_id,
      accessToken: params.accessToken,
      tokenType: "Bearer",
      expiresAtMs,
      provider: "auth0",
    };

    setStoredSession(session);
    return session;
  } catch (err) {
    const msg = normalizeErrorMessage(err);
    if (err instanceof AuthError) throw err;
    throw new AuthError("NETWORK", msg);
  }
};

export const completeAuth0SocialSignup = async (params: {
  accessToken: string;
  userId: string;
  username: string;
  signupId?: string;
}): Promise<AuthSession> => {
  const userId = params.userId.trim();
  const username = params.username.trim();
  const signupId = params.signupId?.trim();

  if (!userId || !username) {
    throw new AuthError("INVALID_INPUT", "入力内容を確認してください");
  }

  try {
    const reservation =
      signupId && signupId.length
        ? { success: true as const, signup_id: signupId }
        : await socialSignupPrepare(userId);
    if (!reservation.success) {
      throw new AuthError(
        "UNAUTHORIZED",
        reservation.message ?? "ソーシャルサインアップに失敗しました"
      );
    }

    const completed = await socialSignupComplete({
      accessToken: params.accessToken,
      signupId: reservation.signup_id,
    });
    if (!completed.success) {
      throw new AuthError(
        "UNAUTHORIZED",
        completed.message ?? "ソーシャルサインアップに失敗しました"
      );
    }

    const profileRes = await editProfile({
      accessToken: params.accessToken,
      username,
    });
    if (!profileRes.success) {
      throw new AuthError(
        "UNKNOWN",
        profileRes.message ?? "プロフィールの更新に失敗しました"
      );
    }

    const expiresAtMs =
      getJwtExpiresAtMs(params.accessToken) ?? Date.now() + 3600 * 1000;

    const session: AuthSession = {
      userId: completed.user_id,
      accessToken: params.accessToken,
      tokenType: "Bearer",
      expiresAtMs,
      provider: "auth0",
    };

    setStoredSession(session);
    return session;
  } catch (err) {
    const msg = normalizeErrorMessage(err);
    if (err instanceof AuthError) throw err;
    throw new AuthError("NETWORK", msg);
  }
};

export const verifySessionWithBackend = async (params: {
  accessToken: string;
  provider?: "universal" | "auth0";
}): Promise<AuthSession> => {
  try {
    const res = await socialLogin(params.accessToken);
    if (!res.success) {
      throw new AuthError("UNAUTHORIZED", res.message ?? "認証に失敗しました");
    }

    const expiresAtMs =
      getJwtExpiresAtMs(params.accessToken) ?? Date.now() + 3600 * 1000;

    const session: AuthSession = {
      userId: res.user_id,
      accessToken: params.accessToken,
      tokenType: "Bearer",
      expiresAtMs,
      provider: params.provider ?? "universal",
    };

    setStoredSession(session);
    return session;
  } catch (err) {
    const msg = normalizeErrorMessage(err);
    if (err instanceof AuthError) throw err;
    throw new AuthError("NETWORK", msg);
  }
};
