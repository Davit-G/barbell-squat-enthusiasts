import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { signOut, getAuth } from "@firebase/auth";
import {motion, useIsPresent} from 'framer-motion'
import {
    selectDispayName,
    selectLogin,
    setLogin,
    setUserDetails,
} from "./features/login/loginSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function AppLayout({}) {
  const isPresent = useIsPresent()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const html = document.querySelector("html");
  const auth = getAuth();
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const loggedIn = useSelector(selectLogin);

    const displayName = useSelector(selectDispayName);

    const projects = ["Travel Europe", "Learn AI and ML", "Set up Super"];
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
                    <div className="flex-col flex h-full w-full justify-between items-start">
                        <div>
                            <div className="grid grid-cols-4">
                                <Link
                                    to="/"
                                    className="text-2xl dark:text-white font-semibold text-left col-span-3"
                                >
                                    Quick Tasks
                                </Link>
                                <button
                                    className="text-zinc-900 dark:text-gray-400 dark:hover:text-white hover:text-blue-700 justify-end mt-1 px-3"
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
                                        <Link
                                            to="/my/task/new"
                                            className="text-base md:text-lg text-left  font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
                                        >
                                            New Task
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
                                    className="text-base md:text-lg text-left  font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
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
                                        <div className="p-2 block space-y-1">
                                            {projects.map((project) => {
                                                return (
                                                    <div>
                                                        <Link
                                                            to={"/my/project?projectId=" + project}
                                                            key={project}
                                                            className="w-full text-base  text-left  font-semibold text-gray-500 hover:text-zinc-900 dark:text-zinc-500 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75"
                                                        >
                                                            {project}
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to="/"
                                    className="text-base md:text-lg text-left text-gray-500 hover:text-zinc-900 dark:text-zinc-300 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75 font-semibold"
                                >
                                    Settings
                                </Link>
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
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}

               
              </div>

              <div className=" flex flex-col h-1/2 justify-center">
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/"
                    className="text-base md:text-lg text-left text-gray-500 hover:text-zinc-900 dark:text-zinc-300 no-underline dark:hover:text-zinc-400 dark:hover:text-opacity-75 font-semibold"
                  >
                    Settings
                  </Link>
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
        </>
    );
}

export default AppLayout;
