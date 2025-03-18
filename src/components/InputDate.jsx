import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { getMaxDate } from '../data/helpers';

export const InputDate = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Дата</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode='date'
        onChange={onChange}
        minimumDate={new Date()}
        maximumDate={getMaxDate}
        accentColor={colors.blue}
        style={styles.datePicker}
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