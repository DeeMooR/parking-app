import { useContext, useCallback, useState } from 'react'
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native'; 
import { useFocusEffect } from '@react-navigation/native';
import { Header, Button, Places, PlaceSample, InputDate, InputTime } from '../components';
import { AppContext } from '../providers/AppProvider';
import { COUNT_PLACES, getDates, updateDates, updateHistory, useOrientation } from '../utils';

export const ParkingScreen = () => {
  const { colors, isLandscape } = useOrientation();
  const styles = createStyles(colors, isLandscape);
  const { user, timeError, busyPlaces, selectedPlace, setSelectedPlace, date, setDates, timeStart, timeEnd, setHistory, setModalText } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);

  const fetchDates = async () => {
    const dates = await getDates();
    if (dates) setDates(dates);
    setSelectedPlace(null);
  }

  useFocusEffect(
    useCallback(() => {
      const func = async () => {
        setLoading(true);
        await fetchDates();
        setLoading(false);
      }
      func();
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
    const isSuccess = await updateDates(date, timeStart, timeEnd, selectedPlace, showError, fetchDates);
    if (isSuccess) {
      setModalText(`Место ${selectedPlace} забронировано`);
      const newHistory = await updateHistory(user.id, date, timeStart, timeEnd, selectedPlace, showError);
      if (newHistory) setHistory(newHistory);
    }
  }

  return (
    <View style={styles.container}>
      {!isLandscape && 
        <View style={styles.header}>
          <Header text='Паркинг' />
        </View>
      }
      <View style={styles.left}>
        {isLoading ? (
          <ActivityIndicator 
            size="large" 
            color={colors.blue} 
            style={styles.loader}
          />
        ) : (
          <>
            <View style={styles.places}>
              <Places />
            </View>
            <View style={styles.samples}>
              <PlaceSample text='занято' isBusy />
              <PlaceSample text='свободно' />
              <PlaceSample text='выбрано' isActive />
            </View>
          </>
        )}
      </View>
      <View style={styles.right}>
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
    </View>
  );
}

const createStyles = (colors, isLandscape) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: isLandscape ? 50 : 19,
    marginTop: isLandscape ? 26 : 60,
    paddingBottom: isLandscape ? 52 : 60,
    flexDirection: isLandscape && 'row',
    justifyContent: isLandscape && 'space-between'
  },
  header: {
    marginBottom: 30
  },
  left: {
    width: isLandscape ? '55%' : '100%'
  },
  loader: {
    height: isLandscape ? 287 : 315,
    marginBottom: 50
  },
  places: {
    marginBottom: 5
  },
  right: {
    width: isLandscape ? '41%' : '100%'
  },
  samples: {
    flexDirection: 'row',
    gap: 19,
    marginLeft: 2,
    marginBottom: 27
  },
  free_places: {
    marginTop: isLandscape && 16,
    marginBottom: 26
  },
  free: {
    fontWeight: 500,
    fontSize: isLandscape ? 22 : 19,
    color: colors.black,
    marginBottom: 4
  },
  busy: {
    fontSize: isLandscape ? 18 : 16,
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
