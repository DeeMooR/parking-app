import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Button = ({ text, navigate, navigation, isWhite = false }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const buttonStyle = [
    styles.button,
    isWhite ? styles.btnWhite : null,
  ];
  const textStyle = [
    styles.buttonText,
    isWhite ? styles.btnWhiteText : null,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={() => navigation.navigate(navigate)}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

const createStyles = (colors) => StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    backgroundColor: colors.blue,
  },
  btnWhite: {
    backgroundColor: colors.white
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 16,
    color: colors.white,
  },
  btnWhiteText: {
    color: colors.blue
  }
});