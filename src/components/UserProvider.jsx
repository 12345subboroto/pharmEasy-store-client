import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [users, setUsers] = useState([]);

  // load all users
  useEffect(() => {
    fetch('https://pharmeasy-store-server.onrender.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;