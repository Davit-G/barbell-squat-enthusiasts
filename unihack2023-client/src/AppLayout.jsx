import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { signOut, getAuth } from "@firebase/auth";
import { motion, useIsPresent } from "framer-motion";
import { selectBackend } from "./features/backend/backendSlice";
import { getAllProjects } from "./features/projects/projectsSlice";
import {
  selectDispayName,
  selectLogin,
  setLogin,
  setUserDetails,
  selectUid,
} from "./features/login/loginSlice";
import { setProjects } from "./features/projects/projectsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

function AppLayout({}) {
  const isPresent = useIsPresent();
  const backendURL = useSelector(selectBackend);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const html = document.querySelector("html");
  const auth = getAuth();
  const displayName = useSelector(selectDispayName);
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const userUID = useSelector(selectUid);
  const loggedIn = useSelector(selectLogin);

  useEffect(() => {
    if (!loggedIn) return;
    if (!displayName) return;

    // we are logged in, so get the user's projects
    axios.get(`${backendURL}/api/user/${userUID}/projects`).then((res) => {
      dispatch(
        setProjects({
          projects: res.data.projects,
        })
      );
    });
  }, [loggedIn]);

  const userProjects = useSelector(getAllProjects);

  const themeSwitch = () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <>
      <div className="flex flex-row min-h-screen max-h-screen overflow-hidden">
        <div className="hidden md:block w-80 bg-zinc-200 dark:bg-zinc-800 p-6">
          {" "}
          {/* Navigation on the left */}
          <div className=" flex-col h-full justify-between items-start">
            <div className="h-full w-full">
              <div className="grid grid-cols-4">
                <Link
                  to="/"
                  className="text-2xl dark:text-white font-semibold text-left col-span-3"
                >
                  Quick Tasks
                </Link>
                <button
                  className="text-zinc-900 dark:text-gray-400 dark:hover:text-white hover:text-blue-700 justify-end mt-1"
                  onClick={() => {
                    themeSwitch();
                  }}
                >
                  <MoonIcon className="block dark:hidden w-5 h-5" />
                  <SunIcon className="hidden dark:block w-5 h-5" />
                </button>
              </div>
              {loggedIn ? (
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-4">
                  Signed in as {displayName}
                </div>
              ) : (
                <></>
              )}
              <br></br>
              <span className="w-full pt-[2px] bg-gray-300"></span>
              <br></br>
              {loggedIn ? (
                <>
                  <div className="flex flex-col space-y-3 ">
                    <h1 className="text-base md:text-2xl text-left  font-bold text-black-500 dark:text-zinc-300">
                      Add
                    </h1>
                    <Link
                      to="/my/project/new"
                      className="text-base md:text-lg text-left  font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
                    >
                      New Project
                    </Link>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="flex flex-col mt-10 space-y-3 ">
                <h1 className="text-base md:text-2xl text-left  font-bold text-black-500 dark:text-zinc-300">
                  View
                </h1>
                <Link
                  to="/my/"
                  className="text-base md:text-lg text-left  font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-400 no-underline dark:hover:text-zinc-500 dark:hover:text-opacity-75"
                >
                  Project Overview
                </Link>
                <Link
                  to="/my/week"
                  className="text-base md:text-lg text-left  font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
                >
                  Weekly Overview
                </Link>
                <Link
                  to="/my/tasks"
                  className="text-base md:text-lg text-left font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
                >
                  Today's Tasks
                </Link>
                <Link
                  to="/my/calendar"
                  className="text-base md:text-lg text-left font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
                >
                  Calendar View
                </Link>
                <br></br>
                {loggedIn ? (
                  <>
                    <h1 className="text-base md:text-2xl text-left  font-bold text-black-500 dark:text-zinc-300">
                      Projects
                    </h1>
                    <div className="p-1 block ">
                      {userProjects.map((project, index) => {
                        return (
                          <Link
                            to={`/my/project?projectId=${project.proj_id}`}
                            key={`dashboard-user-project-${index}`}
                          >
                            <div className="truncate-1-lines my-1 text-base text-left font-semibold text-gray-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-600 ">
                              {project.project_name}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className=" flex flex-col my-10">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          // Sign-out successful.
                          dispatch(
                            setUserDetails({
                              uid: "",
                              displayName: "",

                              accessToken: "",
                            })
                          );
                          dispatch(setLogin(false));
                          navigate("/");
                          localStorage.setItem("state", null);
                        })
                        .catch((error) => {
                          // An error happened.
                        });
                    }}
                    className="text-base md:text-lg text-left text-gray-500 hover:text-zinc-900 dark:text-zinc-300 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75 font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              </div>
              <span className="w-full pt-[2px] mt-10 bg-gray-300"></span>
            </div>
          </div>
        </div>
        <div className="w-full">
          {loggedIn ? (
            <Outlet />
          ) : (
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className="text-2xl font-bold text-gray-500 dark:text-zinc-300">
                You are not logged in
              </h1>
              <Link
                to="/login"
                className="text-base md:text-lg text-left text-gray-500 hover:text-zinc-900 dark:text-zinc-300 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75 font-semibold"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
      <footer className="w-full h-fit absolute bottom-0 left-0 w-f">
        <div className="bg-zinc-200 p-6 text-center dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-300">
          <span className="">© 2023 </span>
          <a className="hover:underline " href="/">
            Quick Tasks
          </a>
        </div>
      </footer>
    </>
  );
}

export default AppLayout;
