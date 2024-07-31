import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  isEmailValid,
  passwordisValid,
} from "../../../Utils/Validation/validation";
import { ColorRing } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ErrorToast, SucessToast } from "../../../Utils/Toastfy/Toast";
import moment from "moment";
import { getDatabase, push, ref, set } from "firebase/database";
const LoginLeft = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [loading, setloading] = useState(false);
  const [Eye, setEye] = useState(false);
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });
  const [loginError, setloginError] = useState({
    emailError: "",
    passwordError: "",
  });
  /**
   * todo: takes a input from email and password field
   * @param({evnet})
   */
  const handleInput = (event) => {
    const { id, value } = event.target;
    setloginInput({
      ...loginInput,
      [id]: value,
    });
  };

  /**
   * todo : handleEye funtion implement
   * @param({})
   */

  const handleEye = () => {
    setEye(!Eye);
  };
  /**
   * todo : handleSignin function implentation
   * @param ({})
   */

  const handleSignin = () => {
    const { email, password } = loginInput;
    if (!email || !isEmailValid(email)) {
      setloginError({
        ...loginError,
        emailError: "Email Missing OR invalid Email",
      });
    } else if (!password || !passwordisValid(password)) {
      setloginError({
        ...loginError,
        emailError: "",
        passwordError:
          "password Missing || must be 8 character uppercase lowercase and speacila char",
      });
    } else {
      setloading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          SucessToast(`Login Sucessfull`);
        })
        .catch((error) => {
          const errorCode = error.code;

          ErrorToast(`${errorCode}`, "top-center");
        })
        .finally(() => {
          setloading(false);
          setloginError({ ...loginError, emailError: "", passwordError: "" });
          setloginInput({
            email: "",
            password: "",
          });
        });
    }
  };

  /**
   * todo handleLoginWithGoogle function implementation
   *
   */
  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return user;
      })
      .then((user) => {
        const { photoUrl, displayName, email, localId } = user.reloadUserInfo;
        const UserRef = ref(db, "users/");
        set(push(UserRef), {
          userUid: localId,
          UserEmail: email,
          UserName: displayName,
          UserPhotoUrl: photoUrl ? photoUrl : "",
          createdAt: moment().format(" MM DD YYYY, h:mm:ss a"),
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        ErrorToast(`${errorCode}`);
      });
  };

  return (
    <div className="h-screen w-[60%] bg-blue-100">
      <div className="flex h-full items-center justify-center">
        <div className="flex-col items-center justify-center">
          <div className="flex flex-col gap-y-10">
            <h1 className="font-custonNunito text-[49px] font-bold text-Auth_main_color">
              Login to your account!
            </h1>
            <div
              onClick={handleLoginWithGoogle}
              className="flex w-[40%] cursor-pointer items-center justify-center gap-x-1 rounded-xl border-[1px] border-gray-500 py-4"
            >
              <span>
                <FcGoogle />
              </span>
              <button>Login With Google</button>
            </div>
          </div>

          <div className="mt-10">
            <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-y-10">
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
                      onChange={handleInput}
                    />
                  </fieldset>
                  <span className="mt-2 block text-red-600">
                    {loginError.emailError && loginError.emailError}
                  </span>
                </div>
                <div>
                  <fieldset className="rounded-lg border-2 border-[rgba(17,23,93,0.42)] px-5 py-3">
                    <legend className="px-3 font-custonNunito text-sm font-semibold text-Auth_main_color">
                      password
                    </legend>
                    <div className="flex items-center justify-between">
                      <input
                        type={Eye ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="*****"
                        className="w-full"
                        onChange={handleInput}
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
                    {loginError.passwordError && loginError.passwordError}
                  </span>
                </div>
              </div>
            </form>
          </div>
          <button
            onClick={handleSignin}
            className="mt-16 w-full cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-5 font-custonNunito font-medium text-white"
          >
            {loading ? (
              <span className="flex justify-center">
                <ColorRing
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
              "Sign In"
            )}
          </button>
          <p className="mt-5 flex items-center justify-start text-xl font-normal text-Auth_main_color">
            Don’t have an account
            <span className="cursor-pointer text-[#EA6C00] hover:underline">
              <Link to={"/registration"}>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeft;
