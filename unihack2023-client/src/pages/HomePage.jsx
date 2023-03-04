import React, { useState, useEffect } from "react";

function HomePage({}) {


  return (
    <>
      <div className="h-[90vh] mx-auto">
        <div className="bg-zinc-100 dark:bg-zinc-700 dark:bg-opacity-60 p-4 px-20 h-[50vh] flex items-center flex-col  justify-center text-zinc-900 dark:text-white rounded-t-lg">
          <h1 className="text-5xl font-semibold text-center ">
            Planning projects has{" "}
            <span className="text-blue-500">never been this easy</span>!
          </h1>
          <h2 className="text-2xl font-semibold text-center">
            (btw the name quick tasks is temporary)
          </h2>

          <div className="flex flex-row justify-center mt-4">
            <button className="bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700">
              Get Started
            </button>
            <button className="bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white p-4 px-20 h-[50vh] flex flex-col justify-center">
          <h1 className="text-4xl font-semibold text-left">
            What is Quick Tasks?
          </h1>
          <h2 className="text-xl text-left dark:text-zinc-400">
            Quick tasks helps you break overwhelming projects down to achieve
            your goals!
          </h2>
        </div>
      </div>
    </>
  );
}

export default HomePage;
