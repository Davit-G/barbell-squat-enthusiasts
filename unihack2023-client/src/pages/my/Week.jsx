import React, { useState } from 'react'
import { startOfToday } from 'date-fns'
function Week() {
    const today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)

    const dayToText = (day) => {
        switch (day) {
          case 0:
            return "Sunday";
          case 1:
            return "Monday";
          case 2:
            return "Tuesday";
          case 3:
            return "Wednesday";
          case 4:
            return "Thursday";
          case 5:
            return "Friday";
          case 6:
            return "Saturday";
        }   
      }
  return (
    <div className='p-4 md:pl-20'>
    
            <h1 className='text-4xl font-semibold text-left'>Here is what your week looks like:</h1>
            <div>
                {selectedDay.getDay()}

            </div>
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
  )
}

export default Week
