import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';

export const InputTime = ({ label }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedTime) => {
    setTime(selectedTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={time}
        mode='time'
        onChange={onChange}
        accentColor={colors.blue}
        style={styles.datePicker}
        minuteInterval={30}
      />
    </SafeAreaView>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black
  },
  datePicker: {
    marginLeft: -10,
  }
});