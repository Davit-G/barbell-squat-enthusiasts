import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectBackend } from "../../features/backend/backendSlice";
import { selectLogin, selectUid } from "../../features/login/loginSlice";
import AnimatedVerticalPage from "../AnimatedVerticalPage";

function Project({}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const loggedInUID = useSelector(selectUid)
  // const [project, setProject] = useState({
  //     projectExists: null,
  // })

  const project = {
    proj_id: "4e12d3af54f94f2591db2264f74493ca",

    end_date: null,
    project_description: "would be funny to be a comedian",
    project_name: "comedy",

    
    start_date: null,
    uid: "smSgLkA7wmSsaTumG138b1IyawS2",
  };

  useEffect(() => {
    if(!loggedIn) return
    axios.get
  })

  useEffect(() => {
    if (!loggedIn) return
    if(!project) return 

    axios.get(`${backendURL}/api/project/${project.proj_id}/tasks`).then((res) => {
      console.log(res.data);
      // dispatch(
      //     setProjects({
      //         projects: res.data.projects,
      //     })
      // )
    })
  },[project])

  const tasks = [{
    "_id": {
      "$oid": "6403c502f5f802845bf78808"
    },
    "task_id": "90b953ef290248c3b252bbb92bd85514",
    "description": "Find and watch comedy specials of successful comedians to learn about their style and techniques. Take notes on what works and what doesn't.",
    "name": "Research Comedians",
    "proj_id": "4e12d3af54f94f2591db2264f74493ca",
    "time": "16/08/2021"
  },{
    "_id": {
      "$oid": "6403c502f5f802845bf7880a"
    },
    "task_id": "e58d29821e1a4e6da4d4c2b8eacb182a",
    "description": "Start writing jokes based on personal experiences, observations, and general humor. Experiment with different styles and formats.",
    "name": "Write Jokes",
    "proj_id": "4e12d3af54f94f2591db2264f74493ca",
    "time": "18/08/2021"
  },{
    "_id": {
      "$oid": "6403c502f5f802845bf7880c"
    },
    "task_id": "4b93816919ef4170ad69f9481f95b9bd",
    "description": "Practice telling jokes in front of a mirror, recording yourself, or performing in front of friends and family. Work on timing, tone, and body language.",
    "name": "Practice Delivery",
    "proj_id": "4e12d3af54f94f2591db2264f74493ca",
    "time": "22/08/2021"
  }
]

  const loggedIn = useSelector(selectLogin);
  const backendURL = useSelector(selectBackend);

  useEffect(() => {
    if (!loggedIn) return;

    // we are logged in, so get the project in the search param if possible
    axios
      .get(`${backendURL}/api/project/${searchParams.get("projectId")}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setProject({ projectExists: true } + res.data);
      })
      .catch((err) => {
        console.log(err);
        setProject({ projectExists: false });
      });
  }, [loggedIn]);

  return (
    <AnimatedVerticalPage>
      <div className="p-8"></div>
      {/* <div className='p-8'>
                <h1 className='text-4xl font-semibold dark:text-zinc-200'>
                    {project.projectExists === true ? <>
                        {project.name}
                    </> : project.projectExists === false ? <>
                        Project does not exist, try again later... {searchParams.get("projectId")}
                    </> : <>
                        Loading...
                    </>}
                </h1>
            </div> */}
    </AnimatedVerticalPage>
  );
}

export default Project;
