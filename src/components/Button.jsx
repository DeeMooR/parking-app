import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Button = ({ text, navigate, navigation, onPress, style, disabled, isWhite, isSmall }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const buttonStyle = [
    styles.button,
    style,
    disabled ? styles.btnDisabled : null,
    isWhite ? styles.btnWhite : null,
    isSmall ? styles.btmSmall : null,
  ];
  const textStyle = [
    styles.buttonText,
    isWhite ? styles.btnWhiteText : null,
  ];

  const onTouch = () => {
    onPress ? onPress() : navigation.navigate(navigate);
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onTouch} disabled={disabled}>
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
  btmSmall: {
    height: 50
  },
  btnDisabled: {
    borderColor: colors.grey,
    backgroundColor: colors.grey
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