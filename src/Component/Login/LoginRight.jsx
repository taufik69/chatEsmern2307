import React from "react";
import login from "../../assets/login/login.gif";
const LoginRight = () => {
  return (
    <div className="flex h-screen w-[40%] items-center justify-center bg-blue-100">
      <picture>
        <img src={login} alt={login} />
      </picture>
    </div>
  );
};

export default LoginRight;
