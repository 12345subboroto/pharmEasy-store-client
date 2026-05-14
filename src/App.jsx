import React from 'react'
import Home from './components/Home'

const usersPromise = fetch('http://localhost:5000/users').then(res =>res.json());

function App() {
  return (
    <div className='min-h-screen bg-gray-100 font-poppins'>
      
      <Home usersPromise={usersPromise}></Home>
    </div>
  )
}

export default App
