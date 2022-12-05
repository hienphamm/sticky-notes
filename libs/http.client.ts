import { AxiosInstance } from "axios";
import axiosInstance from "./axios";
import { config } from "./config";

export const httpClient = (): AxiosInstance => {
  const token =
    "a68c30a6ce96c034664bcf24d4e33900075d26218e99e1e232ba9b4d6d4d377c264fe11ac001165c08067e404cbb6969e5bc5776391c8d573978dfd4c07c9f655bed6160df558fca8bc84e7bb26d898b2b11b0ed8b72cc933f8f5002fbfa928b4e02bc93ea6b2fc89849a31877b3e138e846aa8b1b1eca46244cfcd94fecf938";

  const authApi = axiosInstance(config);

  if (token.length > 0) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common.Authorization;
  }

  return authApi;
};
