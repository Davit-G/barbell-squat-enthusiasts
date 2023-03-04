import React, { useState, useEffect } from "react";

function TaskBlock({ num }) {
  return (
    <>
      <div className="cursor-pointer rounded-xl shadow-md shadow-zinc-500 dark:shadow-none text-zinc-900 dark:text-white dark:bg-zinc-700 dark:bg-opacity-60 p-3 w-full hover:scale-[1.02] transition-all duration-150">
        <p className="text-purple-600">12:00 PM - 4:00 PM</p>
        <h1 className="text-2xl font-semibold">{num}: Task name</h1>
        <p className="text-gray-700 dark:text-zinc-400 mt-2 truncate-2-lines">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nunc sit amet ultricies ultricies, nunc nisl aliquam nisl, eget
          aliquam nisl nisl sit amet lorem. Sed euismod, nunc sit amet ultricies
          ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet
          lorem.
        </p>

        <div className="flex flex-row justify-end mt-4">
          <button className="bg-green-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-lime-700">
            Complete
          </button>
          <button className="bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700">
            Edit
          </button>
          <button className="bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

function Tasks({}) {
  // tasks view, shows up here temporarily
  return (
    <>
      <div className="w-full p-8 pt-10  flex  flex-col justify-start items-end">
        <h1 className="text-4xl font-semibold text-left dark:text-zinc-200 m-auto">
          Your tasks for today
        </h1>
        <div className="grid grid-cols-2 pt-4  mx-auto w-11/12">
          <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent to-zinc-900 dark:to-zinc-600"></div>
          <div className="w-full h-[0.5px] bg-gradient-to-r from-zinc-900 dark:from-zinc-600 to-transparent"></div>
        </div>
        <div className="flex flex-col justify-start items-start space-y-4 mt-8 p-6 w-full overflow-y-scroll scrollbar-hide h-[45rem]">
          {" "}
          {/* Tasks go here */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((task) => {
            return <TaskBlock key={task} num={task} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Tasks;
