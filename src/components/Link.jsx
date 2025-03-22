import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Link = ({ text, navigate, navigation, onPress, style }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const onTouch = () => {
    onPress ? onPress() : navigation.navigate(navigate);
  }

  return (
    <TouchableOpacity onPress={onTouch}>
      <Text style={[styles.link, style]}>{text}</Text>
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