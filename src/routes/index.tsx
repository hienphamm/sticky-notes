import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";

type ReturnType = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null;

export const Routes = (): ReturnType => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/app/javascript");
    }
  }, [location.pathname, navigate]);

  const element = useRoutes([
    {
      path: "*",
      element: <div>404 | Page Not Found</div>,
    },
    {
      path: "/app/:slug",
      element: <Home />,
    },
  ]);

  return element;
};
