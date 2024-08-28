import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/home/Homeright/urban-woman-9.gif";
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
const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [FriendRequestList, setFriendRequestList] = useState([]);

  /**
   * todo : fetch data from friendRequest db
   */
  useEffect(() => {
    const FriendRequestRef = ref(db, "FriendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      const FriendRequestArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().whoRecivedFriendRequestUid)
          FriendRequestArr.push({ ...item.val(), FriendRequestKey: item.key });
      });
      setFriendRequestList(FriendRequestArr);
    });
  }, []);

  /**
   * todo : handleRejectFrdRequest funtion implement
   * @param({item})
   */

  const handleRejectFrdRequest = (item) => {
    const removeFRRef = ref(db, "FriendRequest/" + item.FriendRequestKey);
    remove(removeFRRef);
  };

  /**
   * todo :handleAcceptFR
   * @params({item})
   */

  const handleAcceptFR = (item) => {
    set(push(ref(db, "Friends/")), {
      ...item,
      FriendRequestKey: null,
      createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
    }).then(() => {
      const removeFRRef = ref(db, "FriendRequest/" + item.FriendRequestKey);
      remove(removeFRRef);
    });
  };
  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="relative font-poppins text-xl font-semibold text-black">
              Freiend Request
              <span class="absolute -right-10 -top-3 flex h-10 w-10">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-sky-200">
                  {FriendRequestList?.length}
                </span>
              </span>
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div className="h-[88%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400">
            {FriendRequestList?.map((item) => (
              <div
                className="mt-5 flex items-center gap-x-3"
                key={item.FriendRequestKey}
              >
                <div className="h-[80px] w-[80px] rounded-full shadow-2xl">
                  <picture>
                    <img
                      src={item.whoSendFriendRequestProfile_picture || avatar}
                      alt={avatar}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="ml-2 flex basis-[35%] flex-col items-start justify-center">
                  <h1 className="heading capitalize">
                    {item.whoSendFriendRequestName}
                  </h1>
                  <p className="subHeading">{item.whoSendFriendRequestEmail}</p>
                </div>

                <div className="flex">
                  <button
                    className="buttonCommon ml-4 rounded-lg px-3 py-2"
                    onClick={() => handleAcceptFR(item)}
                  >
                    Accept
                  </button>
                  <button
                    className="buttonCommon ml-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2"
                    onClick={() => handleRejectFrdRequest()}
                  >
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
