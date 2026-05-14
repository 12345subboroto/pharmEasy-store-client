import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <div className="bg-green-300 text-black px-4 md:px-10 py-4 font-poppins ">

      <div className="flex flex-col md:flex-row items-center justify-between gap-3">

        {/* LOGO / TITLE */}
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Customer System
        </h1>

        {/* LINKS */}
        <div className="flex gap-6 md:gap-10 text-base md:text-lg font-medium">

          <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/detail"
            className="hover:text-white transition"
          >
            Details
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Navbar