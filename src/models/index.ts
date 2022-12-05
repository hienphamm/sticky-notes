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
  category: string;
  title: string;
  slug: string;
  content: RawDraftContentState;
}

export interface Tab {
  id: number;
  attributes: TabAttributes;
}

export interface ResponseType<T> {
  data: T;
}

export interface PayloadCategory extends CategoryAttributes {}

export interface PayloadTab extends TabAttributes {}

export interface ParamsTab {
  category: string;
  id: number;
}
