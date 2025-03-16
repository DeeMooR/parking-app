import { View, Text, Button, StyleSheet } from 'react-native';

export const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Страница регистрации</Text>
      <Button title="Перейти на главную" onPress={() => navigation.navigate('MainTabs')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
