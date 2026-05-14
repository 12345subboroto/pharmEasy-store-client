import React from 'react'
import Home from './components/Home'

const usersPromise = fetch('https://pharmeasy-store-server.onrender.com/users').then(res =>res.json());

function App() {
  return (
    <div className='min-h-screen bg-gray-100 font-poppins'>
      
      <Home usersPromise={usersPromise}></Home>
    </div>
  )
}

export default App
