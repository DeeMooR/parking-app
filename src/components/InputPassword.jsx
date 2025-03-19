import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const InputPassword = ({ value, onChangeText, isSmall }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isHidden, setHidden] = useState(true);

  const inputStyle = [
    styles.input,
    isSmall ? styles.inputSmall : null,
  ];
  const iconStyle = [
    styles.eyeIcon,
    isSmall ? styles.iconSmall : null,
  ];

  const toggleVisibility = () => {
    setHidden(!isHidden);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Пароль</Text>
      <TextInput 
        style={inputStyle} 
        placeholder='Ваш пароль'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isHidden}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="oneTimeCode"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={iconStyle}
        onPress={toggleVisibility}
      >
        <Ionicons
          name={isHidden ? 'eye-off' : 'eye'}
          size={isSmall ? 22 : 24}
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
  inputSmall: {
    height: 48,
    paddingHorizontal: 14
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  iconSmall: {
    bottom: 13,
    right: 14,
  }
});