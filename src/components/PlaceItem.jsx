import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { placeTypes } from '../data/config';

export const PlaceItem = ({ place, isEven }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { id, type, userId } = place;

  const placeStyle = [
    styles.place,
    userId ? styles.placeBusy : null,
    isEven ? styles.isEven : null,
  ]

  return (
    <View style={styles.container}>
      <View style={placeStyle}>
        {type === placeTypes.parking ? (
          userId ? (
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
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '25%',
    marginBottom: 10,
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
  },
  isEven: {
    marginLeft: 'auto'
  },
  image: {
    width: 21,
    height: 21
  },
});