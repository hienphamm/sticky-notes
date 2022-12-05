import { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:1337/api/";

export const config: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const url = {
  categories: "categories",
  tabs: "tabs",
};
