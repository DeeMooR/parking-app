import { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { HistoryItem } from '.';
import { compareDates, sortHistory } from '../data/helpers';
import { AppContext } from '../providers/AppProvider';

export const History = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { history } = useContext(AppContext);

  const getHistoryArr = (isActive) => {
    const filteredHistory = history.filter(item => {
      const isNext = compareDates(item.date);
      return isActive ? isNext : !isNext;
    });
    return sortHistory(filteredHistory, isActive);
  }

  return (
    <ScrollView 
      style={styles.container}
      scrollEnabled={history.length > 2}
    >
      <View style={styles.historyBlock}>
        {!!getHistoryArr(true).length ? (
          <>
            <Text style={styles.title}>Активные брони:</Text>
            <FlatList
              data={getHistoryArr(true)}
              renderItem={({ item, index }) => (
                <HistoryItem item={item} index={index + 1} />
              )}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
            />
          </>
        ) : (
          <Text style={[styles.title, styles.emptyTitle]}>Активных броней нет</Text>
        )}
      </View>
      <View style={styles.historyBlock}>
        {!!getHistoryArr(false).length &&
          <>
            <Text style={styles.title}>История:</Text>
            <FlatList
              data={getHistoryArr(false)}
              renderItem={({ item, index }) => (
                <HistoryItem item={item} index={index + 1} />
              )}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
            />
          </>
        }
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
  emptyTitle: {
    marginBottom: 20
  }
});