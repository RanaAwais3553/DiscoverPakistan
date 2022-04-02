import React, { FC } from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Colors } from "../../themes";

export interface Props {
  loading: Boolean;
  wrapper?: StyleProp<ViewStyle>;
  size?: Number;
  color?: string;
  fullScreen?: Boolean;
  style?: StyleProp<ViewStyle>;
  type?: "Simple" | "MarketPlace" | "Garage";
}

export const Loader: FC<Props> = ({
  wrapper,
  size,
  fullScreen,
  style,
  color,
  loading,
  type,
}) => {
  return fullScreen ? (
    <Modal
      animationType="none"
      transparent={true}
      visible={loading}
      onRequestClose={() => {}}
    >
      <SafeAreaView style={[styles.wrapper, wrapper]}>
        <View style={styles.imageView}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </SafeAreaView>
    </Modal>
  ) : loading ? (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={Colors.primaryButton} size="large" />
    </View>
  ) : null;
};

Loader.defaultProps = {
  fullScreen: false,
  size: responsiveFontSize(6),
  color: Colors.primaryButton,
  type: "Simple",
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  imageView: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
