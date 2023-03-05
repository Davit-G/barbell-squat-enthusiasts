import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChatWindow from '../../components/Chat';
import { selectBackend } from '../../features/backend/backendSlice';
import { selectLogin, selectUid } from '../../features/login/loginSlice';
import AnimatedVerticalPage from '../AnimatedVerticalPage';


function NewProjectPage({ }) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const loggedIn = useSelector(selectLogin)
    const backendURL = useSelector(selectBackend)
    const uid = useSelector(selectUid)

    const [projectPageState, setProjectPageState] = useState("new")
    const [projectDetails, setProjectDetails] = useState({})

    const proceedWithSubmissions = () => {

        setProjectDetails({
            project_name: projectName,
            project_description: projectDescription,
            owner_uid: uid,
        })

        setProjectPageState("chat")
    }

    return (
        <AnimatedVerticalPage>
            <div className="h-full min-h-fit w-full overflow-auto ">
                {projectPageState === "new" ? <>

                    <div className='w-1/2 mx-auto pt-20 pb-10'>
                        <div className='mx-auto mb-10'>
                            <h1 className='font-semibold text-center w-full text-5xl mb-2 text-teal-600 dark:text-teal-200'>Making a new project?</h1>
                            <p className='text-gray-500 text-xl text-center w-full dark:text-gray-400'>Let's get started!</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-10 dark:shadow-none shadow-md dark:bg-zinc-900 border-2 dark:border-4 border-zinc-100 dark:border-zinc-600 p-8 shadow-zinc-400 rounded-xl">
                            <div className='w-full gap-2 flex flex-col'>
                                <h2 className='text-xl w-full text-teal-700 dark:text-teal-300'>What is the name of your project?</h2>
                                <p className='text-gray-500 dark:text-gray-400'>Used to identify your projects.</p>
                                <input value={projectName} onChange={(e) => { setProjectName(e.target.value) }} type="text" placeholder='Project Name' className="border-2 w-full focus:ring-4 focus:ring-teal-500 dark:border-zinc-900 dark:bg-zinc-800 placeholder-zinc-400 dark:text-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" />
                            </div>
                            {/* <div className='w-full gap-2 flex flex-col'>
                                <h2 className='text-xl w-full text-teal-700 dark:text-teal-300'>Describe your project!</h2>
                                <div>
                                    <p className='text-gray-500 dark:text-gray-400'>Use natural language, tell us what your project is about.</p>
                                    <p className='text-gray-500 dark:text-gray-400'>Our AI tool will naturally split the tasks for you quickly!</p>
                                </div>
                                <textarea value={projectDescription} onChange={(e) => { setProjectDescription(e.target.value) }} type="text" rows={120} cols={30} placeholder='Project Description' className="border-2 p-2 w-full h-40 focus:ring-4 focus:ring-teal-500 dark:border-zinc-900 dark:bg-zinc-800 placeholder-zinc-400 dark:text-white px-5 pr-16 rounded-lg text-sm focus:outline-none" />
                            </div> */}

                            <button onClick={proceedWithSubmissions} className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold rounded-lg shadow-md px-8 py-2 m-2 hover:from-teal-700 hover:to-cyan-800">
                                Initialise Project
                            </button>
                        </div>
                    </div>

                    <div className=''>

                    </div>

                </> : projectPageState === "chat" ? <>

                    <div className='mx-auto h-full p-20'>
                        <h1 className='dark:text-white text-4xl text-left mb-10 w-full my-auto'>Chat to the AI about project <span className='dark:text-teal-500'>"{projectName}"</span>...</h1>

                        <ChatWindow onceChatIsDone={(projectId) => {
                            setProjectPageState("created");
                            
                            // add project id to project details
                            setProjectDetails({ ...projectDetails, project_id: projectId })
                        }} projectName={projectName}></ChatWindow>
                    </div>

                </> : projectPageState === "loading" ? <>

                    <div className='mx-auto mt-20 p-20'>
                        <h1 className='dark:text-white text-4xl text-center w-full h-full my-auto'>Generating tasks for <span className='dark:text-teal-500'>"{projectDetails?.project_name}"</span> using AI...</h1>
                    </div>

                </> : projectPageState === "created" ? <>

                    <div className='mx-auto mt-20 p-20'>
                        <h1 className='dark:text-white text-4xl text-center w-full h-full my-auto'>Project <span className='dark:text-teal-500'>"{projectDetails?.project_name}"</span> Has been created!</h1>
                        <Link to={`/my/project?projectId=${projectDetails?.project_id}`} className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold rounded-lg shadow-md px-8 py-2 m-2 hover:from-teal-700 hover:to-cyan-800">
                            Go to Project
                        </Link>
                    </div>

                </> : <>

                </>}

            </div>
        </AnimatedVerticalPage>
    );
}

export default NewProjectPage;