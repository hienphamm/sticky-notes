import { url } from "../libs/config";
import { httpClient } from "../libs/http.client";
import { AxiosResponse } from "axios";
import {
  Category,
  Content,
  ParamsContent,
  ParamsTab,
  PayloadCategory,
  PayloadContent,
  PayloadLogin,
  PayloadRegister,
  PayloadTab,
  Profile,
  ResponseType,
  Tab,
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
): Promise<AxiosResponse<ResponseType<Tab[]>>> => {
  return await httpClient().put(`${url.tabs}/${id}`, {
    data: payload,
  });
};

export const addTab = async (
  payload: Partial<PayloadTab>,
): Promise<AxiosResponse<ResponseType<Tab>>> => {
  return await httpClient().post(url.tabs, {
    data: payload,
  });
};

export const deleteTab = async (
  id: number,
): Promise<AxiosResponse<ResponseType<Tab>>> => {
  return await httpClient().delete(`${url.tabs}/${id}`);
};

/**
 *  Content
 */
export const getContent = (params: ParamsContent): AxiosPayload => {
  const { tabId } = params;
  return {
    url: `${url.contents}?filters[tab][id][$eq]=${tabId}`,
    method: "GET",
  };
};

export const addContent = async (
  payload: PayloadContent,
): Promise<AxiosResponse<ResponseType<Content>>> => {
  return await httpClient().post(url.contents, {
    data: payload,
  });
};

export const updateContent = async (
  id: number,
  payload: Omit<PayloadContent, "tab">,
): Promise<AxiosResponse<ResponseType<Content>>> => {
  return await httpClient().put(`${url.contents}/${id}`, {
    data: payload,
  });
};

/**
 * Authentication
 */
export const getUser = async (): Promise<AxiosResponse<Profile>> => {
  return await httpClient().get(url.user);
};

export const login = async (
  payload: PayloadLogin,
): Promise<
  AxiosResponse<{
    jwt: string;
  }>
> => {
  return await httpClient().post(url.login, payload);
};

export const register = async (
  payload: PayloadRegister,
): Promise<AxiosResponse<ResponseType<any>>> => {
  return await httpClient().post(url.register, payload);
};
