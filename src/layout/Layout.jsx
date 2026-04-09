import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        <main className="mx-auto max-w-5xl px-4 py-12">
          <Outlet />
        </main>
      </div>
    </>
  );
};
