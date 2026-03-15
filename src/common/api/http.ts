export type ApiFailure = {
  success: false;
  message?: string;
};

export type ApiSuccess = {
  success: true;
};

export type ApiResult<T> = (T & ApiSuccess) | ApiFailure;

const getApiBaseUrl = () => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const baseUrl = envBaseUrl?.trim();

  if (baseUrl && /^https?:\/\//.test(baseUrl)) return baseUrl.replace(/\/$/, "");
  if (baseUrl && baseUrl.startsWith("/")) {
    return `${window.location.origin}${baseUrl}`.replace(/\/$/, "");
  }

  return `${window.location.origin}/api`;
};

const buildUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

export class ApiRequestError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.body = body;
  }
}

export const postJson = async <TResponse>(
  path: string,
  body: unknown,
  init?: RequestInit
): Promise<TResponse> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (init?.headers) {
    for (const [key, value] of new Headers(init.headers).entries()) {
      headers[key] = value;
    }
  }

  const res = await fetch(buildUrl(path), {
    ...init,
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const contentType = res.headers.get("content-type") ?? "";
  const parsed = contentType.includes("application/json")
    ? ((await res.json()) as unknown)
    : await res.text();

  if (!res.ok) {
    throw new ApiRequestError(
      `API request failed: ${res.status} ${res.statusText}`,
      res.status,
      parsed
    );
  }

  return parsed as TResponse;
};
