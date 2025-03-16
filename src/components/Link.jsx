import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Link = ({ text, navigate, navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  )
}

const createStyles = (colors) => StyleSheet.create({
  link: {
    fontWeight: 600,
    color: colors.blue,
    textDecorationLine: 'underline',
    padding: 3
  }
});