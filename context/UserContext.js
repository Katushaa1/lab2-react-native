import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log('User:', username);
    console.log('History:', history);
  }, [username, history]);

  return (
    <UserContext.Provider value={{ username, setUsername, history, setHistory }}>
      {children}
    </UserContext.Provider>
  );
};
