import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { history } from '../data/config';
import { compareDates } from '../data/helpers';
import { HistoryItem } from '.';

export const History = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const getHistoryArr = (isActive) => {
    return history.filter(item => {
      const isNext = compareDates(item.date);
      return isActive ? isNext : !isNext;
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.historyBlock}>
        <Text style={styles.title}>Активные брони:</Text>
        <FlatList
          data={getHistoryArr(true)}
          renderItem={({ item, index }) => (
            <HistoryItem item={item} index={index + 1} />
          )}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.historyBlock}>
        <Text style={styles.title}>История:</Text>
        <FlatList
          data={getHistoryArr(false)}
          renderItem={({ item, index }) => (
            <HistoryItem item={item} index={index + 1} />
          )}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    gap: 13,
    marginBottom: 10
  },
  title: {
    fontWeight: 700,
    fontSize: 22,
    color: colors.brown,
    marginBottom: 10
  },
});