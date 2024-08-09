import React from "react";
import GroupList from "../../Component/HomeComponent/HomeRightComponent/GroupList/GroupList";
import Friends from "../../Component/HomeComponent/HomeRightComponent/Friends/Friends";
import UserList from "../../Component/HomeComponent/HomeRightComponent/UserList/UserList";
import FriendRequest from "../../Component/HomeComponent/HomeRightComponent/FreindRequest/FriendRequest.jsx";
import Group from "../../Component/HomeComponent/HomeRightComponent/Group/Group.jsx";
import BlockedUser from "../../Component/HomeComponent/HomeRightComponent/BlockedUser/BlockedUser.jsx";
const Home = () => {
  return (
    <div className="flex w-full flex-wrap justify-between">
      <GroupList />
      <Friends />
      <UserList />
      <FriendRequest />
      <Group />
      <BlockedUser />
    </div>
  );
};

export default Home;
