import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Login from "../auth/Login";
import Register from "../auth/Register";

const BlogRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Navbar,
      children: [
        {
          path: "",
          Component: Home,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "register",
          Component: Register,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default BlogRoute;
