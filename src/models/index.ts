import { RawDraftContentState } from "react-draft-wysiwyg";

interface CategoryAttributes {
  title: string;
  link: string;
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
  content: RawDraftContentState | null;
}

export interface Tab {
  id: number;
  attributes: TabAttributes;
}

export interface ResponseType<T> {
  data: T;
}

export interface PayloadCategory extends CategoryAttributes {}

export interface PayloadTab extends Omit<TabAttributes, "category"> {}

export interface ParamsTab {
  category: string;
  id: number;
}
