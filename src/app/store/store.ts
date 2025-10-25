import { configureStore } from "@reduxjs/toolkit";
import { agentApi } from "../../shared/api/agent/agent";

export const store = configureStore({
  reducer: {
    [agentApi.reducerPath]: agentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(agentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
