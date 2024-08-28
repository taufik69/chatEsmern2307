import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/home/Homeright/boy.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
import moment from "moment";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
const BlockedUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [BlockList, setBlockList] = useState([]);
  const [realtime, setrealtime] = useState(false);

  /**
   * todo : fetch data from blockedUser db
   */
  useEffect(() => {
    const FriendRequestRef = ref(db, "blockedUser/");
    onValue(FriendRequestRef, (snapshot) => {
      const FriendRequestArr = [];
      snapshot.forEach((item) => {
        if (item.val().whoRecivedFriendRequestUid === auth.currentUser.uid)
          FriendRequestArr.push({ ...item.val(), BlockKey: item.key });
        setBlockList(FriendRequestArr);
      });
    });
  }, [realtime]);
  console.log(realtime);

  //  unblockUser funtion implement
  const unblockUser = (item = {}) => {
    let blankobj = {};
    for (let key of Object.keys(item)) {
      if (key === "BlockKey" || key === "createdAt") {
        continue;
      }
      Object.assign(blankobj, { [key]: item[key] });
    }

    set(push(ref(db, "Friends/")), {
      ...blankobj,
      createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
    })
      .then(() => {
        const removeBlockRef = ref(db, "blockedUser/" + item.BlockKey);
        remove(removeBlockRef);
      })
      .catch((err) => {
        console.log("error from set friend in block componennt", err);
      })
      .finally(() => {
        setrealtime(!realtime);
      });
  };

  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="relative font-poppins text-xl font-semibold text-black">
              Block Users
              <span class="absolute -right-10 -top-3 flex h-10 w-10">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-sky-200">
                  {BlockList?.length}
                </span>
              </span>
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div className="h-[88%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400">
            {BlockList?.map((item) => (
              <div className="mt-5 flex items-center gap-x-3">
                <div className="h-[80px] w-[80px] rounded-full shadow-2xl">
                  <picture>
                    <img
                      src={
                        item.whoSendFriendRequestProfile_picture
                          ? item.whoSendFriendRequestProfile_picture
                          : avatar
                      }
                      alt={avatar}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="ml-2 flex basis-[65%] flex-col items-start justify-center">
                  <h1 className="heading">{item.whoSendFriendRequestName}</h1>
                  <p className="subHeading">Hi Guys, Wassup!</p>
                </div>

                <button
                  className="buttonCommon ml-4 rounded-lg px-7 py-2 capitalize"
                  onClick={() => unblockUser(item)}
                >
                  unblock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUser;
