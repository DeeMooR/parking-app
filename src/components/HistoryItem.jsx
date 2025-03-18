import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { placeRU } from '../data/config';

export const HistoryItem = ({ item, index }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { date, timeStart, timeEnd, place, type } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.index}>{index}.</Text>
      <View style={styles.content}>
        <Text style={styles.text}>{`${date} ${timeStart} – ${timeEnd}`}</Text>
        <Text style={styles.text}>{placeRU[type]}</Text>
        <Text style={styles.text}>Место {place}</Text>
      </View>
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  index: {
    fontSize: 14
  },
  content: {
    gap: 3
  },
  text: {
    fontSize: 14,
    color: colors.black
  },
});