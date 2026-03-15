import { postJson, type ApiResult } from "./http";

export type UniversalLoginRequest = {
  email: string;
  password: string;
};

export type UniversalSignupRequest = {
  user_id: string;
  email: string;
  password: string;
  username: string;
};

export type UniversalAuthResponse = ApiResult<{
  user_id: string;
  access_token: string;
  token_type: "Bearer" | string;
  expires_in: number;
}>;

export const universalLogin = async (req: UniversalLoginRequest) => {
  return postJson<UniversalAuthResponse>("/universal/login", req);
};

export const universalSignup = async (req: UniversalSignupRequest) => {
  return postJson<UniversalAuthResponse>("/universal/signup", req);
};

export const universalLogout = async (accessToken: string) => {
  return postJson<ApiResult<Record<string, never>>>(
    "/universal/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
