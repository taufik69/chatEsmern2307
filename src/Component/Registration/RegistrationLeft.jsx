import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  isEmailValid,
  userNameValidator,
  passwordisValid,
} from "../../../Utils/Validation/validation.js";
import {
  SucessToast,
  ErrorToast,
  infoToast,
} from "../../../Utils/Toastfy/Toast.js";
import { Circles } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import moment from "moment";
import { Link } from "react-router-dom";
const RegistrationLeft = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [Eye, setEye] = useState(false);
  const [Email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setpassword] = useState("");
  // Error State
  const [EmailError, setEmailError] = useState("");
  const [fullNameError, setfullNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loading, setloading] = useState(false);

  /**
   * todo : handleEye funtion implement
   * @param({})
   */

  const handleEye = () => {
    setEye(!Eye);
  };

  // handleEmail
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  /**
   * todo : handleSignUp funtion implemnet
   * @param({})
   *
   */

  const handleSignUp = () => {
    if (!Email || !isEmailValid(Email)) {
      setEmailError("Email Missing OR invalid Email");
    } else if (!fullName || !userNameValidator(fullName)) {
      setEmailError("");
      setfullNameError("fullName Missing or fullName must be 5 - 20 char");
    } else if (!password || !passwordisValid(password)) {
      setfullNameError("");
      setpasswordError(
        "password Missing || must be 8 character uppercase lowercase and speacila char",
      );
    } else {
      setloading(true);
      createUserWithEmailAndPassword(auth, Email, password)
        .then((userinfo) => {
          SucessToast(`${fullName} Registration Sucessfully`);
        })
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
          });
        })
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            infoToast(`${auth.currentUser.displayName} Please Check Your Mail`);
          });
        })
        .then(() => {
          const UserRef = ref(db, "users/");
          set(push(UserRef), {
            userUid: auth.currentUser.uid,
            UserEmail: auth.currentUser.email,
            UserName: fullName,
            UserPhotoUrl: "",
            createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
          });
        })
        .catch((err) => {
          ErrorToast(`${err.code}`, "top-right", 7000);
        })
        .finally(() => {
          setEmail("");
          setfullName("");
          setpassword("");
          setEmailError("");
          setpasswordError("");
          setfullNameError("");
          setloading(false);
        });
    }
  };

  return (
    <div className="h-screen w-[60%]">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col gap-y-8">
          <div>
            <h1 className="font-custonNunito text-[49px] font-bold text-Auth_main_color">
              Get started with easily register
            </h1>
            <p className="font-custonNunito text-xl font-normal text-[rgba(0,0,0,0.32)]">
              Free register and you can enjoy it
            </p>
          </div>
          <div className="flex">
            <form
              action="#"
              method="post"
              className="basis-[70%]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex w-full flex-col items-stretch justify-start gap-y-8">
                <div>
                  <fieldset className="rounded-lg border-2 border-[rgba(17,23,93,0.42)] px-5 py-3">
                    <legend className="px-3 font-custonNunito text-sm font-semibold text-Auth_main_color">
                      Email
                    </legend>

                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="mern2307@gmail.com"
                      className="w-full"
                      value={Email}
                      onChange={handleEmail}
                    />
                  </fieldset>
                  <span className="mt-2 block text-red-600">{EmailError}</span>
                </div>
                <div>
                  <fieldset className="rounded-lg border-2 border-[rgba(17,23,93,0.42)] px-5 py-3">
                    <legend className="px-3 font-custonNunito text-sm font-semibold text-Auth_main_color">
                      Full Name
                    </legend>

                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      placeholder="mern 2307"
                      className="w-full"
                      onChange={(e) => setfullName(e.target.value)}
                    />
                  </fieldset>
                  <span className="mt-2 block text-red-600">
                    {fullNameError}
                  </span>
                </div>
                <div>
                  <fieldset className="rounded-lg border-2 border-[rgba(17,23,93,0.42)] px-5 py-3">
                    <legend className="px-3 font-custonNunito text-sm font-semibold text-Auth_main_color">
                      Password
                    </legend>

                    <div className="flex items-center justify-between">
                      <input
                        type={Eye ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        placeholder="******"
                        className="w-full"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <span onClick={handleEye}>
                        {Eye ? (
                          <FaEyeSlash className="cursor-pointer text-2xl" />
                        ) : (
                          <FaEye className="cursor-pointer text-2xl" />
                        )}
                      </span>
                    </div>
                  </fieldset>
                  <span className="mt-2 block text-red-600">
                    {passwordError}
                  </span>
                </div>
              </div>
              <button
                className="mt-16 w-full cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-5 font-custonNunito font-medium text-white"
                onClick={handleSignUp}
              >
                {loading ? (
                  <span className="flex justify-center">
                    <Circles
                      height="30"
                      width="80"
                      color="#ffff"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
              <p className="mt-5 flex items-center justify-center text-xl font-normal text-Auth_main_color">
                Already have an account ?
                <span className="cursor-pointer text-[#EA6C00] hover:underline">
                  <Link to={"/login"}> Sign In</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLeft;
