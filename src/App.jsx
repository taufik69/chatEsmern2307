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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
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
