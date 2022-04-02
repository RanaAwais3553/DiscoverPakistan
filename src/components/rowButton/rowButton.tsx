import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { ICON_SIZE } from "../../constants";

export const RowButton = ({ item, onPress }) => {
  const onItemPressed = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onItemPressed}>
      <item.icon width={ICON_SIZE.medium} height={ICON_SIZE.medium} />
      <Text style={styles.text} numberOfLines={1}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: responsiveWidth(90),
    height: responsiveHeight(6),
  },
  image: {},
  text: {
    fontSize: 18,
    fontWeight: "bold",

    color: "black",
    width: "85%",
    marginLeft: "2%",
  },
});
