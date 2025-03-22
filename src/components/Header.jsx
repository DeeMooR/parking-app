import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Header = ({ text }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Image
        source={require('@/assets/person.png')}
        style={styles.icon}
      />
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontWeight: 700,
    fontSize: 22,
    color: colors.brown
  },
  icon: {
    width: 45,
    height: 45
  }
});