import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView, Platform, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../providers/AppProvider';
import { compareTimes, getBusyPlaces, getOnlyTime } from '../utils';
import { ButtonAsInput } from '.';

export const InputTime = ({ label, isStart }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {dates, date, timeStart, setTimeStart, timeEnd, setTimeEnd, setSelectedPlace, setTimeError, setBusyPlaces} = useContext(AppContext);
  const time = isStart ? timeStart : timeEnd;
  const [showAndroidBtn, setShowAndroidBtn] = useState(false);

  useEffect(() => {
    const isCorrect = compareTimes(timeStart, timeEnd);
    if (!isCorrect) setTimeError('Неправильно указан промежуток времени');
    else setTimeError(null);

    const busySet = (isCorrect && dates) ? getBusyPlaces(dates, date, timeStart, timeEnd) : new Set();
    setBusyPlaces(busySet);
  }, [dates, date, timeStart, timeEnd])

  const onChange = (_, selectedDate) => {
    setShowAndroidBtn(false);
    setSelectedPlace(null);
    if (isStart) setTimeStart(selectedDate);
    else setTimeEnd(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'android' ? (
        <>
          <ButtonAsInput 
            value={getOnlyTime(time)}
            placeholder="Время" 
            onPress={() => setShowAndroidBtn(true)} 
            style={styles.input} 
            isSmall 
          />
          {showAndroidBtn && (
            <DateTimePicker
              value={time}
              mode="time"
              display="clock"
              onChange={onChange}
              minuteInterval={30}
            />
          )}
        </>
      ) : (
        <DateTimePicker
          value={time}
          mode='time'
          onChange={onChange}
          minuteInterval={30}
          accentColor={colors.blue}
          style={styles.datePicker}
        />
      )}
    </SafeAreaView>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {},
  input: {
    minWidth: 75
  },
  datePicker: {
    marginLeft: -10,
  }
});