import React from "react";
import { Fragment, useState } from "react";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";

// import {ChevronLeftIcon} from '@heroicons/react/24/solid'
function Calendar() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  return (
    
    <div className="pt-4 md:pt-6">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto text-2xl font-semibold text-gray-900">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                {"<"}
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                {">"}
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-base leading-6 text-center text-zinc-900 font-bold  border-b-zinc-900 border-b-2 pb-1">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-2xl text-gray-900">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-gray-500 h-[40rem] overflow-y-scroll scrollbar-hide p-1">
              {[1, 2, 3,4,5,6].map((num) => (
                <CalendarTask num={num} />
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function CalendarTask({ num }) {
  return (
    <>
      <div className="rounded-xl shadow-md shadow-zinc-400 p-2 w-full">
        <p className="text-purple-600">12:00 PM - 4:00 PM</p>
        <h1 className="text-xl font-semibold">{num}: Task name</h1>
        <p className="text-gray-700 truncate-2-lines">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nunc sit amet ultricies ultricies, nunc nisl aliquam nisl, eget
          aliquam nisl nisl sit amet lorem. Sed euismod, nunc sit amet ultricies
          ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet
          lorem.
        </p>

        <div className="flex flex-row justify-end mt-2">
          <button className="bg-green-500 text-white font-semibold rounded-lg shadow-md px-4 py-1 m-3 hover:bg-lime-700">
            Complete
          </button>
          <button className="bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-1 m-3 hover:bg-blue-700">
            Edit
          </button>
          <button className="bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-1 m-3 hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Calendar;
