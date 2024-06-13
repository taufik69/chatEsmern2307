import React from "react";
import Registration from "./Pages/Registration/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Registration />
    </>
  );
};

export default App;
