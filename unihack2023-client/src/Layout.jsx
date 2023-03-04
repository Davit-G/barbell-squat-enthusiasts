import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectDispayName, selectLogin } from "./features/login/loginSlice";
function Layout({ children }) {
  const displayName = useSelector(selectDispayName);
  const loggedIn = useSelector(selectLogin);

  const html = document.querySelector("html");
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      html.classList.add("dark");
      return;
    }
  };

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
    <div className="flex flex-col">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-zinc-900">
        {" "}
        {/* nav bar type thing */}
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Quick Tasks
            </span>{" "}
            {/* title */}
          </a>

          {/* The actual nav bar */}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-black-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                {loggedIn ? (
                  <Link
                   to={'/my'}
                   className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    {displayName}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                )}
              </li>
              <li>
                <button
                  className="text-zinc-900 dark:text-gray-400 dark:hover:text-white hover:text-blue-700"
                  onClick={() => {
                    themeSwitch();
                  }}
                >
                  <MoonIcon className="block dark:hidden w-5 h-5" />
                  <SunIcon className="hidden dark:block w-5 h-5" />
                </button>
              </li>
            </ul>
          </div>
          <button
            className="text-zinc-900 dark:text-gray-400 dark:hover:text-white hover:text-blue-700 block md:hidden"
            onClick={() => {
              themeSwitch();
            }}
          >
            <MoonIcon className="block dark:hidden w-5 h-5" />
            <SunIcon className="hidden dark:block w-5 h-5" />
          </button>

          {/* Some weird stuff i found in the template i used (dave) */}
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      <div className="container min-h-full mx-auto">{children}</div>

            <div className="container min-h-full mx-auto">{children ? children : <Outlet></Outlet>}</div>

      {/* <footer className='h-fit'>
                <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
                    <span className='text-neutral-600'>© 2023 </span>
                    <a
                        className="hover:underline text-neutral-600 dark:text-neutral-400"
                        href="/"
                    >
                        Quick Tasks
                    </a>
                </div>
            </footer> */}
    </div>
  );
}

export default Layout;
