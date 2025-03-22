import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { InputTime } from '.';

export const TimeBlock = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Время</Text>
      <View style={styles.inputs}>
        <InputTime isStart />
        <Text style={styles.line}>–</Text>
        <InputTime />
      </View>
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10
  },
  line: {
    fontSize: 20,
    color: colors.black
  },
});