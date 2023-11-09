import React, {useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./styles/tailwind.css";

import Dashboard from "./routes/Dashboard";
import Layout from "./components/Layout";
import ProgressionCreate from "./routes/progressions/ProgressionCreate";
import ProgressionDashboard from "./routes/progressions/ProgressionDashboard";
import Login from "./routes/auth/Login";
import {User, auth} from "./api/auth";
import AuthContext from "./contexts/AuthContext";
import Logout from "./routes/auth/Logout";

const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/progressions/create",
        element: <ProgressionCreate />
    },
    {
        path: "/progressions/:id",
        element: <ProgressionDashboard />
    }
]);

const App = () => {
    // for checking if the user is authenticated
    const [currentUser, setCurrentUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await auth.getCurrentUser();
                setCurrentUser(user);
            } catch {}
        }

        fetchData().then(() => setLoading(false));
    }, []);

    if (loading)
        return <></>
    return (
        <AuthContext.Provider value={{ user: currentUser }}>
            <Layout>
                <RouterProvider router={router} />
            </Layout>
        </AuthContext.Provider>
    );
}

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
