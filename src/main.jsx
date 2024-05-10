import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from "./Home.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CraftingPage from "./assets/calculator/Crafting.jsx";


const router = createBrowserRouter([
    {
        path: "/NG-Calculator/",
        element: <Home/>,
    },
    {
        path: "/NG-Calculator/crafting",
        element: <CraftingPage/>,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)