import { useContext, useState } from 'react';
import { View, Text, Alert, Platform, StyleSheet } from 'react-native';
import { Input, InputPassword, Button, Link } from '../components';
import { AppContext } from '../providers/AppProvider';
import { checkUser, useOrientation } from '../utils';

export const LoginScreen = ({ navigation }) => {
  const { colors, isLandscape } = useOrientation();
  const isIOS = Platform.OS === 'ios';
  const styles = createStyles(colors, isLandscape, isIOS);
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

const createStyles = (colors, isLandscape, isIOS) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: isIOS && 'center',
    marginTop: !isIOS && '55%',
    width: '100%',
    paddingHorizontal: isLandscape ? 70 : 19
  },
  title: {
    width: '100%',
    fontWeight: 700,
    fontSize: 34,
    color: colors.brown,
    marginBottom: isLandscape ? 12 : 26
  },
  fields: {
    gap: isLandscape ? 12 : 20,
    width: '100%',
    marginBottom: isLandscape ? 7 : 10
  },
  forgotPassword: {
    width: '100%',
    textAlign: 'right',
    marginBottom: isLandscape ? 14 : 28
  },
  button: {
    width: '100%',
    marginBottom: isLandscape && 12
  },
  login: {
    position: !isLandscape && isIOS && 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    bottom: !isLandscape && isIOS && 80,
    marginTop: !isLandscape && !isIOS && 40,
  },
  login__text: {}
});
