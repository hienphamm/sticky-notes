import { RawDraftContentState } from "react-draft-wysiwyg";

interface CategoryAttributes {
  title: string;
  link: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}

interface TabAttributes {
  category: {
    data: Category[];
  };
  title: string;
  slug: string;
}

export interface Tab {
  id: number;
  attributes: TabAttributes;
}

export interface ResponseType<T> {
  data: T;
}

export interface PayloadCategory
  extends Omit<CategoryAttributes, "publishedAt"> {}

export interface PayloadTab extends Omit<TabAttributes, "category"> {}

export interface ParamsTab {
  categoryId: number;
  id: number;
}

export interface ContentAttributes {
  content: RawDraftContentState | null;
  tab: number;
}

export interface Content {
  attributes: ContentAttributes;
  id: number;
}

export interface ParamsContent {
  tabId: number;
}

export interface PayloadContent extends ContentAttributes {}

export interface Profile {
  id: number;
  username: string;
  email: string;
}

export interface PayloadLogin {
  identifier: string;
  password: string;
}

export interface PayloadRegister {
  username: string;
  email: string;
  password: string;
}

export type AuthenticationType = "login" | "register";
