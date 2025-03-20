import React, { useContext } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { maxDate } from '../data/config';
import { AppContext } from '../providers/AppProvider';

export const InputDate = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {date, setDate, setSelectedPlace} = useContext(AppContext);

  const onChange = (_, selectedDate) => {
    setSelectedPlace(null);
    setDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Дата</Text>
      <DateTimePicker
        testID="datePicker"
        value={date}
        mode='date'
        onChange={onChange}
        minimumDate={new Date()}
        maximumDate={maxDate}
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