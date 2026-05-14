import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const UpdateUser = () => {

  const user = useLoaderData();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const handleUserUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const amount = form.amount.value;
    const phone = form.phone.value;

    const updatedUser = { name, amount, phone };

    fetch(`http://localhost:5000/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => res.json())
      .then(data => {

        console.log(data);

        if (data.modifiedCount > 0) {

          setShowToast(true);

          setTimeout(() => {
            setShowToast(false);

            // ✅ back to list page
            navigate('/detail', { replace: true });

          }, 1200);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleUserUpdate}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg text-black"
      >

        <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">
          Update Customer
        </h2>

        <label className="block mb-2 font-medium">Customer Name</label>
        <input
          type="text"
          name="name"
         value={user?.name}
          className="input input-bordered w-full mb-4 bg-amber-100"
        />

        <label className="block mb-2 font-medium">Due Amount</label>
        <input
          type="number"
          name="amount"
          defaultValue={user?.amount}
          className="input input-bordered w-full mb-4 bg-amber-100"
        />

        <label className="block mb-2 font-medium">Phone Number</label>
        <input
          type="text"
          name="phone"
       value={user?.phone}
          className="input input-bordered w-full mb-6 bg-amber-100"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Customer
        </button>

      </form>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Updated Successfully</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default UpdateUser;