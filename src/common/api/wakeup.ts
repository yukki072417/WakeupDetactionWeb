import { getJson, putJson, type ApiResult } from "./http";

export type WakeupTimeResponse = ApiResult<{
  wakeup_time: {
    user_id: string;
    time: string;
  };
}>;

export type SleepTimeResponse = ApiResult<{
  sleep_time: {
    user_id: string;
    time: string;
  };
}>;

export const getWakeupTime = async (params: {
  accessToken: string;
  userId: string;
}) => {
  return getJson<WakeupTimeResponse>(`/wakeup-time/${params.userId}`, {
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  });
};

export const putWakeupTime = async (params: {
  accessToken: string;
  userId: string;
  time: string;
}) => {
  return putJson<ApiResult<Record<string, never>>>(
    `/wakeup-time/${params.userId}`,
    { time: params.time },
    {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    }
  );
};

export const getSleepTime = async (params: {
  accessToken: string;
  userId: string;
}) => {
  return getJson<SleepTimeResponse>(`/sleep-time/${params.userId}`, {
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  });
};

export const putSleepTime = async (params: {
  accessToken: string;
  userId: string;
  time: string;
}) => {
  return putJson<ApiResult<Record<string, never>>>(
    `/sleep-time/${params.userId}`,
    { time: params.time },
    {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    }
  );
};
