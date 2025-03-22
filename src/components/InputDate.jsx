import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, StyleSheet, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { maxDate } from '../utils';
import { AppContext } from '../providers/AppProvider';
import { ButtonAsInput } from '.';
import { getOnlyDate } from '../utils';

export const InputDate = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {date, setDate, setSelectedPlace} = useContext(AppContext);
  const [showAndroidBtn, setShowAndroidBtn] = useState(false);

  const onChange = (_, selectedDate) => {
    setShowAndroidBtn(false);
    setSelectedPlace(null);
    setDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Дата</Text>
      {Platform.OS === 'android' ? (
        <>
          <ButtonAsInput 
            value={getOnlyDate(date)}
            placeholder="Дата" 
            onPress={() => setShowAndroidBtn(true)} 
            style={styles.input} 
            isSmall 
          />
          {showAndroidBtn && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={onChange}
              minimumDate={new Date()}
              maximumDate={maxDate}
            />
          )}
        </>
      ) : (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={maxDate}
          accentColor={colors.blue}
          style={styles.datePicker}
        />
      )}
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
  input: {
    minWidth: 120
  },
  datePicker: {
    marginLeft: -10,
  }
});