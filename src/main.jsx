import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"

import MainLayout from './layout/MainLayout.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import App from './App.jsx'
import Details from './components/Details.jsx'
import UpdateUser from './components/UpdateUser.jsx'
import UserProvider from './components/UserProvider.jsx'




const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App/>
      },
      {
        path:'detail',
        element:<Details/>
      },
      {
        path: '/update/:id',
        loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`),
        Component: UpdateUser
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
<React.StrictMode>
  
  <UserProvider><RouterProvider router={router} /></UserProvider>
</React.StrictMode>
)