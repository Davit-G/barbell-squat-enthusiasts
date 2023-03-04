import React, { useState, useEffect } from 'react';

function TaskBlock({ num }) {

    return (
        <>
            <div className="rounded-xl shadow-md p-4 w-full">
                <p className='text-purple-600'>12:00 PM - 4:00 PM</p>
                <h1 className='text-2xl font-semibold'>{num}: Task name</h1>
                <p className='text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet lorem.</p>

                <div className='flex flex-row justify-end mt-4'>
                    <button className='bg-green-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-lime-700'>Complete</button>
                    <button className='bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700'>Edit</button>
                    <button className='bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-red-700'>Delete</button>
                </div>
            </div>
        </>
    )
}

function Tasks({ }) { // tasks view, shows up here temporarily
    return (
        <>
            <div className='w-full py-4 pl-20 h-[50vh] flex flex-col justify-start items-start pt-8'>
                <h1 className='text-4xl font-semibold text-left'>Today's tasks:</h1>
                <div className='flex flex-col justify-start items-start mt-4 w-full'> {/* Tasks go here */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((task) => {
                        return (
                            <TaskBlock key={task} num={task} />
                        )
                    })}
                </div>
            </div>

        </>
    );
}

export default Tasks;