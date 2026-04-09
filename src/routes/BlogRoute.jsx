import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AuthProtected from "../protectedLayout/AuthProtected";
import DashboardProtected from "../protectedLayout/DashboardProtected";
import { Component } from "react";
import BlogForm from "../components/BlogForm";
import { Layout } from "../layout/Layout";

const BlogRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "",
          Component: Home,
        },
        {
          Component: AuthProtected,
          children: [
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
        {
          Component: DashboardProtected,
          children: [
            {
              path: "",
              Component: Home,
            },
            {
              path: "blog/:id",
              Component: BlogForm,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default BlogRoute;
