import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import avatar from "../../../../assets/home/Homeright/girls.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [FriendList, setFriendList] = useState([]);

  useEffect(() => {
    const FriendRef = ref(db, "Friends/");
    onValue(FriendRef, (snapshot) => {
      const FriendArr = [];
      snapshot.forEach((item) => {
        FriendArr.push({ ...item.val() });
      });
      setFriendList(FriendArr);
    });
  }, []);
  console.log(FriendList);

  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="font-poppins text-xl font-semibold text-black">
              Friends
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

                <span className="subHeading">Today, 8:56pm</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
