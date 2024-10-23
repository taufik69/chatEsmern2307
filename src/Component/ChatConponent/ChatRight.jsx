import React, { useEffect, useState, useRef } from "react";
import profile from "../../assets/home/Homeright/purr.gif";
import { IoPaperPlane } from "react-icons/io5";
import { FaCameraRetro, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { set, getDatabase, push, ref, onValue } from "firebase/database";

import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as uploadref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import moment from "moment/moment";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "60%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ChatRight = () => {
  const db = getDatabase();
  const auth = getAuth();
  const emojiRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setmessage] = useState("");
  const [progress, setprogress] = useState(null);
  const [image, setimage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [singlemsg, setsinglemsg] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // handleEmoji function implement
  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  // handleInputfuntin
  const handleInput = (event) => {
    const { value } = event.target;
    setmessage(value);
  };

  // onEmojiClick functjion implement
  const handlemojipicker = (event) => {
    // console.log();
    setmessage((prev) => {
      return `${prev}${event?.emoji}`;
    });
  };
  const { friendInfo } = useSelector((state) => state.friend);

  const handlemessageSEnt = () => {
    if (friendInfo) {
      if (message) {
        set(push(ref(db, "singleMsg/")), {
          whoSendMsgUid: auth.currentUser.uid,
          whoSendMsgName: auth.currentUser.displayName,
          whoSendMsgEmail: auth.currentUser.email,
          whoSendMsgProfilePicture: auth.currentUser.photoURL,
          whoRecivedMsgUid: friendInfo?.id || " ",
          whoRecivedMsgName: friendInfo?.name || "",
          whoRecivedMsgEmail: friendInfo?.email || "",
          whoRecivedProfilePicture: friendInfo?.profile_picture || "",
          msg: message || "",
          image: image ? image : null,
          createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
        })
          .then(() => {
            console.log("done");
          })
          .catch((err) => {
            console.error("message", err);
          })
          .finally(() => {
            setmessage("");
            setShowEmoji(false);
          });
      } else {
        set(push(ref(db, "singleMsg/")), {
          whoSendMsgUid: auth.currentUser.uid,
          whoSendMsgName: auth.currentUser.displayName,
          whoSendMsgEmail: auth.currentUser.email,
          whoSendMsgProfilePicture: auth.currentUser.photoURL,
          whoRecivedMsgUid: friendInfo?.id || " ",
          whoRecivedMsgName: friendInfo?.name || "",
          whoRecivedMsgEmail: friendInfo?.email || "",
          whoRecivedProfilePicture: friendInfo?.profile_picture || "",
          msg: message || "",
          image: image ? image : null,
          createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
        })
          .then(() => {
            console.log("Image send  done");
          })
          .catch((err) => {
            console.error("message", err);
          })
          .finally(() => {
            setmessage("");
            setShowEmoji(false);
            setimage("");
          });
      }
    }
  };

  // handleImagePicker funtion implement
  const handleImagePicker = (event) => {
    const storage = getStorage();
    const storageRef = uploadref(
      storage,
      "images/" + event.target.files[0]?.name,
    );
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress);
      },
      (error) => {
        console.error("error from image upload: ", error);
      },
      () => {
        closeModal();
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimage(downloadURL);
        });
      },
    );
  };

  // fetch data from singlemsg
  useEffect(() => {
    const fetchdata = () => {
      const starCountRef = ref(db, "singleMsg/");
      onValue(starCountRef, (snapshot) => {
        let singleMsg = [];
        snapshot.forEach((item) => {
          if (
            auth.currentUser.uid === item.val().whoRecivedMsgUid ||
            auth.currentUser.uid === item.val().whoSendMsgUid
          ) {
            singleMsg.push({ ...item.val(), singlemsgKey: item.key });
          }
        });
        setsinglemsg(singleMsg);
      });
    };
    fetchdata();
  }, []);

  // now take a span ref

  return (
    <div>
      <div className="flex items-center gap-x-5 border-b-2 border-b-gray-200 p-6">
        <div className="h-[75px] w-[75px] rounded-full shadow-gray-100">
          <picture>
            <img
              src={friendInfo.profile_picture || profile}
              alt={profile}
              className="h-full w-full object-cover"
            />
          </picture>
        </div>
        <div>
          <h3 className="font-poppins text-[24px] font-semibold capitalize text-black">
            {friendInfo.name || "MERN 2307"}
          </h3>
          <p className="font-poppins text-sm font-normal text-black opacity-75">
            Online
          </p>
        </div>
      </div>
      {/* chat  body */}
      <div className="backgroundimage h-[70vh] overflow-y-scroll bg-blue-200 p-6">
        <div className="flex flex-col justify-between gap-y-5">
          {singlemsg?.map((msg) =>
            auth.currentUser.uid == msg.whoSendMsgUid &&
            msg.whoRecivedMsgUid == friendInfo.id ? (
              msg.image ? (
                <div className="w-[30%] self-end">
                  <div className="w-full text-wrap bg-[#F1F1F1] text-center">
                    <img src={msg.image} alt="" />
                  </div>
                  <p>Today, 2:01pm</p>
                </div>
              ) : (
                <div className="w-[30%] self-end">
                  <div className="box--right w-full text-wrap bg-[#F1F1F1] py-5 text-center">
                    <span>{msg.msg}</span>
                  </div>
                  <p>Today, 2:01pm</p>
                </div>
              )
            ) : msg.image ? (
              <div className="w-[30%] self-start">
                <div className="w-full text-wrap bg-[#F1F1F1] text-center">
                  <img src={msg.image} alt="" />
                </div>
                <p>Today, 2:01pm</p>
              </div>
            ) : (
              <div className="w-[30%] self-start">
                <div className="box w-full text-wrap bg-[#F1F1F1] py-5 text-center">
                  <span>{msg.msg}</span>
                </div>
                <p>Today, 2:01pm</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* chat body end */}
      <div className="relative mx-4 my-3 flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-md">
        <input
          type="text"
          placeholder="Type a message..."
          onChange={handleInput}
          className="flex-grow bg-transparent p-2 text-sm outline-none"
          value={message}
        />
        <div className="flex items-center gap-x-5">
          <button className="text-gray-500 hover:text-gray-700">
            <span onClick={handleEmoji}>
              <FaSmile className="text-xl text-yellow-600" />
            </span>
            {showEmoji && (
              <span className="absolute bottom-[105%] left-[60%]">
                <EmojiPicker onEmojiClick={handlemojipicker} />
              </span>
            )}
          </button>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={openModal}
          >
            <span>
              <FaCameraRetro className="text-xl" />
            </span>
          </button>
          {friendInfo.id ? (
            <button
              className="rounded-full bg-purple-500 p-2 text-white"
              onClick={handlemessageSEnt}
            >
              <IoPaperPlane />
            </button>
          ) : (
            <button className="rounded-full bg-purple-500 p-2 text-white">
              <IoPaperPlane />
            </button>
          )}
        </div>
      </div>

      {/* modal body */}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            className="mb-10 h-10 w-10 rounded-full bg-red-800 text-white"
          >
            X
          </button>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImagePicker}
                />
              </label>
            </div>
            {progress >= 1 ? (
              <div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  class="my-5 w-full rounded-lg bg-blue-600 py-3 text-center text-xs font-bold leading-none text-white"
                  style={{ width: `${Math.ceil(progress)}%` }}
                >
                  {Math.ceil(progress)}%
                </div>
              </div>
            ) : (
              <button className="my-5 w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-500">
                Send
              </button>
            )}
          </form>
        </Modal>
      </div>
      {/* modal body */}
    </div>
  );
};

export default ChatRight;
