import React from "react";
import RegistrationLeft from "../../Component/Registration/RegistrationLeft.jsx";
import RegistrationRight from "../../Component/Registration/RegistrationRight";
const Registration = () => {
  return (
    <div className="flex items-center">
      <RegistrationLeft />
      <RegistrationRight />
    </div>
  );
};

export default Registration;
