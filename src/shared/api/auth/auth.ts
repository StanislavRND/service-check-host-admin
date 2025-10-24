import axiosBase from "../instance/default";

export const authApi = {
  login: async (username: string, password: string) => {
    const data = { username, password };
    const response = await axiosBase.post("/auth/login", data);

    return response.data;
  },

  checkAuth: async () => {
    const response = await axiosBase.get("/auth/admin");
    return response.data;
  },

  logout: async () => {
    const response = await axiosBase.post("/auth/logout");

    return response.data;
  },
};
