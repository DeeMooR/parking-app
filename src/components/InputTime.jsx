import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../providers/AppProvider';
import { checkIsMidnight } from '../data/helpers';

export const InputTime = ({ label, isStart }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {timeStart, setTimeStart, timeEnd, setTimeEnd, setSelectedPlace} = useContext(AppContext);
  const time = isStart ? timeStart : timeEnd;

  const onChange = (_, selectedDate) => {
    setSelectedPlace(null);
    if (isStart) setTimeStart(selectedDate);
    else setTimeEnd(selectedDate);
  };

  const minDate = !checkIsMidnight(timeStart) ? new Date(timeStart.getTime() + 1800000) : null;
  const maxDate = !checkIsMidnight(timeEnd) ? new Date(timeEnd.getTime() - 1800000) : null;
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        testID={isStart ? "timeStartPicker" : 'timeEndPicker'}
        value={time}
        mode='time'
        onChange={onChange}
        minuteInterval={30}
        minimumDate={!isStart && minDate}
        maximumDate={isStart && maxDate}
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