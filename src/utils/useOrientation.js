import { useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

export const useOrientation = () => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const isMobile = width > height;
  
  return { colors, isMobile };
};