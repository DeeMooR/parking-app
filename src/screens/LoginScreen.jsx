import { View, Text, StyleSheet } from 'react-native';
import { Input, InputPassword, Button, Link, RadioButton } from '../components';

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <View style={styles.fields}>
        <Input label='Почта' placeholder='Ваша почта' />
        <InputPassword />
      </View>
      <Text style={styles.forgotPassword}>Забыли пароль?</Text>
      <View style={styles.button}>
        <Button 
          text='Войти' 
          navigate='MainTabs' 
          navigation={navigation} 
        />
      </View>
      <View style={styles.login}>
        <Text style={styles.login__text}>У вас нет аккаунта?</Text>
        <Link
          text='Регистрация' 
          navigate='Register' 
          navigation={navigation} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 19
  },
  title: {
    width: '100%',
    fontWeight: 700,
    fontSize: 34,
    color: '#4d3e3e',
    marginBottom: 26
  },
  fields: {
    gap: 20,
    width: '100%',
    marginBottom: 10
  },
  forgotPassword: {
    width: '100%',
    textAlign: 'right',
    marginBottom: 28
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
