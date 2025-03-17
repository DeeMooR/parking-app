// false если уже прошло
export const compareDates = (date) => {
  const currentDate = new Date();
  const itemDate = new Date(`${date.split('.').reverse().join('-')}T00:00:00.000Z`);
  return itemDate > currentDate;
}