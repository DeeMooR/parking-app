import { createContext, useState } from 'react';
import { setHours } from '../data/helpers';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [date, setDate] = useState(setHours(0));
  const [timeStart, setTimeStart] = useState(() => setHours(9));
  const [timeEnd, setTimeEnd] = useState(() => setHours(18));
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{
      date,
      setDate,
      timeStart,
      setTimeStart,
      timeEnd,
      setTimeEnd,
      selectedPlace,
      setSelectedPlace,
      user,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};