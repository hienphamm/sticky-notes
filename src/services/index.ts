import { url } from "../../libs/config";
import { httpClient } from "../../libs/http.client";
import { AxiosResponse } from "axios";
import {
  Category,
  ParamsTab,
  PayloadCategory,
  PayloadTab,
  ResponseType,
} from "../models";
import { AxiosPayload } from "../hooks/useAxios";

/**
 *  Category
 */

export const getCategories = (): AxiosPayload => {
  return {
    url: url.categories,
    method: "GET",
  };
};

export const deleteCategory = async (
  id: number,
): Promise<AxiosResponse<ResponseType<Category[]>>> => {
  return await httpClient().delete(`${url.categories}/${id}`);
};

export const addNewCategory = async (
  payload: PayloadCategory,
): Promise<AxiosResponse<ResponseType<Category[]>>> => {
  return await httpClient().post(url.categories, {
    data: payload,
  });
};

export const updateCategory = async (
  id: number,
  payload: PayloadCategory,
): Promise<AxiosResponse<ResponseType<Category[]>>> => {
  return await httpClient().put(`${url.categories}/${id}`, {
    data: payload,
  });
};

/**
 *  Tab
 */

export const getTabs = (payload: Omit<ParamsTab, "id">): AxiosPayload => {
  const { category } = payload;
  return {
    url: `${url.tabs}?sort[0]=id&filters[category][link][$eq]=${category}`,
    method: "GET",
  };
};

export const updateTab = async (
  id: number,
  payload: Partial<PayloadTab>,
): Promise<AxiosResponse<ResponseType<Category[]>>> => {
  return await httpClient().put(`${url.tabs}/${id}`, {
    data: payload,
  });
};

export const addTab = async (
  payload: Partial<PayloadTab>,
): Promise<AxiosResponse<ResponseType<Category[]>>> => {
  return await httpClient().post(url.tabs, {
    data: payload,
  });
};
