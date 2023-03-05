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
        setTasks(res.data);
      });
  }, [project]);

  return (
    <AnimatedVerticalPage>
      <div className="m-4 flex w-full justify-center">
        <div className="w-full py-4 ">
          <h1 className="text-4xl text-center font-semibold dark:text-zinc-200">
            {project.project_name}
          </h1>

          <div className="grid grid-cols-2 pt-4  mx-auto w-11/12">
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent to-zinc-900 dark:to-zinc-600"></div>
            <div className="w-full h-[0.5px] bg-gradient-to-r from-zinc-900 dark:from-zinc-600 to-transparent"></div>
          </div>

          <div className="flex flex-col items-center justify-start mb-4 mt-2 p-4 w-full space-y-3 h-[50rem] overflow-y-scroll scrollbar-hide rounded-lg "></div>
        </div>
      </div>
    </AnimatedVerticalPage>
  );
}

export default Project;
