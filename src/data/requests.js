import axios from 'axios';
import { getOnlyDate, getOnlyTime, getTimes } from './helpers';

export const getUsers = async () => {
  try {
    const users = await axios.get('https://jsonblob.com/api/jsonBlob/1351839405354180608');
    return users.data;
  } catch (error) {
    console.error('Error: ', error);
    return [];
  }
};

export const createUser = async (newUser, showError, navigation) => {
  try {
    const users = await getUsers();
    const userExists = users.some(item => item.email === newUser.email);
    if (userExists) {
      showError('Пользователь с такой почтой уже существует');
      return;
    }

    const newId = users[users.length - 1].id + 1;
    newUser.id = newId;
    const allUsers = [...users, newUser];
    
    await axios.put('https://jsonblob.com/api/jsonBlob/1351839405354180608', allUsers);
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error: ', error);
    showError('Что-то пошло не так');
  }
};

export const checkUser = async (data, showError) => {
  try {
    const users = await getUsers();
    const user = users.find(item => item.email === data.email);
    if (!user || user.password !== data.password) {
      showError('Неправильно введена почта или пароль');
      return;
    }
    return user;
  } catch (error) {
    console.error('Error: ', error);
    showError('Что-то пошло не так');
  }
};

export const updateUser = async (data, showError, setUser) => {
  try {
    const users = await getUsers();
    const user = users.find(item => item.id === data.id);
    if (!user) {
      showError('Пользователь не найден');
      return;
    }

    const updatedUsers = users.map(item => {
      return (item.id === data.id) ? data : item;
    })
    await axios.put('https://jsonblob.com/api/jsonBlob/1351839405354180608', updatedUsers);

    const { history, ...userData } = data;
    setUser(userData);
  } catch (error) {
    console.error('Error: ', error);
    showError('Что-то пошло не так');
  }
};

export const deleteUser = async (userId) => {
  try {
    const users = await getUsers();
    const user = users.find(item => item.id === userId);
    if (!user) {
      showError('Пользователь не найден');
      return;
    }
    const allUsers = users.filter(item => item.id !== userId)
    await axios.put('https://jsonblob.com/api/jsonBlob/1351839405354180608', allUsers);
  } catch (error) {
    console.error('Error: ', error);
    showError('Что-то пошло не так');
  }
};

export const updateHistory = async (userId, date, timeStart, timeEnd, place, showError) => {
  try {
    const users = await getUsers();
    const user = users.find(item => item.id === userId);

    const newDate = getOnlyDate(date);
    const newTimeStart = getOnlyTime(timeStart);
    const newTimeEnd = getOnlyTime(timeEnd);
    const historyId = user.history[user.history.length - 1].id + 1;

    const newHistoryItem = {
      id: historyId,
      date: newDate,
      timeStart: newTimeStart,
      timeEnd: newTimeEnd,
      place
    };
    
    const updatedUsers = users.map(item => {
      if (item.id === userId) item.history.push(newHistoryItem);
      return item;
    })
    
    await axios.put('https://jsonblob.com/api/jsonBlob/1351839405354180608', updatedUsers);
    return user.history;
  } catch (error) {
    console.error('Error: ', error);
    showError('Что-то пошло не так');
  }
};

export const getDates = async () => {
  try {
    const dates = await axios.get('https://jsonblob.com/api/jsonBlob/1352186647189577728');
    return dates.data;
  } catch (error) {
    console.error('Error: ', error);
    return [];
  }
};

export const updateDates = async (date, timeStart, timeEnd, place, showError, fetchDates, setSelectedPlace) => {
  try {
    const dates = await getDates();
    const newDate = getOnlyDate(date);
    const times = getTimes(timeStart, timeEnd);

    if (!newDate || !times.length) {
      const message = !newDate ? 'Ошибка в формате даты' : 'Неправильный диапазон дат';
      showError(message);
      return;
    }

    const newDates = { ...dates };
    if (!newDates[newDate]) {
      newDates[newDate] = {};
    }

    for (const time of times) {
      if (newDates[newDate][time]) {
        if (newDates[newDate][time].includes(place)) {
          showError('Данное место уже занято');
          fetchDates();
          return;
        }
        newDates[newDate][time].push(place);
      } else {
        newDates[newDate][time] = [place];
      }
    }

    await axios.put('https://jsonblob.com/api/jsonBlob/1352186647189577728', newDates);
    await fetchDates();
    setSelectedPlace(null);
    return true;
  } catch (error) {
    console.error('Error: ', error);
    showError('Что-то пошло не так');
  }
};