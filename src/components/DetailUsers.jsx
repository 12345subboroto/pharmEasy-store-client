import React, { useState, useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link } from "react-router";
import { UserContext } from './UserProvider';
import { useReactToPrint } from "react-to-print";

const DetailUsers = () => {
  const { users, setUsers } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Customer-Due-List",
  });

  // FILTER
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // TOTAL
  const totalAmount = filteredUsers.reduce(
    (sum, user) => sum + Number(user.amount || 0),
    0
  );

  // DELETE
  const handleUserDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/users/${deleteId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          setUsers(users.filter(u => u._id !== deleteId));
          toast.success("User deleted successfully!");
        } else {
          toast.error("Delete failed!");
        }
      });

    setShowModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4 md:p-10 min-h-screen">

      {/* BUTTON */}
      <div className="flex gap-3 mb-5 print:hidden">
        <button onClick={handlePrint} className="btn btn-primary">
          Print
        </button>
      </div>

      {/* PRINT AREA */}
      <div
        ref={componentRef}
        className="bg-white text-black p-3 md:p-5 rounded-lg shadow"
      >

        <h1 className="text-2xl md:text-3xl mb-5">
          User Details
        </h1>

        {/* SEARCH */}
        <label className="input bg-cyan-200 w-full md:w-1/2 mb-4 print:hidden">
          <input
            type="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {/* SUMMARY */}
        <div className="flex flex-col md:flex-row justify-between gap-2 mb-5">

          <h4 className="text-lg md:text-xl">
            Total Due Customer
            <span className="bg-teal-400 text-teal-800 px-2 ml-2">
              {filteredUsers.length}
            </span>
          </h4>

          <h4 className="text-lg md:text-xl font-bold">
            Total Due Amount :
            <span className="ml-2 text-xl md:text-2xl">
              {totalAmount} ৳
            </span>
          </h4>

        </div>

        {/* HEADER (desktop only style) */}
        <div className="hidden md:grid grid-cols-5 font-bold text-xl border-b pb-2 mb-3">
          <h1>SL</h1>
          <h1>Name</h1>
          <h1>Amount</h1>
          <h1>Phone</h1>
          <h1 className="text-right">Action</h1>
        </div>

        {/* USERS LIST */}
        {filteredUsers.map((user, index) => (
          <div
            key={user._id}
            className="border-b py-3 md:grid md:grid-cols-5 flex flex-col md:flex-row gap-2 md:gap-0"
          >

            {/* SL */}
            <p className="font-semibold">
              {index + 1}
            </p>

            {/* NAME */}
            <p>{user.name}</p>

            {/* AMOUNT */}
            <p>{user.amount} Taka</p>

            {/* PHONE */}
            <p>{user.phone}</p>

            {/* ACTION */}
            <div className="flex gap-2 md:justify-end print:hidden">
              <Link
                to={`/update/${user._id}`}
                className="btn btn-primary btn-sm"
              >
                Update
              </Link>

              <button
                onClick={() => handleUserDelete(user._id)}
                className="btn btn-secondary btn-sm"
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg text-center w-80">
            <h2 className="text-xl mb-4 text-black">
              Are you sure you want to delete?
            </h2>

            <div className="flex justify-center gap-3">
              <button
                className="btn btn-error"
                onClick={confirmDelete}
              >
                Yes
              </button>

              <button
                className="btn btn-secondary"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DetailUsers;