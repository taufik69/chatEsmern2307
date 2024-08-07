import React from "react";
import avatar from "../../../assets/home/homeLeft/avatar.gif";
import home from "../../../assets/home/homeLeft/home.gif";
import chat from "../../../assets/home/homeLeft/chat.gif";
import gear from "../../../assets/home/homeLeft/gear.gif";
import notification from "../../../assets/home/homeLeft/notification.gif";
import logout from "../../../assets/home/homeLeft/logout.png";
import { IoCloudUploadOutline } from "react-icons/io5";
const HomeLeft = () => {
  return (
    <div className="flex h-[94vh] w-[184px] flex-col items-center gap-y-20 rounded-2xl bg-gradient-to-b from-sky-500 to-indigo-300">
      <div className="relative mt-6 h-28 w-28 cursor-pointer rounded-full bg-white shadow-2xl">
        <picture>
          <img
            src={avatar}
            alt={avatar}
            className="h-full w-full object-cover p-3"
          />
        </picture>
        <IoCloudUploadOutline className="absolute left-[39%] top-[42%] text-2xl text-black" />
      </div>

      <div>
        <ul className="flex flex-col items-center gap-y-10">
          <li className="relative flex w-[166px] cursor-pointer justify-center rounded-l-lg bg-white py-1 after:absolute after:right-[-9px] after:top-[0px] after:h-full after:w-[16px] after:rounded-l-lg after:bg-red-600">
            <img
              src={home}
              alt={home}
              className="h-full w-16 object-cover mix-blend-multiply"
            />
          </li>

          <li className="w-16 cursor-pointer">
            <img
              src={chat}
              alt={home}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </li>
          <li className="w-16 cursor-pointer">
            <img
              src={gear}
              alt={home}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </li>
          <li className="w-16 cursor-pointer">
            <img
              src={notification}
              alt={home}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </li>
        </ul>
      </div>

      <div className="mt-10 cursor-pointer">
        <picture>
          <img src={logout} alt={logout} />
        </picture>
      </div>
    </div>
  );
};

export default HomeLeft;
