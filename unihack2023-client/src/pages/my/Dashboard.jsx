/*
The dashboard is at /my and essentially shows the main summary view of the user's tasks and calendar.
Also provides a react router outlet for the nested routes.
*/

import React, { useEffect, useState } from 'react';
import { Link, Outlet, useOutlet } from 'react-router-dom';

function Dashboard({ }) {

    const child = useOutlet(); // checks to see if we have a nested route, or if we are at the default route

    useEffect(() => { // when this component is rendered for the first time, do this

        console.log(child)

    }, [child])

    return (
        <>
            <div className='h-[90vh] mx-auto mt-10 flex flex-row w-full'>

                <div className='rounded-xl shadow-lg w-60 md:w-100 p-4 px-8 h-[50vh] flex items-start flex-col justify-start'>  {/* Navigation on the left */}
                    <div className='flex flex-col justify-center items-start'>
                        <h1 className='text-2xl font-semibold text-left'>Welcome, User</h1>
                        <div className='mt-4 flex flex-col space-y-3'>
                            <Link to="/my/" className='text-base md:text-xl text-left hover:underline text-blue-500'>Project Overview</Link>
                            <Link to="/my/tasks" className='text-base md:text-xl text-left hover:underline text-blue-500'>Today's Tasks</Link>
                            <Link to="/my/week" className='text-base md:text-xl text-left hover:underline text-blue-500'>Weekly Overview</Link>
                            <Link to="/my/calendar" className='text-base md:text-xl text-left hover:underline text-blue-500'>Calendar View</Link>
                            {/* <Link className='text-base md:text-xl text-left hover:underline text-blue-500'>wtf do i add here</Link> */}
                        </div>
                    </div>
                </div>

                {/* tasks, calendar etc here */}
                <div className='m-4'>
                    {child ? child : // If we are in a sub-route of /my such as /my/tasks, show the nested route, otherwise show the default dashboard
                        <div className=''>
                            <h1 className='text-4xl font-semibold'>Here are your projects: </h1>
                            <div className='flex flex-col justify-start items-start mt-4 w-full'> {/* Tasks go here */}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((task) => {
                                    return (
                                        <div className="rounded-xl shadow-md p-4 w-full">
                                            <p className='text-purple-600'>12:00 PM - 4:00 PM</p>
                                            <h1 className='text-2xl font-semibold'>{task}: Task name</h1>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Dashboard;