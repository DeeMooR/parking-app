import { useContext, useCallback } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'; 
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { Header, Button, Places, PlaceSample, InputDate, InputTime } from '../components';
import { COUNT_PLACES } from '../data/config';
import { AppContext } from '../providers/AppProvider';
import { getDates, updateDates, updateHistory } from '../data/requests';

export const ParkingScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { user, timeError, busyPlaces, selectedPlace, setSelectedPlace, date, setDates, timeStart, timeEnd, setHistory } = useContext(AppContext);

  const fetchDates = async () => {
    const dates = await getDates();
    if (dates) setDates(dates);
  }

  useFocusEffect(
    useCallback(() => {
      fetchDates();
      setSelectedPlace(null);
    }, [])
  );

  const showError = (error) => {
    Alert.alert(
      "Ошибка бронирования", 
      error, 
      [{ text: "OK", style: 'cancel' }],
    );
  }

  const onBook = async () => {
    if (timeError || !selectedPlace) {
      const message = timeError ? 'Неверно указан промежуток времени' : 'Необходимо выбрать место';
      showError(message);
      return;
    }
    const isSuccess = updateDates(date, timeStart, timeEnd, selectedPlace, showError, fetchDates, setSelectedPlace);
    if (isSuccess) {
      const newHistory = await updateHistory(user.id, date, timeStart, timeEnd, selectedPlace, showError);
      if (newHistory) setHistory(newHistory);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text='Паркинг' />
      </View>
      <View style={styles.places}>
        <Places />
      </View>
      <View style={styles.samples}>
        <PlaceSample text='занято' isBusy />
        <PlaceSample text='свободно' />
        <PlaceSample text='выбрано' isActive />
      </View>
      <View style={styles.free_places}>
        <Text style={styles.free}>Свободно: {COUNT_PLACES - busyPlaces.size}</Text>
        <Text style={styles.busy}>Занято: {busyPlaces.size}</Text>
      </View>
      <View style={styles.inputs}>
        <InputDate />
        <View style={styles.inputs__time}>
          <InputTime label='Время' isStart />
          <Text style={styles.inputs__line}>–</Text>
          <InputTime />
        </View>
      </View>
      <View style={styles.time__error}>
        {timeError &&
          <Text style={styles.error__text}>{timeError}</Text>
        }
      </View>
      <Button 
        text='Забронировать место'
        onPress={onBook}
        style={styles.btnBook}
        isSmall
      />
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 19,
    marginTop: 60,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 30
  },
  places: {
    marginBottom: 5
  },
  samples: {
    flexDirection: 'row',
    gap: 19,
    marginLeft: 2,
    marginBottom: 27
  },
  free_places: {
    marginBottom: 26
  },
  free: {
    fontWeight: 500,
    fontSize: 19,
    color: colors.black,
    marginBottom: 4
  },
  busy: {
    fontSize: 16,
    color: colors.black
  },
  inputs: {
    width: '100%',
    flexDirection: 'row',
    gap: 35,
    marginBottom: 8
  },
  inputs__time: {
    flexDirection: 'row',
    gap: 10
  },
  inputs__line: {
    fontSize: 20,
    paddingTop: 29
  },
  time__error: {
    height: 18,
    marginBottom: 12
  },
  error__text: {
    fontSize: 14,
    color: colors.red,
  },
  btnBook: {
    width: 220
  }
});
