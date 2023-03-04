import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';



function AppLayout({ }) {
    return (
        <>
            <div className='flex flex-row min-h-screen max-h-screen'>
                <div className='w-80 bg-gray-200 p-6'>

                    {" "}
                    {/* Navigation on the left */}

                    <div className="flex flex-col h-full justify-between items-start">
                        <div className='h-full'>

                            <h1 className="text-2xl dark:text-white font-semibold text-left">Tasks App</h1>
                            <br></br>
                            <span class="w-full pt-[2px] bg-gray-300"></span>
                            <br></br>
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to="/my/"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    Overview
                                </Link>
                                <Link
                                    to="/my/week"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    Weekly Overview
                                </Link>
                                <Link
                                    to="/my/tasks"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    Today's Tasks
                                </Link>
                                <Link
                                    to="/my/calendar"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    Calendar View
                                </Link>
                                <br></br>
                                <h1 className="text-base md:text-xl text-left hover:underline font-bold text-black-500 dark:text-blue-400">Projects</h1>
                                
                                <Link
                                    to="/my/projects/1"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    This Ceremony
                                </Link>
                                <Link
                                    to="/my/projects/2"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    That Anniversary
                                </Link>
                            </div>
                            <span className="w-full pt-[2px] mt-10 bg-gray-300"></span>
                        </div>

                        <div>
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to="/my/tasks"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/my/calendar"
                                    className="text-base md:text-lg text-left hover:underline font-semibold text-gray-500 dark:text-blue-400"
                                >
                                    Log Out
                                </Link>
                            </div>
                            <span class="w-full pt-[2px] mt-10 bg-gray-300"></span>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>

            </div>
        </>
    );
}

export default AppLayout;