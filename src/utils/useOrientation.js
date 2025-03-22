import { useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

export const useOrientation = () => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  return { colors, isLandscape };
};