import { Modal, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button } from '.';

export const ModalDelete = ({ isOpen, apply, close }) => {
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
          <Text style={styles.title}>Удаление аккаунта</Text>
          <Text style={styles.text}>Вы уверены, что хотите удалить аккаунт?</Text>
          <View style={styles.buttons}>
            <Button 
              text='Отмена'
              onPress={close}
              style={styles.btnClose}
              isSmall
            />
            <Button 
              text='Удалить'
              onPress={apply}
              style={styles.btnApply}
              isSmall
            />
          </View>
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
    borderWidth: 3,
    borderColor: colors.delete,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    marginBottom: 26,
  },
  buttons: {
    flexDirection: 'row',
    gap: 20
  },
  btnClose: {
    flex: 2
  },
  btnApply: {
    flex: 1,
    backgroundColor: colors.delete,
    borderColor: colors.delete,
  }
});