import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";

type ReturnType = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null;

export const Routes = (): ReturnType => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return element;
};
