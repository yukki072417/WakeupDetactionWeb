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

export type SocialAuthResponse = ApiResult<{
  user_id: string;
}>;

export type SocialSignupPrepareResponse = ApiResult<{
  signup_id: string;
}>;

export const universalLogin = async (req: UniversalLoginRequest) => {
  return postJson<UniversalAuthResponse>("/universal/login", req);
};

export const universalSignup = async (req: UniversalSignupRequest) => {
  return postJson<UniversalAuthResponse>("/universal/signup", req);
};

export const socialLogin = async (accessToken: string) => {
  return postJson<SocialAuthResponse>(
    "/social/login",
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const socialSignup = async (accessToken: string) => {
  return postJson<SocialAuthResponse>(
    "/social/signup",
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const socialSignupPrepare = async (userId: string) => {
  return postJson<SocialSignupPrepareResponse>("/signup/prepare", {
    user_id: userId,
  });
};

export const socialSignupComplete = async (params: {
  accessToken: string;
  signupId: string;
}) => {
  return postJson<SocialAuthResponse>(
    "/signup/complete",
    { signup_id: params.signupId },
    {
      headers: { Authorization: `Bearer ${params.accessToken}` },
    }
  );
};

export const socialLogout = async (accessToken: string) => {
  return postJson<ApiResult<Record<string, never>>>(
    "/social/logout",
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
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
