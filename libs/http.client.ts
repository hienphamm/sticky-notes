import { AxiosInstance } from "axios";
import axiosInstance from "./axios";
import { config } from "./config";

export const httpClient = (): AxiosInstance => {
  const token =
    "dff7ba01514252f9435b33eb55b672a06c04721a5a02bc0d402ecc0a83b8326cea766aa6d4e8423b4fbbecfc9758ab33744a232f93675ad14530de27c16974da958561fe4f35dc30b9e36f4cb046bec64635925af2b3628092d1f35bd9203d2c76b25e13a563b44b7a51ea47014edbf60cb2ddc5ff2feb03f390af7a0aa9340c";

  const authApi = axiosInstance(config);

  if (token.length > 0) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common.Authorization;
  }

  return authApi;
};
