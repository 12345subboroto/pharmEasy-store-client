import React, { useState } from 'react'
import { useNavigate } from 'react-router'

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
    <div>
  <div className='pl-150 pt-28'>
    <form onSubmit={handleLogin}>
        
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>
      <label className="label">User Name</label>
        <input
          type="text"
          placeholder="Username"
          className="input" 
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="input" 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button type="submit" className="btn btn-neutral mt-4">Login</button>
      
</fieldset>
    </form>
  </div>
</div>
  )
}

export default Login