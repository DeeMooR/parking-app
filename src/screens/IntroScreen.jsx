import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Вход</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.btnWhite]} onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.buttonText, styles.buttonTextBlue]}>Новый аккаунт</Text>
        </TouchableOpacity>
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
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#40b7aa',
    backgroundColor: '#40b7aa',
  },
  btnWhite: {
    backgroundColor: '#fff'
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 16,
    color: '#fff',
  },
  buttonTextBlue: {
    color: '#40b7aa'
  }
});
