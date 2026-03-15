import { getJson, patchJson, type ApiResult } from "./http";

export type EditProfileRequest = {
  user_id?: string;
  username?: string;
};

export type ProfileResponse = ApiResult<{
  user_id: string;
  username: string;
  profile_image_url?: string;
}>;

export const getProfile = async (params: {
  accessToken: string;
  userId: string;
}): Promise<ProfileResponse> => {
  return getJson<ProfileResponse>(`/profile/${params.userId}`, {
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  });
};

export const editProfile = async (params: {
  accessToken: string;
  userId?: string;
  username?: string;
}) => {
  const body: EditProfileRequest = {};
  if (params.userId) body.user_id = params.userId;
  if (params.username) body.username = params.username;

  return patchJson<ApiResult<Record<string, never>>>("/profile/edit", body, {
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  });
};

export const uploadProfileImage = async (params: {
  accessToken: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("image", params.file);

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL || "/api"}/user/upload/image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error(`画像アップロードに失敗しました: ${res.status}`);
  }

  return (await res.json()) as ApiResult<Record<string, never>>;
};
