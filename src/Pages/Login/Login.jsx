import React from "react";
import LoginLeft from "../../Component/Login/LoginLeft";
import LoginRight from "../../Component/Login/LoginRight";
const Login = () => {
  return (
    <div className="flex items-start">
      <LoginLeft />
      <LoginRight />
    </div>
  );
};

export default Login;
