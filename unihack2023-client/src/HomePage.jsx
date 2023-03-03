import React, { useState, useEffect } from 'react';

function HomePage({}) {
    return ( 
        <>
            <div className='h-[90vh] mx-auto'>

                <div className='bg-zinc-100 p-4 px-20 h-[50vh] flex items-center flex-col  justify-center'> 
                    <h1 className='text-4xl font-semibold text-center'>Planning projects has <span className='text-blue-500'>never been this easy</span>!</h1>
                    <h2 className='text-2xl font-semibold text-center'>(btw the name quick tasks is temporary)</h2>

                    <div className='flex flex-row justify-center mt-4'>
                        <button className='bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700'>Get Started</button>
                        <button className='bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-2 m-2 hover:bg-blue-700'>Learn More</button>
                    </div>

                </div>

                <div className='bg-zinc-200 p-4 px-20 h-[50vh] flex flex-col justify-center'>
                    <h1 className='text-4xl font-semibold text-left'>What is Quick Tasks?</h1>
                    <h2 className='text-xl text-left'>Quick tasks helps you break overwhelming projects down to achieve your goals!</h2>

                </div>
            </div>
        </> 
    );
}

export default HomePage;