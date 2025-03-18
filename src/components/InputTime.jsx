import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../providers/AppProvider';
import { compareTimes, getBusyPlaces } from '../data/helpers';

export const InputTime = ({ label, isStart }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {date, timeStart, setTimeStart, timeEnd, setTimeEnd, setSelectedPlace, setTimeError, setBusyPlaces} = useContext(AppContext);
  const time = isStart ? timeStart : timeEnd;

  useEffect(() => {
    const isCorrect = compareTimes(timeStart, timeEnd);
    if (!isCorrect) setTimeError('Неправильно указан промежуток времени');
    else setTimeError(null);

    const busySet = isCorrect ? getBusyPlaces(date, timeStart, timeEnd) : new Set();
    setBusyPlaces(busySet);
  }, [date, timeStart, timeEnd])

  const onChange = (_, selectedDate) => {
    setSelectedPlace(null);
    if (isStart) setTimeStart(selectedDate);
    else setTimeEnd(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        testID={isStart ? "timeStartPicker" : 'timeEndPicker'}
        value={time}
        mode='time'
        onChange={onChange}
        minuteInterval={30}
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