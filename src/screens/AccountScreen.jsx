import { useState } from 'react';
import { View, StyleSheet } from 'react-native'; 
import { useTheme } from '@react-navigation/native';
import { Header, Button, Input, InputPassword, History, ModalDelete } from '../components';

export const AccountScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isOpenModal, setOpenModal] = useState(false);
  
  const onUpdate = () => {}
  
  const onDelete = () => {
    setOpenModal(false);
  }

  const onExit = () => {}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text='Личный кабинет' />
      </View>
      <View style={styles.fields}>
        <Input 
          label='Имя' 
          value='Дмитрий' 
          isSmall 
        />
        <Input 
          label='Почта' 
          value='dmitry@gmail.com' 
          isSmall 
        />
        <InputPassword 
          value='password' 
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
