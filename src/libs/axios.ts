import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export default function axiosInstance(
  options: AxiosRequestConfig,
): AxiosInstance {
  const axiosInstance = axios.create(options);

  axiosInstance.interceptors.response.use(
    (response) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        status: response.status,
        data: response.data,
      } as AxiosResponse;
    },
    async (error: AxiosError) => {
      return await Promise.reject(error);
    },
  );

  return axiosInstance;
}
