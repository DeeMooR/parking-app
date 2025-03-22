import { createContext, useState } from 'react';
import { setHours, emptyUser } from '../utils';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [date, setDate] = useState(setHours(0));
  const [timeStart, setTimeStart] = useState(() => setHours(9));
  const [timeEnd, setTimeEnd] = useState(() => setHours(18));
  const [timeError, setTimeError] = useState(null);

  const [busyPlaces, setBusyPlaces] = useState(new Set());
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalText, setModalText] = useState(null);

  const [user, setUser] = useState(emptyUser);
  const [history, setHistory] = useState([]);
  const [dates, setDates] = useState(null);

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
      modalText,
      setModalText,
      user,
      setUser,
      history,
      setHistory,
      dates,
      setDates
    }}>
      {children}
    </AppContext.Provider>
  );
};