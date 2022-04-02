import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { FONT_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";

export interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  text?: string;
  children?: any;
  onPress?(): void;
  buttonStyle?: StyleProp<ViewStyle>;
}

const MyText: React.FC<Props> = ({
  text,
  style,
  children,
  onPress,
  buttonStyle,
  ...rest
}) => {
  const content = text || children;

  return onPress ? (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <ReactNativeText {...rest} style={[styles.container, style]}>
        {content}
      </ReactNativeText>
    </TouchableOpacity>
  ) : (
    <ReactNativeText {...rest} style={[styles.container, style]}>
      {content}
    </ReactNativeText>
  );
};

MyText.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    color: Colors.darkText,
    fontSize: FONT_SIZE.small,
    fontFamily: Fonts.regular,
  },
});

export const Text = React.memo(MyText);
