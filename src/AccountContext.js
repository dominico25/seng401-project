import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context object
const AccountContext = createContext();

// Create a provider component
export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState('');

  // Load account from local storage on component mount
  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  // Update local storage whenever account changes
  useEffect(() => {
    localStorage.setItem('account', account);
  }, [account]);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccount = () => useContext(AccountContext); // Custom hook to access the account value

export { useAccount, AccountContext };
