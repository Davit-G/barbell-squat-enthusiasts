import React from "react";
import { Fragment, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { motion, AnimatePresence } from "framer-motion";
import AnimatedVerticalPage from "../AnimatedVerticalPage";

import { getAllProjects } from "../../features/projects/projectsSlice";
import { selectLogin, selectUid } from "../../features/login/loginSlice";
import { selectBackend } from "../../features/backend/backendSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { setProjects } from "../../features/projects/projectsSlice";
import { useDispatch } from "react-redux";
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

function Calendar() {
  const [userProjects, setUserProjects] = useState([]);
  const loggedIn = useSelector(selectLogin);
  const loggedInUID = useSelector(selectUid);
  const backendURL = useSelector(selectBackend);
  const [visibleTasks, setVisibleTasks] = useState([]);
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

  function deleteTask(taskID) {
    axios.delete(`${backendURL}/api/task/${taskID}`).then((res) => {
      setUserProjects();
    });
  }

  useEffect(() => {
    if (!loggedIn) return;

    // we are logged in, so get the user's projects
    axios.get(`${backendURL}/api/user/${loggedInUID}/projects`).then((res) => {
      setUserProjects(res.data.projects);
    });
    setSelectedDay(today);
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
    setVisibleTasks([]);
    userProjects.forEach((project) => {
      axios
        .get(`${backendURL}/api/project/${project.proj_id}/tasks`)
        .then((res) => {
          const tasks = res.data.tasks;
          tasks.map((task) => {
            const taskDate = task.date;
            const [day, month, year] = taskDate.split("-");
            console.log(year, month, day);
            const taskDateObj = new Date(year, month - 1, day);

            if (
              taskDateObj.getMonth() === selectedDay.getMonth() &&
              taskDateObj.getDate() === selectedDay.getDate() &&
              taskDateObj.getFullYear() == selectedDay.getFullYear()
            ) {
              setVisibleTasks((prev) => [...prev, task]);
              // console.log(true)
            }
          });
        });
    });
  }, [userProjects, selectedDay]);

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
    <AnimatedVerticalPage>
      <div className="m-4">
        <h1 className="text-4xl text-center font-semibold dark:text-zinc-200 py-4">
          Calendar
        </h1>

        <div className="grid grid-cols-2 pt-4  mx-auto w-11/12">
          <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent to-zinc-900 dark:to-zinc-600"></div>
          <div className="w-full h-[0.5px] bg-gradient-to-r from-zinc-900 dark:from-zinc-600 to-transparent"></div>
        </div>
        <div className="pt-4 md:pt-6 text-zinc-900 dark:text-zinc-200">
          <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 md:dark:divide-zinc-400">
              <div className="md:pr-14">
                <div className="flex items-center">
                  <h2 className="flex-auto text-2xl font-semibold">
                    {format(firstDayCurrentMonth, "MMMM yyyy")}
                  </h2>
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 hover:text-gray-500"
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5  hover:text-gray-500"
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 mt-10 text-base leading-6 text-center  font-bold  border-b-zinc-900 dark:border-b-zinc-400 border-b-2 pb-1">
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
                            "text-gray-900 dark:text-zinc-200",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentMonth) &&
                            "text-gray-400",
                          isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "bg-red-500",
                          isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            "bg-gray-900 dark:bg-zinc-200 dark:text-zinc-900",
                          !isEqual(day, selectedDay) &&
                            "hover:bg-gray-200 dark:hover:bg-zinc-600",
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
              <section className="mt-12 md:mt-0 md:pl-4">
                <h2 className="font-semibold text-2xl pl-4">
                  Schedule for{" "}
                  <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                    {format(selectedDay, "MMM dd, yyy")}
                  </time>
                </h2>
                <ol className="mt-4 space-y-4 text-sm leading-6  h-[40rem] overflow-y-scroll scrollbar-hide p-4">
                  {visibleTasks.map((task) => {
                    return (
                      <CalendarTask
                        task={task}
                        deleteTaskCallback={deleteTask}
                      />
                    );
                  })}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AnimatedVerticalPage>
  );
}

function CalendarTask({ task, deleteTaskCallback }) {
  return (
    <div className="rounded-xl shadow-md dark:shadow-none dark:bg-zinc-700 dark:bg-opacity-60 shadow-zinc-400 p-2 w-full hover:scale-[1.05] cursor-pointer transition-all duration-150 ">
      <h1 className="text-xl font-semibold">{task.name}</h1>
      <p className="text-gray-700 dark:text-zinc-400 truncate-2-lines">
        {task.description}
      </p>

      <div className="flex flex-row justify-end mt-2 text-white">
        <button
          onClick={deleteTaskCallback(task.task_id)}
          className="bg-green-500  font-semibold rounded-lg shadow-md px-4 py-1 m-3 hover:bg-lime-600"
        >
          Complete
        </button>

        <button
          onClick={deleteTaskCallback(task.task_id)}
          className="bg-red-500  font-semibold rounded-lg shadow-md px-4 py-1 m-3 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Calendar;
