import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const Input = ({ label, placeholder }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
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
  }
});