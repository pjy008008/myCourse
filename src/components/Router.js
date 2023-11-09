import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ isLoggedIn }) => {
  const router = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL}/`,
      element: <div>{isLoggedIn ? <Home /> : <Auth />}</div>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
