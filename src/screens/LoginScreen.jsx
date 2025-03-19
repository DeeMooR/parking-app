import { useContext, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Input, InputPassword, Button, Link } from '../components';
import { checkUser } from '../data/requests';
import { AppContext } from '../providers/AppProvider';

export const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { setUser, setHistory } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showError = (error) => {
    Alert.alert(
      "Ошибка авторизации", 
      error, 
      [{ text: "OK", style: 'cancel' }],
    );
  }

  const onLogin = async () => {
    if (!email || !password) {
      showError('Необходимо заполнить все поля');
      return;
    }
    const data = { email, password }
    const user = await checkUser(data, showError);
    if (user) {
      const { history, ...userData } = user;
      setUser(userData);
      setHistory(history);
      navigation.navigate('MainTabs');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <View style={styles.fields}>
        <Input 
          label='Почта' 
          placeholder='Ваша почта' 
          value={email}
          onChangeText={setEmail}
        />
        <InputPassword
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.forgotPassword}>Забыли пароль?</Text>
      <View style={styles.button}>
        <Button 
          text='Войти' 
          onPress={onLogin}
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
