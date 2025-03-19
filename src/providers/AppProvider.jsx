import { createContext, useState } from 'react';
import { setHours } from '../data/helpers';
import { emptyUser } from '../data/data';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [date, setDate] = useState(setHours(0));
  const [timeStart, setTimeStart] = useState(() => setHours(9));
  const [timeEnd, setTimeEnd] = useState(() => setHours(18));
  const [timeError, setTimeError] = useState(null);

  const [busyPlaces, setBusyPlaces] = useState(new Set());
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [user, setUser] = useState(emptyUser);
  const [history, setHistory] = useState([]);

  return (
    <AppContext.Provider value={{
      date,
      setDate,
      timeStart,
      setTimeStart,
      timeEnd,
      setTimeEnd,
      timeError,
      setTimeError,
      busyPlaces,
      setBusyPlaces,
      selectedPlace,
      setSelectedPlace,
      user,
      setUser,
      history,
      setHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};