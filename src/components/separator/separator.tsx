import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Colors } from "../../themes";

export interface Props {
  style: StyleProp<ViewStyle>;
}

export const Separator: React.FC<Props> = ({ style }) => {
  return <View style={[styles.container, style]} />;
};

Separator.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightText,
    height: responsiveHeight(0.3),
    width: "100%",
  },
});
