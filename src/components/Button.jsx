import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Button = ({ text, navigate, navigation, isWhite = false }) => {
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

const styles = StyleSheet.create({
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
  btnWhiteText: {
    color: '#40b7aa'
  }
});