import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axiosBase from "../instance/default";

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

export const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    unknown,
    unknown,
    BaseQueryApi
  > =>
  async ({ url, method = "GET", data, params }, { signal }) => {
    try {
      const result = await axiosBase({
        url,
        method,
        data,
        params,
        signal,
      });

      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;

      if (error.response?.status === 401) {
        console.warn("Authentication error in baseQuery");
      }

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
