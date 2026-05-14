import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (user === "admin" && pass === "1234") {
      localStorage.setItem("auth", "true")
      navigate("/")
    } else {
      alert("Wrong username or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm">

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">

          <legend className="fieldset-legend text-center">Login</legend>

          <label className="label">User Name</label>
          <input
            type="text"
            placeholder="Username"
            className="input w-full"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label className="label mt-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input w-full"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Login
          </button>

        </fieldset>

      </form>
    </div>
  )
}

export default Login