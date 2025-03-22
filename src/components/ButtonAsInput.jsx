import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const ButtonAsInput = ({ value, placeholder, onPress, isSmall, style }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const buttonStyle = [
    styles.button,
    style,
    isSmall ? styles.btmSmall : null,
  ];

  const textStyle = [
    styles.text,
    value ? styles.textValue : null,
  ]

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{value ?? placeholder}</Text>
    </TouchableOpacity>
  )
}

const createStyles = (colors) => StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    minHeight: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  btmSmall: {
    minHeight: 44,
    paddingHorizontal: 14
  },
  text: {
    fontSize: 14,
    color: colors.placeholder,
  },
  textValue: {
    color: colors.black
  }
});