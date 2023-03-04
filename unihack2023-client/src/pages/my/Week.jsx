import React, { useState } from "react";
import {
  startOfToday,
  startOfYesterday,
  startOfWeek,
  format,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import AnimatedVerticalPage from "../AnimatedVerticalPage";

function Week() {
  let today = startOfToday();

  const [activeDay, setActiveDay] = useState(today.getDay());
  const [selectedDay, setSelectedDay] = useState(format(today, "dd/MM/yyyy"));
  console.log(activeDay);
  const getDayofWeek = () => {};

  let weekDays = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return (
    <AnimatedVerticalPage>
      <div className="flex justify-center">
        <div className="m-4 text-zinc-900 dark:text-white w-full md:w-10/12 ">
          <h1 className="text-4xl font-semibold text-center py-4">
            Here is what your week looks like:
          </h1>
          <div className="flex space-x-3 justify-center flex-wrap">
            {weekDays.map((day, index) => {
              return (
                <div key={`day-${index}`} className="group">
                  <button
                    onClick={() => {
                      setSelectedDay(format(day, "dd/MM/yyyy"));
                    }}
                    className={`${
                      today.getDay() > day.getDay()
                        ? "text-zinc-200 dark:text-zinc-600"
                        : " transition-all duration-100 hover:text-zinc-600 dark:hover:text-zinc-400"
                    } font-semibold `}
                    disabled={today.getDay() > day.getDay()}
                  >
                    {days[day.getDay()]}
                  </button>
                  <div
                    className={` ${
                      today.getDay() > day.getDay()
                        ? "hidden"
                        : "grid grid-cols-2"
                    }  `}
                  >
                    <div className="border-b-2 border-b-zinc-600 dark:border-b-white origin-left scale-0 group-hover:scale-100 transition-all duration-300"></div>
                    <div className="border-b-2 border-b-zinc-600 dark:border-b-white origin-right scale-0 group-hover:scale-100 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-2 pt-4  mx-auto w-11/12">
              <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent to-zinc-900 dark:to-zinc-600"></div>
              <div className="w-full h-[0.5px] bg-gradient-to-r from-zinc-900 dark:from-zinc-600 to-transparent"></div>
            </div>
          </div>
          <div className="pt-4 px-4 pb-2 text-xl font-bold">
            Tasks for {selectedDay}
          </div>

          <div className="p-4 flex flex-col justify-start items-start mt-4 w-full h-[45rem]  space-y-3 overflow-y-scroll scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((task, index) => {
              return (
                <div key={`week-task-${index}`} className="rounded-xl shadow-md shadow-zinc-500 dark:shadow-none dark:bg-zinc-700 transition-all duration-150 hover:scale-[1.02] dark:bg-opacity-60 p-4 w-full cursor-pointer">
                  <p className="text-purple-600">12:00 PM - 4:00 PM</p>
                  <h1 className="text-2xl font-semibold">{task}: Task name</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedVerticalPage>
  );
}

export default Week;
