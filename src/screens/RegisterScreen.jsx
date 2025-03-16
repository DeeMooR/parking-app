import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Input, InputPassword, Button, Link, RadioButton } from '../components';

export const RegisterScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новый аккаунт</Text>
      <View style={styles.fields}>
        <Input label='Имя' placeholder='Ваше имя' />
        <Input label='Почта' placeholder='Ваша почта' />
        <InputPassword />
      </View>
      <View style={styles.conditions}>
        <RadioButton label='Я принимаю условия и политику конфиденциальности' />
      </View>
      <View style={styles.button}>
        <Button 
          text='Зарегистрироваться' 
          navigate='Login' 
          navigation={navigation} 
        />
      </View>
      <View style={styles.login}>
        <Text style={styles.login__text}>Уже есть аккаунт?</Text>
        <Link 
          text='Вход' 
          navigate='Login' 
          navigation={navigation} 
        />
      </View>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 19
  },
  title: {
    width: '100%',
    fontWeight: 700,
    fontSize: 34,
    color: colors.brown,
    marginBottom: 26
  },
  fields: {
    gap: 20,
    width: '100%',
    marginBottom: 36
  },
  conditions: {
    width: '100%',
    marginBottom: 14
  },
  button: {
    width: '100%'
  },
  login: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    bottom: 80
  },
  login__text: {}
});
