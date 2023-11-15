import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Other from "../routes/Other";
import Title from "./Title";

const AppRouter = ({ isLoggedIn, setIsLoggedIn }) => {
  const router = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL}/`,
      element: (
        <div>
          {isLoggedIn ? (
            <div>
              <Title />
              <Home />
            </div>
          ) : (
            <Auth setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      ),
    },
    {
      path: `${process.env.PUBLIC_URL}/profile`,
      element: (
        <div>
          <Title />
          <Profile />
        </div>
      ),
    },
    {
      path: `${process.env.PUBLIC_URL}/other`,
      element: (
        <div>
          <Title />
          <Other />
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
