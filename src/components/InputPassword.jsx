import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const InputPassword = ({ value }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isHidden, setHidden] = useState(true);

  const toggleVisibility = () => {
    setHidden(!isHidden);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Пароль</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Ваш пароль'
        value={value}
        secureTextEntry={isHidden}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={toggleVisibility}
      >
        <Ionicons
          name={isHidden ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    position: 'relative',
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
  eyeIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }
});