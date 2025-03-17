import { View, Text, StyleSheet } from 'react-native'; 
import { useTheme } from '@react-navigation/native';
import { Header, Button, Input, InputPassword } from '../components';

export const AccountScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text='Личный кабинет' />
      </View>
      <View style={styles.fields}>
        <Input label='Имя' value='Дмитрий' />
        <Input label='Почта' value='dmitry@gmail.com' />
        <InputPassword value='password' />
      </View>
      <View style={styles.buttons}>
        <Button 
          text='Изменить' 
          navigate='Parking' 
          navigation={navigation}  
          style={styles.btnChange}
        />
        <Button 
          text='Удалить' 
          navigate='Parking' 
          navigation={navigation} 
          style={styles.btnDelete}
          isGrey
        />
      </View>
      <View>
        <Text style={styles.map__title}>Мы на карте</Text>
        <Text style={styles.map__text}>Минск, ул. Петра Мстиславца, 11</Text>
      </View>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 19,
    marginTop: 60
  },
  header: {
    marginBottom: 35
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
    backgroundColor: colors.delete,
    borderColor: colors.delete,
  },
});
