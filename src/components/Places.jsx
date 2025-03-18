import { useEffect, useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { AppContext } from '../providers/AppProvider';
import { PlaceItem } from '.';
import { places } from '../data/data';
import { getBusyPlaces } from '../data/helpers';

export const Places = () => {
  const {date, timeStart, timeEnd} = useContext(AppContext);
  const [busyPlaces, setBusyPlaces] = useState(new Set());

  useEffect(() => {
    const busySet = getBusyPlaces(date, timeStart, timeEnd);
    setBusyPlaces(busySet);
  }, [date, timeStart, timeEnd]);

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <PlaceItem 
            place={item}
            isEven={item.id % 2 === 0}
            isBusy={busyPlaces.has(item.id)}
          />
        )}
        style={styles.list}
        numColumns={4}
        scrollEnabled={false}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {}
});