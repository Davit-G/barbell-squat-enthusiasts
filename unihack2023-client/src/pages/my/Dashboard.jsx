/*
The dashboard is at /my and essentially shows the main summary view of the user's tasks and calendar.
Also provides a react router outlet for the nested routes.
*/

import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { shuffle } from "lodash";
function Dashboard({}) {
  const child = useOutlet(); // checks to see if we have a nested route, or if we are at the default route

  useEffect(() => {
    // when this component is rendered for the first time, do this

    console.log(child);
  }, [child]);

  return (
    <>
      <div className="h-[80vh] mx-auto mt-10 flex flex-row w-full">
        <div className="hidden md:flex rounded-xl shadow-lg shadow-zinc-500 w-[25rem] my-4 mr-4 p-4 px-8 h-[50vh] items-start flex-col justify-start">
          {" "}
          {/* Navigation on the left */}
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-2xl font-semibold text-left">Welcome, User</h1>
            <div className="mt-4 flex flex-col space-y-3">
              <Link
                to="/my/"
                className="text-base md:text-xl text-left hover:underline text-blue-500"
              >
                Project Overview
              </Link>
              <Link
                to="/my/tasks"
                className="text-base md:text-xl text-left hover:underline text-blue-500"
              >
                Today's Tasks
              </Link>
              <Link
                to="/my/week"
                className="text-base md:text-xl text-left hover:underline text-blue-500"
              >
                Weekly Overview
              </Link>
              <Link
                to="/my/calendar"
                className="text-base md:text-xl text-left hover:underline text-blue-500"
              >
                Calendar View
              </Link>
              {/* <Link className='text-base md:text-xl text-left hover:underline text-blue-500'>wtf do i add here</Link> */}
            </div>
          </div>
        </div>

        {/* tasks, calendar etc here */}
        <div className="m-4 flex  w-full">
          {child ? (
            child // If we are in a sub-route of /my such as /my/tasks, show the nested route, otherwise show the default dashboard
          ) : (
            <div className="w-full p-4 md:pl-20">
              <h1 className="text-4xl text-center font-semibold">
                Here are your projects:{" "}
              </h1>
              <div className="flex flex-col justify-start items-start my-6 p-3 w-full space-y-6 h-[45rem] overflow-y-scroll scrollbar-hide rounded-lg ">
                {" "}
                {/* Tasks go here */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((project) => {
                  return <Project project={project} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

function Project({ project }) {
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    setBgColor(shuffle(colours).pop());
  }, []);
  const colours = [
    "bg-red-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-white",
    "bg-gray-200",
  ];

  return (
    <div
      className={`rounded-xl ml-2 shadow-md shadow-zinc-500 p-3 w-full ${bgColor} bg-opacity-40 hover:brightness-75`}
    >
      <div className="grid grid-cols-4 w-full">
        <h1 className="text-2xl font-semibold col-span-3">
          {project}: Project Name
        </h1>

        <p className="flex justify-end pr-2">12 Tasks Remaining</p>
      </div>
      <div className="flex space-x-4 pt-3 pb-1">
        <p className="text-gray-500">Next Task: Task Name</p>
        <p className="text-zinc-900 font-bold">12:00 PM - 4:00 PM</p>
      </div>
    </div>
  );
}
