import React, { useState, useRef } from "react";
import Search from "../Search/Search.jsx";
import { FcSearch } from "react-icons/fc";
import avatar from "../../../../assets/home/Homeright/purr.gif";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
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
  const [modalIsOpen, setIsOpen] = useState(false);
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
    }
  };

  console.log(cropData);

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
              GroupList
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
                  <p className="subHeading">
                    Hi Guys, Wassup Lorem ipsum dolor
                  </p>
                </div>

                <button className="buttonCommon ml-4 rounded-lg px-2 py-2">
                  Join
                </button>
              </div>
            ))}
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
                value={""}
              />

              <label htmlFor="grouptagName">
                grouptagName <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-xl border-2 border-red-100 bg-gray-200 px-2 py-2"
                type="text"
                id="grouptagName"
                name="grouptagName"
                value={""}
              />

              {/* CROPPER BODY */}
              <div>
                <div style={{ width: "100%" }}>
                  <input type="file" onChange={onChange} />
                  <button>Use default img</button>
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
                    <h1 className="absolute -top-7">Preview</h1>
                    <div className="img-preview preview_box z-10 h-[250px] overflow-hidden" />
                  </div>
                  {/* preview */}
                  {/* crop div */}
                  <div className="relative h-[250px] w-[350px] bg-blue-400">
                    <h1 className="absolute -top-7">
                      <button onClick={getCropData} className="bg-red-500">
                        Crop Image
                      </button>
                    </h1>
                    <img className="cropImage" src={cropData} alt="cropped" />
                  </div>
                  {/* crop div */}
                </div>
              </div>
              {/* CROPPER BODY */}

              <button>Create Group</button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GroupList;
