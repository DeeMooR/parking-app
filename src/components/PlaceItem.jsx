import { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { placeTypes } from '../data/config';
import { AppContext } from '../providers/AppProvider';

export const PlaceItem = ({ place, isEven, isBusy }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { id, type } = place;

  const {selectedPlace, setSelectedPlace} = useContext(AppContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (selectedPlace === id) setIsActive(true);
    else setIsActive(false);
  }, [selectedPlace])

  const handlePressPlace = () => {
    if (isBusy) return;
    setSelectedPlace(selectedPlace !== id ? id : null);
  }

  const placeStyle = [
    styles.place,
    isBusy ? styles.placeBusy : null,
    isEven ? styles.isEven : null,
    isActive ? styles.isActive : null,
  ]

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePressPlace}
    >
      <View style={placeStyle}>
        {type === placeTypes.parking ? (
          isBusy ? (
            <Image
              source={require('@/assets/parking_icon_fill.png')}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('@/assets/parking_icon.png')}
              style={styles.image}
            />
          )
        ) : (
          <Image
            source={require('@/assets/electric.png')}
            style={styles.image}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '25%',
    paddingTop: 5,
    paddingBottom: 6,
  },
  place: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 34,
    marginHorizontal: 3,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.blue,
  },
  placeBusy: {
    borderColor: colors.black,
    backgroundColor: colors.grey
  },
  isEven: {
    marginLeft: 'auto'
  },
  isActive: {
    backgroundColor: colors.blueOpacity
  },
  image: {
    width: 21,
    height: 21
  },
});