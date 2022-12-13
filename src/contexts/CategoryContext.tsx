import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useAxios from "../hooks/useAxios";
import { Category } from "../models";
import { getCategories } from "../services";
import { useAuthContext } from "./AuthContext";

interface ICategoryContext {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  onRefetch: VoidFunction;
  loaded: boolean;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  setCategories: () => {},
  onRefetch: () => {},
  loaded: false,
});

export const useCategoryContext = (): ICategoryContext =>
  useContext(CategoryContext);

const CategoryContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { isAuthenticated } = useAuthContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, onRefetch, loaded } = useAxios<any, Category[]>(
    getCategories(),
    isAuthenticated,
  );

  useEffect(() => {
    setCategories(data ?? []);
  }, [data]);

  const CategoryContextData = {
    categories,
    setCategories,
    onRefetch,
    loaded,
  };

  return (
    <CategoryContext.Provider value={CategoryContextData}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
