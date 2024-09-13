import React, { useState, useRef, useEffect } from "react";
import Search from "../Search/Search.jsx";
import { FcSearch } from "react-icons/fc";
import avatar from "../../../../assets/home/Homeright/purr.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ErrorToast, SucessToast } from "../../../../../Utils/Toastfy/Toast.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  ref as dbref,
  set,
  push,
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const GroupList = () => {
  const storage = getStorage();
  const db = getDatabase();
  const auth = getAuth();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [allgroupList, setallgroupList] = useState([]);
  const [allgroupRequestList, setallgroupRequestList] = useState([]);
  const [groupInputValue, setgroupInputValue] = useState({
    groupName: "",
    grouptagName: "",
  });

  // fetch group information
  useEffect(() => {
    const starCountRef = dbref(db, "groups/");
    onValue(starCountRef, (snapshot) => {
      const groupblankarr = [];
      snapshot.forEach((item) => {
        if (item.val().whoCreateGroupuid !== auth.currentUser.uid) {
          groupblankarr.push({ ...item.val(), groupKey: item.key });
        }
      });
      setallgroupList(groupblankarr);
    });
  }, []);
  // fetch groupRequest data
  useEffect(() => {
    const starCountRef = dbref(db, "groupRequest/");
    onValue(starCountRef, (snapshot) => {
      const groupRequestblankarr = [];
      snapshot.forEach((item) => {
        groupRequestblankarr.push(
          item.val().groupKey + item.val().whoJoinGroupUid,
        );
      });
      setallgroupRequestList(groupRequestblankarr);
    });
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // cropper all state
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);

  // crop onchange function implement
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      SucessToast("Crop Done", "top-center");
    }
  };

  // onGroupchangehandaler function implement
  const onGroupchangehandaler = (event) => {
    const { id, value } = event.target;
    setgroupInputValue({
      ...groupInputValue,
      [id]: value,
    });
  };

  /**
   * todo handleGreoup function implement
   */

  const handleGreoup = () => {
    const { grouptagName, groupName } = groupInputValue;
    if (!cropData || !grouptagName || !groupName) {
      return ErrorToast(
        `Must fillup the GroupTagName or GroupName  or Croppgin image`,
        "top-center",
        7000,
      );
    }
    setloading(true);
    const storageRef = ref(storage, `GroupImage/image${uuidv4()}`);
    uploadString(storageRef, cropData, "data_url")
      .then((snapshot) => {
        setCropData("");
      })
      .then(() => {
        return getDownloadURL(storageRef);
      })
      .then((groupDownloadImageUrl) => {
        set(push(dbref(db, "groups/")), {
          whoCreateGroupuid: auth.currentUser.uid,
          whoCreateGroupName: auth.currentUser.displayName,
          whocreateGroupProfile_picture: auth.currentUser.photoURL,
          whoCreateGroupEmail: auth.currentUser.email,
          groupName: groupInputValue.groupName,
          groupTagName: groupInputValue.grouptagName,
          groupPhoto: groupDownloadImageUrl,
          createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
        });
      })
      .catch((err) => {
        setloading(false);
        ErrorToast(`Error from Create Group ${err} `, "top-center");
      })
      .finally(() => {
        setgroupInputValue({
          groupName: "",
          grouptagName: "",
        });
        setCropData("");
        setImage("");
        setloading(false);
        closeModal();
      });
  };

  /**
   * todo handlejoinGroup funciton implement
   * @param ({item})
   */

  const handlejoinGroup = (item = {}) => {
    set(push(dbref(db, "groupRequest/")), {
      ...item,
      whoJoinGroupUid: auth.currentUser.uid,
      whoJoinGroupName: auth.currentUser.displayName,
      whoJoinGroupEmail: auth.currentUser.email,
      whoJoinGroupProfile_picture: auth.currentUser.photoURL,
      createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
    });
  };

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

        <div className="h-[347px] w-[527px] rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-7 pt-4">
            <h1 className="font-poppins text-xl font-semibold text-black">
              GroupList {allgroupList?.length}
            </h1>
            <span className="text-2xl text-Auth_main_color">
              <button
                className="buttonCommon ml-4 rounded-lg px-2 py-2"
                onClick={openModal}
              >
                create Group
              </button>
            </span>
          </div>
          <div
            className={
              allgroupList?.length > 0
                ? "h-[83%] w-full overflow-y-scroll rounded-2xl px-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-sky-400"
                : "flex h-full items-center justify-center"
            }
          >
            {allgroupList?.length > 0 ? (
              allgroupList?.map((item) => (
                <div
                  className="mt-5 flex items-center gap-x-3"
                  key={item.groupKey}
                >
                  <div className="h-[88px] w-[80px] rounded-full shadow-2xl">
                    <picture>
                      <img
                        src={item ? item.groupPhoto : avatar}
                        alt={item ? item.groupPhoto : avatar}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </picture>
                  </div>
                  <div className="ml-2 flex basis-[40%] flex-col items-start justify-center">
                    <h1 className="heading">
                      {item ? item.groupName : "Friends Reunion"}
                    </h1>
                    <p className="subHeading">
                      {item ? item.groupTagName : "Hi Guys, Wassup!"}
                    </p>
                  </div>
                  {allgroupRequestList?.includes(
                    item.groupKey + auth.currentUser.uid,
                  ) ? (
                    <span className="text-2xl text-Auth_main_color">
                      <button className="buttonCommon ml-4 rounded-lg px-2 py-2">
                        Request Pending
                      </button>
                    </span>
                  ) : (
                    <span className="text-2xl text-Auth_main_color">
                      <button
                        className="buttonCommon ml-4 rounded-lg px-2 py-2"
                        onClick={() => handlejoinGroup(item)}
                      >
                        Join
                      </button>
                    </span>
                  )}
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
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button
              className="h-10 w-10 rounded-full bg-red-500 text-white"
              onClick={closeModal}
            >
              x
            </button>
            <h1 className="capitalize">Group infomation </h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="groupName">
                {" "}
                GroupName <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-xl border-2 border-red-100 bg-gray-200 px-2 py-2"
                type="text"
                id="groupName"
                name="groupName"
                value={groupInputValue.groupName}
                onChange={onGroupchangehandaler}
              />

              <label htmlFor="grouptagName">
                grouptagName <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-xl border-2 border-red-100 bg-gray-200 px-2 py-2"
                type="text"
                id="grouptagName"
                name="grouptagName"
                value={groupInputValue.grouptagName}
                onChange={onGroupchangehandaler}
              />

              {/* CROPPER BODY */}
              <div>
                <div className="my-10">
                  <input type="file" onChange={onChange} />
                </div>
                <div className="flex w-[1200px] justify-between">
                  <div className="h-[250px] w-[400px]">
                    <Cropper
                      ref={cropperRef}
                      style={{ height: "100%" }}
                      zoomTo={0.3}
                      initialAspectRatio={1.1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                  </div>
                  {/* preview */}

                  <div className="relative h-[250px] w-[350px] bg-red-700">
                    <h1 className="absolute -top-[63px] rounded-xl bg-red-500 px-5 py-3 text-white">
                      Preview
                    </h1>
                    <div className="img-preview preview_box z-10 h-[250px] overflow-hidden" />
                  </div>
                  {/* preview */}
                  {/* crop div */}
                  <div className="relative h-[250px] w-[350px] bg-blue-400">
                    <h1 className="absolute -top-7">
                      <button
                        onClick={getCropData}
                        className="absolute -top-[30px] text-nowrap rounded-xl bg-blue-400 px-20 py-3 text-white"
                      >
                        Crop Image
                      </button>
                    </h1>
                    <img className="cropImage" src={cropData} alt="cropped" />
                  </div>
                  {/* crop div */}
                </div>
              </div>
              {/* CROPPER BODY */}
              {loading ? (
                <button className="buttonCommon ml-4 mt-4 w-full rounded-lg px-2 py-2">
                  loading......
                </button>
              ) : (
                <button
                  className="mt-10 w-full bg-blue-500 py-3 text-base text-white"
                  onClick={handleGreoup}
                >
                  Create Group
                </button>
              )}
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GroupList;
