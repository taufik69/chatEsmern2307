import React from "react";
import Search from "../Search/Search.jsx";
import { FcSearch } from "react-icons/fc";
import avatar from "../../../../assets/home/homeLeft/avatar.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
const GroupList = () => {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <div>
          <div className="relative">
            <span className="absolute left-[20px] top-[15px] text-2xl">
              <FcSearch />
            </span>
            <Search className="w-[427px] rounded-full border-[1px] border-gray-400 px-14 py-4 shadow-xl" />
            <span className="absolute right-[20px] top-[15px] text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>
        </div>

        <div className="h-[347px] w-[427px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="font-poppins text-xl font-semibold text-black">
              GroupList
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-300 h-[88%] w-full overflow-y-scroll rounded-2xl px-3">
            {[...new Array(10)].map((_, index) => (
              <div className="mt-5 flex items-center gap-x-3">
                <div className="h-[80px] w-[80px] rounded-full shadow-2xl">
                  <picture>
                    <img
                      src={avatar}
                      alt={avatar}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="ml-2 flex basis-[200px] flex-col items-start justify-center">
                  <h1 className="heading">Friends Reunion</h1>
                  <p className="subHeading">Hi Guys, Wassup!</p>
                </div>

                <button className="buttonCommon ml-4 rounded-lg px-2 py-2">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupList;
