import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const PlaceSample = ({ isBusy, isActive, text }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const squareStyle = [
    styles.square,
    isBusy ? styles.squareBusy : null,
    isActive ? styles.squareActive : null,
  ]

  return (
    <View style={styles.container}>
      <View style={squareStyle} />
      <Text style={styles.text}>– {text}</Text>
    </View>
  )
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  square: {
    width: 18, 
    height: 18,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: colors.blue
  },
  squareBusy: {
    borderColor: colors.black
  },
  squareActive: {
    backgroundColor: colors.blueOpacity
  },
  text: {
    fontSize: 13,
    color: colors.black
  },
});