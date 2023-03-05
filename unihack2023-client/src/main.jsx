import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import "../styles/main.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"; // configuring the browser routing things
import Layout from "./Layout";
import Calendar from "./pages/my/Calendar";
import Week from "./pages/my/Week";
import Error from "./pages/ErrorPage";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";

import AppLayout from "./AppLayout";

// TODO: turn these into async imports
import NewProjectPage from "./pages/my/NewProject";
import NewTaskPage from "./pages/my/NewTask";
import Project from "./pages/my/Project";
import Task from "./pages/my/Task";
import { AnimatePresence } from "framer-motion";

// each route is loaded asynchronously
const Home = React.lazy(() => import("./pages/HomePage.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Tasks = React.lazy(() => import("./pages/my/Tasks.jsx"));
const Dashboard = React.lazy(() => import("./pages/my/Dashboard.jsx"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage.jsx"));

const firebaseConfig = {
  apiKey: "AIzaSyDh3icl4HE5zlXzkd5c2awSv6mSN26EveM",
  authDomain: "unihack2023-9ba75.firebaseapp.com",
  projectId: "unihack2023-9ba75",
  storageBucket: "unihack2023-9ba75.appspot.com",
  messagingSenderId: "72795354157",
  appId: "1:72795354157:web:3b4982750ba7f3460274a4",
};

const app = initializeApp(firebaseConfig);
const routes = (
  <>
    <Route element={<Layout />}>
      {" "}
      {/* this is the default layout for all pages */}
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>

    {/* Add more routes here, make sure they are ASYNC */}

    <Route path="/my" element={<AppLayout></AppLayout>}>
      {" "}
      {/* this is a nested route */}
      <Route path="/my" element={<Dashboard />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="week" element={<Week />} />
      <Route path="/my/project" element={<Project></Project>} />
      <Route path="/my/task" element={<Task></Task>} />
      <Route
        path="/my/project/new"
        element={<NewProjectPage></NewProjectPage>}
      />
      <Route path="/my/task/new" element={<NewTaskPage></NewTaskPage>} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </>
);

function Fallback() {
  // a temporary page to display while the current page is loading

  return <div className="mx-auto my-auto text-center">Loading...</div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      {" "}
      {/* handles redux */}
      <BrowserRouter>
          {" "}
          {/* handles routing */}
          <React.Suspense fallback={<Fallback />}>
        <AnimatePresence mode = 'wait' >
            {" "}
            {/* if page not loaded yet, display temporary page thing */}
            <Routes>{routes}</Routes>
        </AnimatePresence>
          </React.Suspense>
      </BrowserRouter>
    </Provider>
  
);
