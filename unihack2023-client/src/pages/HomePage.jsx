import React, { useState, useEffect } from "react";
import { motion, useIsPresent } from "framer-motion";
import AnimatedHorizontalPage from "./AnimatedHorizontalPage";
import { useNavigate } from "react-router";
function HomePage({}) {
  const isPresent = useIsPresent();
  const navigate = useNavigate();
  return (
    <AnimatedHorizontalPage>
      <div className="h-[90vh] mx-auto">
        <div className="bg-zinc-100 dark:bg-zinc-700 dark:bg-opacity-60 p-4 px-20 h-[50vh] flex items-center flex-col  justify-center text-zinc-900 dark:text-white rounded-t-lg">
          <h1 className="text-5xl font-semibold text-center ">
            Planning projects has{" "}
            <span className="text-blue-500">never been this easy</span>!
          </h1>

          <div className="flex flex-row justify-center mt-4">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700"
            >
              Get Started
            </button>
            <button className="bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white p-4 px-20 h-[50vh] flex flex-col justify-center">
          <h1 className="text-4xl font-semibold text-left">
            What is Flex Task?
          </h1>
          <h2 className="text-xl text-left dark:text-zinc-400">
            Flextask is an AI powered time management app that will help you
            manage your project by breaking it down into more manageable tasks.
            We provide the user with an intuitive interface, prompting them for
            information about their project and generating the tasks with an
            OpenAI query. Once the tasks are generated, the user can tweak the
            provided tasks to their liking. Quick Tasks uses the Google Calendar
            API, allowing the user to effortlessly integrate the given tasks
            into their daily life.
          </h2>
        </div>
      </div>
    </AnimatedHorizontalPage>
  );
}

export default HomePage;
