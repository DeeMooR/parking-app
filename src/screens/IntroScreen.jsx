import { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '../components';
import { AppContext } from '../providers/AppProvider';
import { emptyUser, useOrientation } from '../utils';

export const IntroScreen = ({ navigation }) => {
  const { colors, isMobile } = useOrientation();
  const styles = createStyles(colors, isMobile);
  const { setUser, setHistory } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      setUser(emptyUser);
      setHistory([]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logo.png')}
        style={styles.logo}
      />
      <View style={styles.form}>
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
    </View>
  );
}

const createStyles = (colors, isMobile) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: isMobile ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isMobile ? 50 : 120,
    width: '100%',
    paddingHorizontal: 19
  },
  logo: {
    width: 254,
    height: 254,
    borderRadius: 36,
  },
  form: {
    width: isMobile ? '45%' : '100%',
  },
  content: {
    marginBottom: 30
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    textAlign: 'center',
    color: colors.brown,
    marginBottom: 4
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.brownOpacity
  },
  buttons: {
    width: '100%',
    gap: 14
  },
});
