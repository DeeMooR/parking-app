import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link } from '.';

export const ModalQR = ({ isOpen, close }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={close}>
      <View style={styles.modal}>
        <View style={styles.modal__view}>
          <Image
            source={require('@/assets/qr_code.png')}
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

const createStyles = (colors) => StyleSheet.create({
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
    paddingTop: 35,
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
    marginBottom: 20
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 25,
  },
  button: {
    fontSize: 18
  }
});