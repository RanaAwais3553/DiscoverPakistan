import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const Modal = ({
  children,
  visible,
  animationType,
  contentStyle,
  closeModal,
  style,
}) => {
  return (
    <RNModal
      visible={visible}
      onRequestClose={closeModal}
      animationType={animationType}
      transparent
    >
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.touchableArea} onPress={closeModal} />
        <View style={[styles.modalContentContainer, contentStyle]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: responsiveWidth(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  touchableArea: {
    position: "absolute",
    flex: 1,
    height: responsiveHeight(110),
    width: responsiveWidth(100),
  },
  modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
