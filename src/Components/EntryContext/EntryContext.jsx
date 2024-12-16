import React, { useState, createContext, useContext, useEffect } from 'react';

const EntryContext = createContext();

export const useEntries = () => useContext(EntryContext);

export const EntryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage when the app starts
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
  }, []);

  // Save entries to localStorage whenever it changes
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('entries', JSON.stringify(entries));
    }
  }, [entries]);

  const addEntry = (entryData) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, entryData];
      return updatedEntries;
    });
  };

  const updateEntry = (updatedData, index) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = updatedData;
      return updatedEntries;
    });
  };

  const deleteEntry = (index) => {
    setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  return (
    <EntryContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry }}>
      {children}
    </EntryContext.Provider>
  );
};
