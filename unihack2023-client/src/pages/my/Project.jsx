import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectBackend } from "../../features/backend/backendSlice";
import { selectLogin, selectUid } from "../../features/login/loginSlice";
import AnimatedVerticalPage from "../AnimatedVerticalPage";

function Project({}) {
  const [searchParams] = useSearchParams();

  const projectId = searchParams.get("projectId");

  const loggedInUID = useSelector(selectUid);

  const backendUrl = useSelector(selectBackend);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const loggedIn = useSelector(selectLogin);
  const backendURL = useSelector(selectBackend);

  useEffect(() => {
    if (!loggedIn) return;
    if (!projectId) return;

    axios
      .get(`${backendURL}/api/project/${projectId}`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn, projectId]);

  useEffect(() => {
    if (!project.project_name) return;
    axios
      .get(`${backendURL}/api/project/${project.proj_id}/tasks`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.tasks);
        console.log(tasks);
      });
  }, [project]);

  return (
    <AnimatedVerticalPage>
      <div className="m-4 flex w-full justify-center">
        <div className="w-full py-4 ">
          <h1 className="text-4xl text-center font-bold dark:text-zinc-200">
            {project.project_name}
          </h1>
          <div className="flex justify-center p-2">
            <p className="text-base font-semibold dark:text-zinc-400">
              {project.project_description}
            </p>
          </div>

          <div className="grid grid-cols-2 pt-4  mx-auto w-11/12">
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent to-zinc-900 dark:to-zinc-600"></div>
            <div className="w-full h-[0.5px] bg-gradient-to-r from-zinc-900 dark:from-zinc-600 to-transparent"></div>
          </div>

          <div className="flex flex-col items-start  justify-start  p-10 w-full space-y-3 h-[50rem] overflow-y-scroll scrollbar-hide rounded-lg ">
            {tasks.map((task) => {
              return <TaskBlock task={task} />;
            })}
          </div>
        </div>
      </div>
    </AnimatedVerticalPage>
  );
}

export default Project;

function TaskBlock({ task }) {
  return (
    <div className="w-[95%] cursor-pointer rounded-xl shadow-md shadow-zinc-500 dark:shadow-none text-zinc-900 dark:text-white dark:bg-zinc-700 dark:bg-opacity-60 p-3  hover:scale-[1.02] transition-all duration-150">
      <div className="grid grid-cols-4">
        <h1 className="col-span-3 text-2xl font-semibold">{task.name}</h1>
        <p className="flex justify-end mr-4">{task.date}</p>
      </div>
      <p className="text-gray-700 dark:text-zinc-400 mt-2 truncate-2-lines">
        {task.description}
      </p>

      <div className="flex flex-row justify-end mt-4">
        <button className="bg-green-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-lime-700">
          Complete
        </button>

        <button className="bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}
