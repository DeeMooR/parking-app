import { places } from "./config";

// false если уже прошло
export const compareDates = (date) => {
  const currentDate = new Date();
  const itemDate = new Date(`${date.split('.').reverse().join('-')}T00:00:00.000Z`);
  return itemDate > currentDate;
}

export const countFreePlaces = () => {
  return places.reduce((acc, item) => item.userId ? acc : acc + 1, 0)
}

export const countBusyPlaces = () => {
  return places.reduce((acc, item) => !item.userId ? acc : acc + 1, 0)
}