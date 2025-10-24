import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosBase = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
  config: AxiosRequestConfigWithRetry;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach(({ reject, resolve }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

axiosBase.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    originalRequest._retryCount = originalRequest._retryCount || 0;

    const isAuthEndpoint =
      originalRequest.url?.startsWith("/auth/login") ||
      originalRequest.url?.startsWith("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint &&
      originalRequest._retryCount < 2
    ) {
      originalRequest._retryCount++;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        })
          .then(() => axiosBase(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosBase.post("/auth/refresh");
        processQueue(null);
        return axiosBase(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
export default axiosBase;
