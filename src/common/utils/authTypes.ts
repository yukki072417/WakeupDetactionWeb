export type AuthSession = {
  userId: string;
  accessToken: string;
  tokenType: string;
  expiresAtMs: number;
  provider?: "universal" | "auth0";
};

export type AuthErrorCode =
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "CONFLICT"
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
