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
    appId: "1:72795354157:web:3b4982750ba7f3460274a4"
  };

const app = initializeApp(firebaseConfig);

const routes = (
  <>
    <Route path="/" element={<Home />} />

    {/* Add more routes here, make sure they are ASYNC */}
    <Route path="login" element={<Login />} />
    <Route path="tasks" element={<Tasks />} />
    
    
    <Route path="my" element={<Dashboard />}>
      {" "}
      {/* this is a nested route */}
      <Route path="tasks" element={<Tasks />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="week" element={<Week />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </>
);

function Fallback() {
  // a temporary page to display while the current page is loading

  return <div className="mx-auto my-auto text-center">Loading...</div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* handles redux */}
      <BrowserRouter>
        {" "}
        {/* handles routing */}
        
        <Layout>
          {" "}
          {/* handles the layout of the page */}
          <React.Suspense fallback={<Fallback />}>
            {" "}
            {/* if page not loaded yet, display temporary page thing */}
            <Routes>{routes}</Routes>
          </React.Suspense>
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
