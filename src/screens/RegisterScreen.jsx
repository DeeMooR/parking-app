import { useContext, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Input, InputPassword, Button, Link, RadioButton } from '../components';
import { AppContext } from '../providers/AppProvider';
import { createUser, useOrientation } from '../utils';

export const RegisterScreen = ({ navigation }) => {
  const { colors, isLandscape } = useOrientation();
  const styles = createStyles(colors, isLandscape);
  const { setModalText } = useContext(AppContext);

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

  const onRegister = async () => {
    if (!name || !email || !password) {
      showError('Необходимо заполнить все поля');
      return;
    }
    if(!acceptTerms) {
      showError('Необходимо принять условия и политику конфиденциальности');
      return;
    }
    const newUser = { name, email, password, history: [] }
    const isCreated = await createUser(newUser, showError, navigation);
    if (isCreated) {
      setModalText(`Пользователь ${name} успешно создан`)
      navigation.navigate('Login');
    }
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
          componentStyle={styles.name}
        />
        <Input 
          label='Почта' 
          placeholder='Ваша почта' 
          value={email}
          onChangeText={setEmail} 
          componentStyle={styles.email}
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

const createStyles = (colors, isLandscape) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexWrap: isLandscape && 'wrap',
    flexDirection: isLandscape && 'row',
    justifyContent: 'space-between',
    gap: isLandscape ? 12 : 20,
    width: '100%',
    marginBottom: isLandscape ? 12 : 36
  },
  name: {
    width: isLandscape && '49%'
  },
  email: {
    width: isLandscape && '49%'
  },
  conditions: {
    width: '100%',
    marginBottom: 14
  },
  button: {
    width: '100%',
    marginBottom: isLandscape && 10
  },
  login: {
    position: !isLandscape && 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    bottom: !isLandscape && 80
  },
  login__text: {}
});
