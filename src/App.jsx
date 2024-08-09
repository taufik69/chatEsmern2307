import React from "react";
import Registration from "./Pages/Registration/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home.jsx";
import RootLayout from "./Component/RootLayout/RootLayout.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/chat" element={"this is Chat page"}></Route>

        <Route path="/setting" element={"this is setting page"}></Route>
        <Route
          path="/notification"
          element={"this is notification page"}
        ></Route>
      </Route>
    </Route>,
  ),
);
const App = () => {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
