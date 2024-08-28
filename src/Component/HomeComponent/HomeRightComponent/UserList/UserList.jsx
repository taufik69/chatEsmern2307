import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/home/homeLeft/avatar.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [userList, setuserList] = useState([]);
  const [FriendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    const UserRef = ref(db, "users/");
    onValue(UserRef, (snapshot) => {
      const userBlankArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().userUid)
          userBlankArr.push({
            ...item.val(),
            userKey: item.key,
          });
      });
      setuserList(userBlankArr);
    });
  }, []);

  /**
   * todo : fetch data from friendRequest db
   */
  useEffect(() => {
    const FriendRequestRef = ref(db, "FriendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      const FriendRequestArr = [];
      snapshot.forEach((item) => {
        if (true)
          FriendRequestArr.push(
            item.val().whoSendFriendRequestUid +
              item.val().whoRecivedFriendRequestUid,
          );
      });
      setFriendRequestList(FriendRequestArr);
    });
  }, []);

  /**
   * todo : handleFriendRequest fution implement
   */
  const handleFriendRequest = (item) => {
    set(push(ref(db, "FriendRequest/")), {
      whoSendFriendRequestName: auth.currentUser.displayName,
      whoSendFriendRequestUid: auth.currentUser.uid,
      whoSendFriendRequestEmail: auth.currentUser.email,
      whoSendFriendRequestProfile_picture: auth.currentUser.photoURL
        ? auth.currentUser.photoURL
        : null,
      whoRecivedFriendRequestUid: item.userUid,
      whoRecivedFriendRequestUserName: item.UserName,
      whoRecivedFriendRequestUserEmail: item.UserEmail,
      whoRecivedFriendRequestUserPhotoUrl: item.UserPhotoUrl
        ? item.UserPhotoUrl
        : null,
      whoRecivedFriendRequestUserKey: item.userKey,
      createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
    });
  };

  return (
    <div className="mb-7 self-end">
      <div className="flex flex-col justify-end gap-y-6">
        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="relative font-poppins text-xl font-semibold text-black">
              UserList
              <span class="absolute -right-10 -top-3 flex h-10 w-10">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-sky-200">
                  {userList?.length}
                </span>
              </span>
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <HiOutlineDotsVertical />
            </span>
          </div>

          <div className="h-[88%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400">
            {userList?.map((item) => (
              <div
                className="mt-5 flex items-center gap-x-3"
                key={item.userUid}
              >
                <div className="h-[80px] w-[80px] rounded-full shadow-2xl">
                  <picture>
                    <img
                      src={item.UserPhotoUrl ? item.UserPhotoUrl : avatar}
                      alt={item.UserPhotoUrl ? item.UserPhotoUrl : avatar}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="ml-2 flex basis-[65%] flex-col items-start justify-center">
                  <h1 className="heading">{item.UserName}</h1>
                  <p className="subHeading">{item.UserEmail}</p>
                </div>

                {FriendRequestList.includes(
                  auth.currentUser.uid + item.userUid ||
                    item.userUid + auth.currentUser.uid,
                ) ? (
                  <button className="buttonCommon ml-4 rounded-lg px-7 py-2">
                    -
                  </button>
                ) : (
                  <button
                    className="buttonCommon ml-4 rounded-lg px-7 py-2"
                    onClick={() => handleFriendRequest(item)}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
