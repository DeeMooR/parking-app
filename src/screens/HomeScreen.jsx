import { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import { Header, Button, ModalQR } from '../components';
import { AppContext } from '../providers/AppProvider';
import { useOrientation } from '../utils';

export const HomeScreen = ({ navigation }) => {
  const { colors, isLandscape } = useOrientation();
  const styles = createStyles(colors, isLandscape);
  const { user } = useContext(AppContext);
  const [isOpenModal, setOpenModal] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    let sceneWidth = Dimensions.get('window').width;
    const imageWidth = isLandscape ? (sceneWidth - 120)*0.49 : sceneWidth - 38
    const imageHeight = imageWidth*0.56;
    setImageHeight(imageHeight)
  }, [isLandscape]);

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <View style={styles.container}>
      {!isLandscape && 
        <View style={styles.header}>
          <Header text={`Привет, ${user.name}! 👋`} />
        </View>
      }
      <View style={styles.left}>
        <Image
          source={require('@/assets/parkingMain.jpg')}
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
      </View>
      <View style={styles.right}>
        <View>
          <Text style={styles.map__title}>Мы на карте</Text>
          <Text style={styles.map__text}>Минск, ул. Петра Мстиславца, 11</Text>
        </View>
        {Platform.OS === 'android' ? (
          <Image
            source={require('@/assets/map.png')}
            style={styles.map_image}
          />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: isLandscape ? 53.9318 : 53.9232,
              longitude: 27.6513,
              latitudeDelta: isLandscape ? 0.008 : 0.0135,
              longitudeDelta: isLandscape ? 0.008 : 0.0135,
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
        )}
      </View>
      <ModalQR isOpen={isOpenModal} close={closeModal} />
    </View>
  );
}

const createStyles = (colors, isLandscape) => StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: isLandscape ? 60 : 19,
    marginTop: isLandscape ? 30 : 60,
    flexDirection: isLandscape && 'row',
    justifyContent: isLandscape && 'space-between'
  },
  header: {
    marginBottom: 20
  },
  left: {
    width: isLandscape ? '47%' : '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 20
  },
  buttons: {
    width: isLandscape ? '100%' : '75%',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 52
  },
  btnParking: {
    flex: isLandscape ? 4 : 3
  },
  btnQR: {
    flex: 2,
    backgroundColor: colors.blueGrey,
    borderColor: colors.blueGrey,
  },
  right: {
    width: isLandscape ? '47%' : '100%'
  },
  map_image: {
    width: '100%',
    height: isLandscape ? '70%' : '52%'
  },
  map__title: {
    fontWeight: 700,
    fontSize: isLandscape ? 26 : 22,
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
