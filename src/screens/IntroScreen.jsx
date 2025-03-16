import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../components';

export const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logo.png')}
        style={styles.logo}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Urban Garage</Text>
        <Text style={styles.text}>Быстрое бронирование паркинга</Text>
      </View>
      <View style={styles.buttons}>
        <Button 
          text='Вход' 
          navigate='Login' 
          navigation={navigation} 
        />
        <Button 
          text='Новый аккаунт' 
          navigate='Register' 
          navigation={navigation} 
          isWhite 
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
  logo: {
    width: 254,
    height: 254,
    borderRadius: 36,
    marginBottom: 120
  },
  content: {
    marginBottom: 30
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    textAlign: 'center',
    color: '#4d3e3e',
    marginBottom: 4
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'rgba(77, 62, 62, 0.7)'
  },
  buttons: {
    width: '100%',
    gap: 14
  },
});
