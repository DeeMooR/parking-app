import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Link = ({ text, navigate, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    fontWeight: 600,
    color: '#40B7AA',
    textDecorationLine: 'underline',
    padding: 3
  }
});