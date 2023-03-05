/*
The dashboard is at /my and essentially shows the main summary view of the user's tasks and calendar.
Also provides a react router outlet for the nested routes.
*/

import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { shuffle } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { selectDispayName, selectLogin, selectUid } from "../../features/login/loginSlice";
import { selectBackend } from "../../features/backend/backendSlice";
import AnimatedVerticalPage from "../AnimatedVerticalPage";
import axios from "axios";
import { setProjects } from "../../features/projects/projectsSlice";
import { getAllProjects } from "../../features/projects/projectsSlice";
function Dashboard({ }) {
    const child = useOutlet(); // checks to see if we have a nested route, or if we are at the default route
    const dispatch = useDispatch();
    const userProjects = useSelector(getAllProjects)
    const backendURL = useSelector(selectBackend);
    const loggedIn = useSelector(selectLogin);
    const displayname = useSelector(selectDispayName);
    const loggedInUID = useSelector(selectUid)

  useEffect(() => {
    if (!loggedIn) return;
    if (!displayname) return;

        // we are logged in, so get the user's projects
        axios.get(`${backendURL}/api/user/${loggedInUID}/projects`).then((res) => {
            console.log(res);
            dispatch(
                setProjects({
                    projects: res.data.projects,
                })
            )
        });
        
    }, [loggedIn]);

    return (
        <AnimatedVerticalPage>
            {/* tasks, calendar etc here */}
            <div className="m-4 flex w-full justify-center">
                {child ? (
                    child // If we are in a sub-route of /my such as /my/tasks, show the nested route, otherwise show the default dashboard
                ) : (
                    <div className="w-full py-4 ">
                        <h1 className="text-4xl text-center font-semibold dark:text-zinc-200">
                            Active projects
                        </h1>

                        <div className="grid grid-cols-2 pt-4  mx-auto w-11/12">
                            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent to-zinc-900 dark:to-zinc-600"></div>
                            <div className="w-full h-[0.5px] bg-gradient-to-r from-zinc-900 dark:from-zinc-600 to-transparent"></div>
                        </div>

                        <div className="flex flex-col items-center justify-start mb-4 mt-2 p-4 w-full space-y-3 h-[50rem] overflow-y-scroll scrollbar-hide rounded-lg ">
                            {" "}
                            {/* Tasks go here */}
                            {userProjects.map((project, index) => {
                                return <Project key={`project-${index}`} project={project} />;
                            })}
                        </div>
                    </div>
                )}
            </div>

        </AnimatedVerticalPage>
    );
}

export default Dashboard;

function Project({ project }) {
    

    const [bgColor, setBgColor] = useState("bg-white");
    useEffect(() => {
        setBgColor(shuffle(colours).pop());
    }, [bgColor]);
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
        <Link to={`/my/projects?projectId=${project.project_id}`}
            className={`rounded-xl ml-2 shadow-sm shadow-zinc-500 p-4 w-11/12 ${bgColor} hover:scale-[1.02] transition-all duration-150 cursor-pointer`}
        >
            <div className="grid grid-cols-4 w-full">
                <h1 className="text-2xl font-semibold col-span-3">
                    {project.project_name}
                </h1>

                <p className="flex justify-end pr-2">12 Tasks Remaining</p>
            </div>
            <div className="flex space-x-4 pt-3 pb-1">
                <p className="text-gray-500">Next Task: Task Name</p>
                <p className="text-purple-600">12:00 PM - 4:00 PM</p>
            </div>
        </Link>
    );
}
