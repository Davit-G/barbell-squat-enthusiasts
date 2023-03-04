import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectBackend } from '../../features/backend/backendSlice';
import { selectLogin } from '../../features/login/loginSlice';



function Project({ }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [project, setProject] = useState({
        projectExists: null,
    })

    const loggedIn = useSelector(selectLogin)
    const backendURL = useSelector(selectBackend)

    useEffect(() => {
        if (!loggedIn) return;
        
        // we are logged in, so get the project in the search param if possible
        axios.get(`${backendURL}/api/project/${searchParams.get("projectId")}`).then((res) => {
            console.log(res);
            setProject({ projectExists: true } + res.data)
        }).catch((err) => {
            console.log(err);
            setProject({ projectExists: false })
        });
    }, [loggedIn])

    return (
        <>
            <div className='p-8'>
                <h1 className='text-4xl font-semibold dark:text-zinc-200'>
                    {project.projectExists === true ? <>
                        {project.name}
                    </> : project.projectExists === false ? <>
                        Project does not exist, try again later... {searchParams.get("projectId")}
                    </> : <>
                        Loading...
                    </>}
                </h1>
            </div>
        </>
    );
}

export default Project;