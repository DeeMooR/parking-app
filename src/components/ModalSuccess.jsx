import React, { useContext, useEffect, useState } from "react";
import { Text, Animated, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from "../providers/AppProvider";
import { useOrientation } from "../utils";

export const ModalSuccess = () => {
  const { colors, isMobile } = useOrientation();
  const styles = createStyles(colors, isMobile);
  const { modalText, setModalText } = useContext(AppContext); 
  const [translateY] = useState(new Animated.Value(-100));

  const animateModal = (toValue) => {
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (modalText) {
      animateModal(isMobile ? 22 : 55);
      const timer = setTimeout(() => {
        setModalText(null);
        animateModal(-100);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalText]);

  return (
    <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
      <Ionicons name="checkmark-circle-outline" size={23} color={colors.green} />
      <Text style={styles.modalText}>{modalText}</Text>
    </Animated.View>
  );
};

const createStyles = (colors, isMobile) => StyleSheet.create({
  modal: {
    position: "absolute",
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 9,
    paddingVertical: 15,
    paddingHorizontal: 20,
    maxWidth: isMobile ? 500 : 320,
    borderRadius: 15,
    borderColor: colors.grey,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.black,
  },
});
