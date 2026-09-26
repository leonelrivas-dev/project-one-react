import { tokenStorage } from "@/lib/storage/toke-storage";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url?.includes("/auth/refresh")
    )
      return Promise.reject(error);

    originalRequest._retry = true;

    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      tokenStorage.clear();
      return Promise.reject(error);
    }

    try {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = axios
          .post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            refreshToken,
          })
          .then((response) => {
            const { accessToken, refreshToken: newRefreshToken } =
              response.data;

            tokenStorage.setTokens(accessToken, newRefreshToken);

            return accessToken;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      const accessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      tokenStorage.clear();

      return Promise.reject(refreshError);
    }
  },
);
