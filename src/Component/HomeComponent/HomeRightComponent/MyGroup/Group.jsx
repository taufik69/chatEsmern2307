import React, { useState } from "react";
import avatar from "../../../../assets/home/Homeright/puzzle.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";
const MyGroup = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [allgroupList, setallgroupList] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "groups/");
    onValue(starCountRef, (snapshot) => {
      const groupblankarr = [];
      snapshot.forEach((item) => {
        if (item.val().whoCreateGroupuid === auth.currentUser.uid) {
          groupblankarr.push({ ...item.val(), groupKey: item.key });
        }
      });
      setallgroupList(groupblankarr);
    });
  }, []);

  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="font-poppins text-xl font-semibold text-black">
              My Group {allgroupList?.length}
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div
            className={
              allgroupList?.length > 0
                ? "h-[88%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400"
                : "flex h-full items-center justify-center"
            }
          >
            {allgroupList?.length > 0 ? (
              allgroupList?.map((item) => (
                <div
                  className="mt-5 flex items-center gap-x-3"
                  key={item.groupKey}
                >
                  <div className="h-[80px] w-[80px] rounded-full shadow-2xl">
                    <picture>
                      <img
                        src={item ? item.groupPhoto : avatar}
                        alt={item ? item.groupPhoto : avatar}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </picture>
                  </div>
                  <div className="ml-2 flex basis-[45%] flex-col items-start justify-center">
                    <h1 className="heading">
                      {item ? item.groupName : "Friends Reunion"}
                    </h1>
                    <p className="subHeading">
                      {item ? item.groupTagName : "Hi Guys, Wassup!"}
                    </p>
                  </div>

                  <span className="subHeading">
                    {moment(item.createdAt).toNow()}
                  </span>
                </div>
              ))
            ) : (
              <div
                class="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">Danger alert!</span> Change a few No
                Group Create a New Group
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroup;
