import { View, Text, TextInput, StyleSheet } from 'react-native';

export const Input = ({ label, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000'
  },
  input: {
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d8dadc',
    paddingHorizontal: 16
  }
});