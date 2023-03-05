import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserDetails } from "../features/login/loginSlice";
import { selectBackend } from "../features/backend/backendSlice";
import { motion, useIsPresent } from "framer-motion";
import AnimatedHorizontalPage from "./AnimatedHorizontalPage";

function Login({}) {
  const navigate = useNavigate();
  const isPresent = useIsPresent();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const backendURL = useSelector(selectBackend);

  const signUpWithGoogle = () => {
    console.log("Signing up..."); // TODO: sign up with google? how tf
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const user = res.user;

        // maybe handle this better in the future, request might not go through and front end might think it's logged in when it isn't.
        console.log(backendURL);

        axios
          .post(`${backendURL}/api/create_user/`, {
            uid: user.uid,
            name: user.displayName,
          })
          .then((res) => {
            navigate("/my", { replace: true });
            dispatch(setLogin(true));

            dispatch(
              setUserDetails({
                uid: user.uid,
                displayName: user.displayName,
                accessToken: user.accessToken,
              })
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AnimatedHorizontalPage>
      <div className="h-[90vh] flex items-center justify-center flex-col">
        {" "}
        {/* main page container*/}
        <div className="md:w-3/5 sm:w-6/7 w-full mx-auto py-10 p-2 rounded-2xl shadow-lg dark:shadow-none dark:bg-zinc-700 dark:bg-opacity-60">
          {" "}
          {/* login box in the middle*/}
          <h1 className="w-full text-center text-4xl font-semibold text-zinc-900 dark:text-zinc-200">
            Log In to Quick Tasks
          </h1>
          <p className="text-gray-700 dark:text-zinc-400 text-center mt-8">
            Choose your login provider:
          </p>
          <div className="w-full max-w-lg mx-auto mt-4">
            {/* Google sign in only */}
            <div className="">
              <button
                onClick={signUpWithGoogle}
                type="button"
                className="w-full justify-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center mr-2 mb-2"
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedHorizontalPage>
  );
}

export default Login;
