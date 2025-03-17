import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'; 
import { useTheme } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Header, Button, ModalQR } from '../components';

export const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isOpenModal, setOpenModal] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const imageWidth = (screenWidth - 38)*0.56;
    setImageHeight(imageWidth)
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <View style={styles.container}>
      <ModalQR isOpen={isOpenModal} close={closeModal} />
      <View style={styles.header}>
        <Header text='Привет, Дмитрий! 👋' />
      </View>
      <Image
        source={require('@/assets/parking.jpg')}
        style={[styles.image, { height: imageHeight }]}
      />
      <View style={styles.buttons}>
        <Button 
          text='Паркинг' 
          navigate='Parking' 
          navigation={navigation}  
          style={styles.btnParking}
        />
        <Button 
          text='QR код' 
          onPress={() => setOpenModal(true)}
          style={styles.btnQR}
          isGrey
        />
      </View>
      <View>
        <Text style={styles.map__title}>Мы на карте</Text>
        <Text style={styles.map__text}>Минск, ул. Петра Мстиславца, 11</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.93,
          longitude: 27.652,
          latitudeDelta: 0.009,
          longitudeDelta: 0.004,
        }}
        mapType='standard'
        showsCompass={false}
      >
        <Marker
          coordinate={{ latitude: 53.933624, longitude: 27.652157 }}
          title="Urban Garage"
          description="Паркинг"
        />
      </MapView>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 19,
    marginTop: 60
  },
  header: {
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 20
  },
  buttons: {
    width: '75%',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 52
  },
  btnParking: {
    flex: 3
  },
  btnQR: {
    flex: 2,
    backgroundColor: colors.blueGrey,
    borderColor: colors.blueGrey,
  },
  map__title: {
    fontWeight: 700,
    fontSize: 22,
    color: colors.brown,
    marginBottom: 6
  },
  map__text: {
    fontSize: 16,
    color: colors.brownOpacity,
    marginBottom: 15
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
