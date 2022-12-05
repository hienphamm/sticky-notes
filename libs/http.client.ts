import { AxiosInstance } from "axios";
import axiosInstance from "./axios";
import { config } from "./config";

export const httpClient = (): AxiosInstance => {
  const token =
    "982754bbed33219ffeb12885d6fdc5a42ab7d226b709bc1b74610b56ac3fc24f044430ca80d2e095a45f048037482b99473b55121295517e8f8344ace80a490c26741691cef20325d75ba9cf40cb6920c8babd918d461b1ad982fb61309a790de454c9e655d93df3e3c82f2a593912dbef5e67ce0adf6fb7dd8e3840b091f7ee";

  const authApi = axiosInstance(config);

  if (token.length > 0) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common.Authorization;
  }

  return authApi;
};
