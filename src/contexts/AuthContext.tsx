import { useSnackbar } from "notistack";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getToken, removeToken } from "../helpers/auth-helper";
import { Profile } from "../models";
import { getUser } from "../services";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  onLogout: VoidFunction;
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  onLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  profile: {} as Profile,
  setProfile: () => {},
  isLoading: false,
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();

  const fetchLoggedInUser = useCallback(() => {
    setIsLoading(true);
    getUser()
      .then((result) => {
        const { status, data } = result;
        if (status === 200) {
          setIsAuthenticated(true);
          setProfile(data);
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Failed to get User", {
          variant: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (token !== null) {
      fetchLoggedInUser();
    }
  }, [fetchLoggedInUser, token]);

  const onLogout = (): void => {
    removeToken();
    window.location.href = "/app";
  };

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    onLogout,
    profile,
    setProfile,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
