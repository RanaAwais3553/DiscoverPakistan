import { Ionicons } from "@expo/vector-icons";
import React, { FC, ReactElement, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FONT_SIZE, ICON_SIZE, SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, ELEVATION, SPACING } from "../../themes/helpers";

export interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  lableTextStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<ViewStyle>;
  onChangeText(text: any): void;
  onPressIn?: any;
  title?: string;
  leftComponent?: ReactElement;
  placeholderTextColor?: string;
  showEye?: boolean;
  ref: any;
  secureTextEntry?: boolean;
  hideElevation?: boolean;
}

export const TextInput: FC<Props> = ({
  style,
  editable,
  onChangeText,
  onPressIn,
  title,
  leftComponent,
  containerStyle,
  showEye,
  ref,
  secureTextEntry,
  hideElevation,
  ...restProps
}) => {
  const [securePassword, setsecurePassword] = useState(showEye);
  const onEyePressed = () => {
    setsecurePassword((p) => !p);
  };
  return (
    <View
      style={[styles.container, !hideElevation && ELEVATION, containerStyle]}
    >
      {leftComponent}
      {title && <Text>{title}</Text>}

      <RNTextInput
        ref={ref}
        style={[styles.textInput, leftComponent && styles.paddingLeft, style]}
        {...restProps}
        autoCapitalize="none"
        placeholderTextColor={Colors.placeHolder}
        onChangeText={onChangeText}
        secureTextEntry={securePassword}
        editable={editable}
      />

      {showEye ? (
        <TouchableOpacity style={styles.eyePass} onPress={onEyePressed}>
          <Ionicons
            name={securePassword ? "eye-off" : "eye"}
            color={Colors.lightIcon}
            size={ICON_SIZE.small}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

TextInput.defaultProps = {
  style: {},
  lableTextStyle: {},

  returnKeyType: "done",
  ref: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    ...BORDERRADIUS,
    height: SIZE.medium,
    paddingHorizontal: SPACING.medium,
  },
  textInput: {
    height: "100%",
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.medium,
    color: Colors.darkText,
  },
  paddingLeft: {
    paddingLeft: SPACING.medium,
  },
  eyePass: {
    paddingHorizontal: "2%",
  },
});
