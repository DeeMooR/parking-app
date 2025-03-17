import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Input = ({ label, placeholder, value, isSmall }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const inputStyle = [
    styles.input,
    isSmall ? styles.inputSmall : null,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={inputStyle} 
        placeholder={placeholder} 
        value={value}
      />
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black
  },
  input: {
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 16
  },
  inputSmall: {
    height: 48,
    paddingHorizontal: 14
  }
});