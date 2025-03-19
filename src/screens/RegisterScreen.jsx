import { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Input, InputPassword, Button, Link, RadioButton } from '../components';
import { createUser } from '../data/requests';

export const RegisterScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const showError = (error) => {
    Alert.alert(
      "Ошибка регистрации", 
      error, 
      [{ text: "OK", style: 'cancel' }],
    );
  }

  const onRegister = () => {
    if (!name || !email || !password) {
      showError('Необходимо заполнить все поля');
      return;
    }
    if(!acceptTerms) {
      showError('Необходимо принять условия и политику конфиденциальности');
      return;
    }
    const newUser = { id: null, name, email, password, history: [] }
    createUser(newUser, showError, navigation);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новый аккаунт</Text>
      <View style={styles.fields}>
        <Input 
          label='Имя' 
          placeholder='Ваше имя'
          value={name}
          onChangeText={setName} 
        />
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
      <View style={styles.conditions}>
        <RadioButton 
          label='Я принимаю условия и политику конфиденциальности' 
          isSelected={acceptTerms}
          onChange={setAcceptTerms}
        />
      </View>
      <View style={styles.button}>
        <Button 
          text='Зарегистрироваться' 
          onPress={onRegister}
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
