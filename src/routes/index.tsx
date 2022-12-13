import React, { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";
import NotFound from "../pages/404";
import Home from "../pages/Home";
import Index from "../pages/Index";
import { Login } from "../pages/Login";

type ReturnType = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null;

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export const Routes = (): ReturnType => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/app");
    }
  }, [location.pathname, navigate]);

  const element = useRoutes([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/app",
      element: <Index />,
    },
    {
      ...(isAuthenticated && {
        element: <Layout />,
        children: [
          {
            path: "/app/:slug",
            element: (
              <RequireAuth>
                <Home />
              </RequireAuth>
            ),
          },
        ],
      }),
    },
  ]);

  return element;
};
