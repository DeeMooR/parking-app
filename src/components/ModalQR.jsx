import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { Link } from '.';
import { useOrientation } from '../utils';

export const ModalQR = ({ isOpen, close }) => {
  const { colors, isLandscape } = useOrientation();
  const styles = createStyles(colors, isLandscape);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={close}
      supportedOrientations={['landscape', 'portrait']}
    >
      <View style={styles.modal}>
        <View style={styles.modal__view}>
          <Image
            source={require('@/assets/qrCode.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Покажите QR-код на въезде</Text>
          <Text style={styles.text}>Обновляется ежедневно в 00:00</Text>
          <Link 
            text='Закрыть' 
            onPress={close}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  )
}

const createStyles = (colors, isLandscape) => StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal__view: {
    alignItems: 'center',
    margin: 20,
    padding: 30,
    paddingTop: isLandscape ? 25 : 35,
    paddingBottom: isLandscape && 25,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    marginBottom: isLandscape ? 15 : 20
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: isLandscape ? 15 : 25,
  },
  button: {
    fontSize: isLandscape ? 17 : 18
  }
});