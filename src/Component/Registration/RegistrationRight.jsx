import React from "react";
import Registionimg from "../../assets/Resgistraion/registation.gif";

const RegistrationRight = () => {
  return (
    <div className="h-screen w-[40%]">
      <picture>
        <img src={Registionimg} alt={Registionimg} className="mt-16" />
      </picture>
    </div>
  );
};

export default RegistrationRight;
