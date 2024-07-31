import React from "react";
import HomeLeft from "../../Component/HomeComponent/HomeLeft/HomeLeft";
import HomeRight from "../../Component/HomeComponent/HomeRight/HomeRight";

const Home = () => {
  return (
    <div className="flex p-9">
      <HomeLeft />
      <HomeRight />
    </div>
  );
};

export default Home;
