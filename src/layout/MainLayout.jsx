import React from 'react'
import { Outlet, Navigate } from 'react-router'
import Navbar from '../components/Navbar'

function MainLayout() {
  const isLoggedIn = localStorage.getItem("auth")

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className="min-h-screen font-poppins bg-gray-200">
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout