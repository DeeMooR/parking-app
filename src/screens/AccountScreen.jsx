import { useContext, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native'; 
import { Header, Button, Input, InputPassword, History, ModalDelete } from '../components';
import { AppContext } from '../providers/AppProvider';
import { updateUser, deleteUser, useOrientation } from '../utils';

export const AccountScreen = ({ navigation }) => {
  const { colors, isLandscape } = useOrientation();
  const styles = createStyles(colors, isLandscape);
  const [isOpenModal, setOpenModal] = useState(false);
  const { user, history, setUser, setModalText } = useContext(AppContext);

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

  const onUpdate = async () => {
    if (!name || !email || !password) {
      showError('Необходимо заполнить все поля');
      return;
    }
    const data = { id: user.id, name, email, password, history }
    const newUser = await updateUser(data, showError, setUser);
    if (newUser) {
      setUser(newUser);
      setModalText('Данные пользователя успешно измены');
    }
  }
  
  const onDelete = async () => {
    setOpenModal(false);
    const isDeleted = await deleteUser(user.id, showError);
    if (isDeleted) {
      setModalText('Пользователь успешно удален');
      navigation.navigate('Intro');
    }
  }

  const onExit = () => {
    navigation.navigate('Intro');
  }

  return (
    <View style={styles.container}>
      {!isLandscape && 
        <View style={styles.header}>
          <Header text='Личный кабинет' />
        </View>
      }
      <View style={styles.left}>
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
      </View>
      <View style={styles.right}>
        <History />
        <Button 
          text='Выйти' 
          onPress={onExit}
          style={styles.btnExit}
        />
      </View>
      <ModalDelete 
        isOpen={isOpenModal} 
        apply={onDelete} 
        close={() => setOpenModal(false)} 
      />
    </View>
  );
}

const createStyles = (colors, isLandscape) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: isLandscape ? 50 : 19,
    marginTop: isLandscape ? 26 : 60,
    paddingBottom: isLandscape ? 25 : 60,
    flexDirection: isLandscape && 'row',
    justifyContent: isLandscape && 'space-between'
  },
  header: {
    marginBottom: 22
  },
  left: {
    width: isLandscape ? '48%' : '100%'
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
  right: {
    flex: 1,
    maxWidth: isLandscape ? '48%' : '100%',
    marginTop: isLandscape && 15,
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
