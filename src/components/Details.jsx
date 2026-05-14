import React from 'react'
import DetailUsers from './DetailUsers'

const usersPromise = fetch('http://localhost:5000/users')
  .then(res => res.json());

function Details() {

  return (
    <div className='min-h-screen  bg-gray-100  text-black'>
      <DetailUsers usersPromise={usersPromise} />
    </div>
  )
}

export default Details