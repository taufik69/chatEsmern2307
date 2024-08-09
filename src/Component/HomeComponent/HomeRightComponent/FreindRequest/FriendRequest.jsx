import React from "react";
import avatar from "../../../../assets/home/Homeright/urban-woman-9.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
const FriendRequest = () => {
  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="font-poppins text-xl font-semibold text-black">
              Freiend Request
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div className="h-[88%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400">
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
                <div className="ml-2 flex basis-[65%] flex-col items-start justify-center">
                  <h1 className="heading">Friends Reunion</h1>
                  <p className="subHeading">Hi Guys, Wassup!</p>
                </div>

                <div className="flex">
                  <button className="buttonCommon ml-4 rounded-lg px-3 py-2">
                    Accept
                  </button>
                  <button className="buttonCommon ml-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2">
                    ReJect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
