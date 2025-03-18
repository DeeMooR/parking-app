import { dates } from "./data";

// false если уже прошло
export const compareDates = (date) => {
  const currentDate = new Date();
  const itemDate = new Date(`${date.split('.').reverse().join('-')}T00:00:00.000Z`);
  return itemDate > currentDate;
}

export const getMaxDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  new Date().getDate()
);

const newDate = () => {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 3);
  return currentTime;
}

export const setHours = (number) => {
  const date = newDate();
  date.setHours(number, 0, 0, 0);
  return date;
}

// export const addUTC = (date) => {
//   date.setHours(date.getHours() + 3, 0, 0, 0);
//   return date;
// }

export const checkIsMidnight = (date) => {
  return date.getHours() === 0 && date.getMinutes() === 0;
}

export const getOnlyDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const getOnlyTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const generateTimeIntervals = (timeStart, timeEnd) => {
  const [startHours, startMinutes] = timeStart.split(':').map(Number);
  const [endHours, endMinutes] = timeEnd.split(':').map(Number);
  
  const intervals = [];
  let currentHours = startHours;
  let currentMinutes = startMinutes;

  while (currentHours < endHours || (currentHours === endHours && currentMinutes < endMinutes)) {
    intervals.push(
      `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`
    );
    currentMinutes += 30;
    
    if (currentMinutes === 60) {
      currentHours += 1;
      currentMinutes = 0;
    }
  }

  return intervals;
};

export const getBusyPlaces = (date, timeStart, timeEnd) => {
  const newDate = getOnlyDate(date);
  const newTimeStart = getOnlyTime(timeStart);
  const newTimeEnd = getOnlyTime(timeEnd);
  let times = generateTimeIntervals(newTimeStart, newTimeEnd);
  
  if (checkIsMidnight(timeStart) && checkIsMidnight(timeEnd)) {
    times = generateTimeIntervals('00:00', '24:00');
  }
  if (!checkIsMidnight(timeStart) && checkIsMidnight(timeEnd)) {
    times = generateTimeIntervals(timeStart, '24:00');
  }
  
  let busyPlaces = new Set();
  const obj = dates[newDate];
  if (!obj) return busyPlaces;

  times.forEach(time => {
    const places = obj[time];
    if (places) busyPlaces = new Set([...busyPlaces, ...places]);
  })
  return busyPlaces;
}