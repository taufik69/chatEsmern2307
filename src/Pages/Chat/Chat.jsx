import React from "react";

import GroupList from "../../Component/HomeComponent/HomeRightComponent/GroupList/GroupList";
import Friends from "../../Component/HomeComponent/HomeRightComponent/Friends/Friends";
import ChatRight from "../../Component/ChatConponent/ChatRight";

const Chat = () => {
  return (
    <>
      <div className="flex w-full gap-x-5 px-6">
        <div className="h-[94vh] w-[30%] rounded-xl">
          <GroupList isChat={true} />
          <Friends isChat={true} />
        </div>
        <div className="h-[94vh] w-[70%] rounded-xl border-2 border-gray-400">
          <ChatRight />
        </div>
      </div>
    </>
  );
};

export default Chat;
