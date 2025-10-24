import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type { RootState } from "../../../app/store/store";
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
  async ({ url, method = "GET", data, params }, { getState, signal }) => {
    try {
      const state = getState() as RootState;
      const domainUuid = state.user.domain_uuid;

      let finalParams = { ...params };
      let finalData = data;

      if (domainUuid && !/\/\d+($|\/)/.test(url)) {
        const methodUpper = method.toUpperCase();

        if (methodUpper === "GET") {
          finalParams = {
            ...finalParams,
            domain_uuid: domainUuid,
          };
        } else if (["POST"].includes(methodUpper)) {
          if (finalData && typeof finalData === "object") {
            finalData = {
              ...finalData,
              domain_uuid: domainUuid,
            };
          } else if (finalData === undefined || finalData === null) {
            finalData = { domain_uuid: domainUuid };
          }
        }
      }

      const result = await axiosBase({
        url,
        method,
        data: finalData,
        params: finalParams,
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
