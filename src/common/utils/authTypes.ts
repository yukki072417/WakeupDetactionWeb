export type AuthSession = {
  userId: string;
  accessToken: string;
  tokenType: string;
  expiresAtMs: number;
};

export type AuthErrorCode =
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "NETWORK"
  | "UNKNOWN";

export class AuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode, message: string) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}

