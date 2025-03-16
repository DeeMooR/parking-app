import { View, Text, StyleSheet } from 'react-native'; 
import { Header } from '../components';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header text='Привет, Дмитрий! 👋' />
      <Text>Главная</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 19,
    marginTop: 60
  },
});
