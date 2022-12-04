import { url } from "../../libs/config";
import { httpClient } from "../../libs/http.client";
import { AxiosResponse } from "axios";
import { Category, PayloadCategory, ResponseType } from "../models";

export const getCategory = async (): Promise<
  AxiosResponse<ResponseType<Category[]>>
> => {
  return await httpClient().get(url.categories);
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
