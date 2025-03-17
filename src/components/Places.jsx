import { View, FlatList, StyleSheet } from 'react-native';
import { places } from '../data/config';
import { PlaceItem } from './PlaceItem';

export const Places = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <PlaceItem 
            place={item}
            isEven={item.id % 2 === 0}
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