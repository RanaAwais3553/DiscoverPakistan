import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { FONT_SIZE } from "../../constants";
import { Colors } from "../../themes";
import { BORDERRADIUS, SPACING } from "../../themes/helpers";

export interface Props {
  onPress?(): void;
  text?: string;
  checked?: any;
}

const CheckBox: React.FC<Props> = ({ onPress, checked, text }) => {
  const [localRadioButton, setlocalRadioButton] = useState(checked);
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        setlocalRadioButton((p) => !p);
        onPress();
      }}
    >
      <Fontisto
        name={localRadioButton ? "checkbox-active" : "checkbox-passive"}
        color={localRadioButton ? Colors.primaryButton : Colors.lightIcon}
        size={responsiveFontSize(2.5)}
      />
      <Text style={styles.labelStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

CheckBox.defaultProps = {
  onPress: () => {},
  checked: false,
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(7),
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",

    alignItems: "center",
    marginVertical: SPACING.small,

    ...BORDERRADIUS,
  },
  labelStyle: {
    fontSize: FONT_SIZE.large,
    color: Colors.darkText,
    paddingLeft: SPACING.small,
  },
});

const MemodFuncComponent = React.memo(CheckBox);
export default MemodFuncComponent;
