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
import { useSelector, useDispatch } from "react-redux";
import { freindsAction } from "../../../../Redux/Features/FriendSlice";
const Friends = ({ isChat = false }) => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [FriendList, setFriendList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "Friends/");
    onValue(starCountRef, (snapshot) => {
      let frdarr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().whoRecivedFriendRequestUid)
          frdarr.push({ ...item.val(), friendKey: item.key });
      });
      setFriendList(frdarr);
    });
  }, []);

  /**
   * todo  : handleBlcok function implelmemt
   **/

  const handleBlcok = (item = {}) => {
    const blockUserRef = ref(db, "blockedUser/");
    set(push(blockUserRef), item).then(() => {
      const removeFriends = ref(db, "Friends/" + item.friendKey);
      remove(removeFriends);
    });
  };

  // handleFriends funcition implement
  const handleFriends = (item = {}) => {
    if (auth.currentUser.uid == item.whoRecivedFriendRequestUid) {
      dispatch(
        freindsAction({
          id: item.whoSendFriendRequestUid,
          name: item.whoSendFriendRequestName,
          email: item.whoSendFriendRequestEmail,
          profile_picture: item.whoRecivedFriendRequestUserPhotoUrl,
        }),
      );
    } else {
      dispatch(
        freindsAction({
          id: item.whoRecivedFriendRequestUid,
          name: item.whoRecivedFriendRequestUserName,
          email: item.whoRecivedFriendRequestUserEmail,
          profile_picture: item.whoRecivedFriendRequestUserPhotoUrl,
        }),
      );
    }
  };

  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div
          className={
            isChat
              ? "h-[410px] w-full rounded-2xl shadow-2xl"
              : "h-[347px] w-[527px] rounded-2xl shadow-2xl"
          }
        >
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="relative font-poppins text-xl font-semibold text-black">
              Freiend
              <span class="absolute -right-10 -top-3 flex h-10 w-10">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-purple-200">
                  {FriendList?.length}
                </span>
              </span>
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div className="h-[88%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400">
            {FriendList?.map((user, index) => (
              <div
                className="mt-5 flex items-center gap-x-3"
                onClick={() => handleFriends(user)}
              >
                <div className="h-[80px] w-[80px] rounded-full shadow-2xl">
                  <picture>
                    <img
                      src={
                        user.whoSendFriendRequestProfile_picture
                          ? user.whoSendFriendRequestProfile_picture
                          : avatar
                      }
                      alt={avatar}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="ml-2 flex basis-[65%] flex-col items-start justify-center">
                  <h1 className="heading capitalize">
                    {user.whoSendFriendRequestName}
                  </h1>
                  <p className="subHeading">{moment(user.createdAt).toNow()}</p>
                </div>
                <button
                  className="buttonCommon ml-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2"
                  onClick={() => handleBlcok(user)}
                >
                  Block
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
