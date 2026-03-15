import { patchJson, type ApiResult } from "./http";

export const editProfile = async (params: {
  accessToken: string;
  username: string;
}) => {
  return patchJson<ApiResult<Record<string, never>>>(
    "/profile/edit",
    { username: params.username },
    {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    }
  );
};

