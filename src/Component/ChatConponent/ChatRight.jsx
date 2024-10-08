import React, { useState } from "react";
import profile from "../../assets/home/Homeright/purr.gif";
import { IoPaperPlane } from "react-icons/io5";
import { FaCameraRetro, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
const ChatRight = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setmessage] = useState("");
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
  return (
    <>
      <div className="flex items-center gap-x-5 border-b-2 border-b-gray-200 p-6">
        <div className="h-[75px] w-[75px] rounded-full shadow-gray-100">
          <picture>
            <img
              src={profile}
              alt={profile}
              className="h-full w-full object-cover"
            />
          </picture>
        </div>
        <div>
          <h3 className="font-poppins text-[24px] font-semibold text-black">
            Swathi{" "}
          </h3>
          <p className="font-poppins text-sm font-normal text-black opacity-75">
            Online
          </p>
        </div>
      </div>
      {/* chat  body */}
      <div className="h-[70vh] bg-blue-200 p-6">
        <div className="flex flex-col justify-between gap-y-5">
          <div className="w-[30%] self-start">
            <div className="box w-full text-wrap bg-[#F1F1F1] py-5 text-center">
              <span>Hey There !</span>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-end">
            <div className="box--right w-full text-wrap bg-[#F1F1F1] py-5 text-center">
              <span>Hey There !</span>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-start">
            <div className="box w-full text-wrap bg-[#F1F1F1] py-5 text-center">
              <span>Hey There !</span>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-start">
            <div className="box w-full text-wrap bg-[#F1F1F1] py-5 text-center">
              <span>Hey There !</span>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          <div className="w-[30%] self-end">
            <div className="box--right w-full text-wrap bg-[#F1F1F1] py-5 text-center">
              <span>Hey There !</span>
            </div>
            <p>Today, 2:01pm</p>
          </div>
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
          <button className="text-gray-500 hover:text-gray-700">
            <FaCameraRetro className="text-xl" />
          </button>
          <button className="rounded-full bg-purple-500 p-2 text-white">
            <IoPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRight;
