import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:windi.css'

import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";  // configuring the browser routing things
import Layout from './Layout';


// each route is loaded asynchronously
const Home = React.lazy(() => import('./HomePage.jsx'))
const Login = React.lazy(() => import('./Login.jsx'))


const routes = (
    <>
        <Route path="/" element={<Home />} />

        {/* Add more routes here, make sure they are ASYNC */}
        <Route path="/login" element={<Login />} />
    </>
)

function Fallback() { // a temporary page to display while the current page is loading

    return <div className='mx-auto my-auto text-center'>Loading...</div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <BrowserRouter> {/* handles routing */}
            <Layout> {/* handles the layout of the page */}

                <React.Suspense fallback={<Fallback />}> {/* if page not loaded yet, display temporary page thing */}

                    <Routes>
                        {routes}
                    </Routes>

                </React.Suspense>
            </Layout>
        </BrowserRouter>

    </React.StrictMode>,
)
