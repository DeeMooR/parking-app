import axios from 'axios';

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