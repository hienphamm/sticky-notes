import { AUTH_TOKEN } from "../constants";

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string): void => {
  if (token.length > 0) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};
