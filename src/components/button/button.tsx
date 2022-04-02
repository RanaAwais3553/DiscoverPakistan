import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS } from "../../themes/helpers";

export interface Props {
  title: string;
  isPrimary?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  title,
  isPrimary,
  onPress,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonPrimaryStyle,
        !isPrimary && styles.buttonSecondaryStyle,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonPrimaryText,
          !isPrimary && styles.buttonSecondaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  title: "Press Me",
  isPrimary: true,
  style: {},
  textStyle: {},
  onPress: () => {},
  disabled: false,
};

const styles = StyleSheet.create({
  buttonPrimaryStyle: {
    backgroundColor: Colors.primaryButton,
    width: "80%",
    height: responsiveHeight(7),
    alignItems: "center",
    justifyContent: "center",
    ...BORDERRADIUS,
  },
  buttonPrimaryText: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.primaryButtonText,
    fontFamily: Fonts.bold,

    textTransform: "capitalize",
  },
  buttonSecondaryStyle: {
    backgroundColor: Colors.primary,
    borderWidth: 0.5,
    borderColor: Colors.primaryBorderColor,
  },
  buttonSecondaryText: {
    color: Colors.lightText,
    fontFamily: Fonts.bold,
  },
  disabledButton: { opacity: 0.3, backgroundColor: "grey" },
});

const MemodFuncComponent = React.memo(Button);
export default MemodFuncComponent;
