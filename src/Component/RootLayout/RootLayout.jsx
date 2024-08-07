import React from "react";
import HomeLeft from "../HomeComponent/HomeLeft/HomeLeft";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div className="flex gap-x-10 p-6">
      <HomeLeft />
      <Outlet />
    </div>
  );
};

export default RootLayout;
