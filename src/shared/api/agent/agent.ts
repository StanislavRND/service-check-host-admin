import { createApi } from "@reduxjs/toolkit/query/react";
import type { Agent } from "../../types/agent";
import { axiosBaseQuery } from "../instance/store";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Agent"],
  endpoints: (builder) => ({
    getAgentAll: builder.query<Agent[], void>({
      query: () => ({
        url: "/agents",
        method: "GET",
      }),
      transformResponse: (response: Agent[] | Record<string, Agent>) => {
        if (Array.isArray(response)) {
          return response;
        }
        if (typeof response === "object" && response !== null) {
          return Object.values(response) as Agent[];
        }
        return [];
      },
      providesTags: ["Agent"],
    }),

    createAgent: builder.mutation<Agent, Partial<Agent>>({
      query: (data) => ({
        url: "/agents",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Agent"],
    }),
    updateAgent: builder.mutation<Agent, Partial<Agent> & { id: string }>({
      query: ({ id, ...data }) => ({
        url: `/agents/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Agent"],
    }),

    deleteAgent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/agents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agent"],
    }),
  }),
});

export const {
  useGetAgentAllQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
