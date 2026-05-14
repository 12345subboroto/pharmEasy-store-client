import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserProvider';

const Home = () => {
  const { users, setUsers } = useContext(UserContext);

  const [showToast, setShowToast] = useState(false);

  // LOAD USERS
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [setUsers]);

  // ADD USER
  const handleAddUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const amount = e.target.amount.value;
    const phone = e.target.phone.value;

    const createdAt = new Date().toISOString();

    const newUser = { name, amount, phone, createdAt };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {

        if (data.insertedId) {

          const createdUser = {
            ...newUser,
            _id: data.insertedId
          };

          setUsers(prev => [...prev, createdUser]);

          setShowToast(true);
          e.target.reset();

          setTimeout(() => setShowToast(false), 3000);
        }
      });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:p-10'>

      {/* FORM */}
      <div>

        <form
          onSubmit={handleAddUser}
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg text-black"
        >

          <legend className="text-2xl md:text-3xl text-center pb-6">
            Customer Due
          </legend>

          <label className="label">Customer Name</label>
          <input name="name" className="input bg-amber-100 w-full" required />

          <label className="label">Due Amount</label>
          <input name="amount" className="input bg-amber-100 w-full" required />

          <label className="label">Phone Number</label>
          <input name="phone" className="input bg-amber-100 w-full" />

          <button className="btn btn-error mt-4 w-full">
            Save
          </button>

        </form>

        {/* TOAST */}
        {showToast && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>Data saved successfully.</span>
            </div>
          </div>
        )}

      </div>

      {/* USERS LIST */}
      <div className="overflow-x-auto">

        {/* HEADER */}
        <div className="grid grid-cols-4 font-bold text-lg md:text-xl text-black border-b pb-3 mb-3">
          <h1>Name</h1>
          <h1>Amount</h1>
          <h1>Phone</h1>
          <h1>Date</h1>
        </div>

        {/* DATA */}
        {users.map(user => {

          const dateObj = user.createdAt
            ? new Date(user.createdAt)
            : null;

          return (
            <div
              key={user._id}
              className="grid grid-cols-4 text-black border-b py-2"
            >
              <p>{user.name}</p>
              <p>{user.amount}</p>
              <p>{user.phone}</p>

              <p className="text-sm text-gray-600">
                {dateObj ? dateObj.toLocaleString() : "No date"}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Home;