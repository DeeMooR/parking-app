// false если уже прошло
export const compareDates = (date) => {
  const currentDate = new Date();
  const itemDate = new Date(`${date.split('.').reverse().join('-')}T00:00:00.000Z`);
  return itemDate > currentDate;
}

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

export const getTimes = (timeStart, timeEnd) => {
  const newTimeStart = getOnlyTime(timeStart);
  const newTimeEnd = getOnlyTime(timeEnd);
  let times = generateTimeIntervals(newTimeStart, newTimeEnd);
  
  if (checkIsMidnight(timeEnd)) {
    times = generateTimeIntervals(newTimeStart, '24:00');
  }
  return times;
}

export const getBusyPlaces = (dates, date, timeStart, timeEnd) => {
  const newDate = getOnlyDate(date);
  const times = getTimes(timeStart, timeEnd);
  
  let busyPlaces = new Set();
  const obj = dates[newDate];
  if (!obj) return busyPlaces;

  times.forEach(time => {
    const places = obj[time];
    if (places) busyPlaces = new Set([...busyPlaces, ...places]);
  })
  return busyPlaces;
}

export const compareTimes = (timeStart, timeEnd) => {
  const [startHours, startMinutes] = getOnlyTime(timeStart).split(':').map(Number);
  const [eHours, endMinutes] = getOnlyTime(timeEnd).split(':').map(Number);
  let endHours = (eHours === 0 && startMinutes === 0) ? 24 : eHours;

  if (startHours > endHours) return false;
  if (startHours === endHours && startMinutes >= endMinutes) return false;
  return true;
}

// от isActive зависит по возрастанию или убыванию
export const sortHistory = (history, isActive) => {
  return history.sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));

    if (dateB - dateA !== 0) return isActive ? dateA - dateB : dateB - dateA;
    return a.timeStart.localeCompare(b.timeStart);
  });
}