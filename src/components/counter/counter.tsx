import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { Text } from "../text/text";

export interface Props {
  onCountChange(item: any): void;
}

export const Counter: React.FC<Props> = ({ onCountChange }) => {
  const [count, setcount] = useState(0);

  const onIncrement = () => {
    if (count < 50) {
      setcount((p) => p + 1);
      onCountChange(count + 1);
    }
  };
  const onDecrement = () => {
    if (count > 0) {
      setcount((p) => p - 1);
      onCountChange(count - 1);
    }
  };
  return (
    <View style={styles.container}>
      <Entypo
        style={styles.icon}
        onPress={onDecrement}
        name="circle-with-minus"
        color={Colors.primaryButton}
        size={ICON_SIZE.xLarge}
      />

      <Text style={styles.counterText}>{count}</Text>

      <Entypo
        style={styles.icon}
        onPress={onIncrement}
        name="circle-with-plus"
        color={Colors.primaryButton}
        size={ICON_SIZE.xLarge}
      />
    </View>
  );
};

Counter.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: responsiveWidth(25),
    marginHorizontal: SPACING.small,
  },
  icon: { padding: SPACING.extraSmall },
  counterText: {
    fontFamily: Fonts.bold,
    marginHorizontal: SPACING.small,
    fontSize: FONT_SIZE.x1Large,
  },
});
