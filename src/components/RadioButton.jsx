import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const RadioButton = ({ label }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isSelected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected(!isSelected);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleSelected}>
      <View style={styles.radio}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
  },
  label: {
    width: '100%',
    fontSize: 15,
  },
});
