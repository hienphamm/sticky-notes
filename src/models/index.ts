interface CategoryAttributes {
  title: string;
  link: string;
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}

export interface ResponseType<T> {
  data: T;
}

export interface PayloadCategory extends CategoryAttributes {}
