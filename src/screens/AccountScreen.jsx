import { useContext, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native'; 
import { useTheme } from '@react-navigation/native';
import { Header, Button, Input, InputPassword, History, ModalDelete } from '../components';
import { AppContext } from '../providers/AppProvider';
import { updateUser, deleteUser } from '../data/requests';

export const AccountScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isOpenModal, setOpenModal] = useState(false);
  const { user, history, setUser } = useContext(AppContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const showError = (error) => {
    Alert.alert(
      "Ошибка", 
      error, 
      [{ text: "OK", style: 'cancel' }],
    );
  }

  const onUpdate = () => {
    if (!name || !email || !password) {
      showError('Необходимо заполнить все поля');
      return;
    }
    const data = { id: user.id, name, email, password, history }
    updateUser(data, showError, setUser);
  }
  
  const onDelete = () => {
    setOpenModal(false);
    deleteUser(user.id, showError);
    navigation.navigate('Intro');
  }

  const onExit = () => {
    navigation.navigate('Intro');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text='Личный кабинет' />
      </View>
      <View style={styles.fields}>
        <Input 
          label='Имя' 
          value={name} 
          onChangeText={setName}
          isSmall 
        />
        <Input 
          label='Почта' 
          value={email} 
          onChangeText={setEmail}
          isSmall 
        />
        <InputPassword 
          value={password} 
          onChangeText={setPassword}
          isSmall 
        />
      </View>
      <View style={styles.buttons}>
        <Button 
          text='Изменить' 
          onPress={onUpdate}
          style={styles.btnChange}
          isSmall
        />
        <Button 
          text='Удалить'
          onPress={() => setOpenModal(true)}
          style={styles.btnDelete}
          isSmall
        />
      </View>
      <History />
      <Button 
        text='Выйти' 
        onPress={onExit}
        style={styles.btnExit}
      />
      <ModalDelete 
        isOpen={isOpenModal} 
        apply={onDelete} 
        close={() => setOpenModal(false)} 
      />
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 19,
    marginTop: 60,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 22
  },
  fields: {
    gap: 12,
    marginBottom: 16
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25
  },
  btnChange: {
    flex: 2
  },
  btnDelete: {
    flex: 1,
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  btnExit: {
    width: 120,
    height: 44,
    marginLeft: 'auto',
    backgroundColor: colors.blueGrey,
    borderColor: colors.blueGrey,
    marginBottom: 10
  }
});
