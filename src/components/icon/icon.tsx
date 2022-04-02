import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ICON_SIZE } from "../../constants";
import { Colors } from "../../themes";
import { SPACING } from "../../themes/helpers";

export interface Props {
  Value: SVGImageElement;
  height?: number;
  width?: number;
  fill?: string;
  style: StyleProp<ViewStyle>;
  onPress?(): void;
}

export const Icon: React.FC<Props> = ({
  Value,
  height,
  width,
  fill,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Value height={height} width={width} fill={fill} />
    </TouchableOpacity>
  );
};

Icon.defaultProps = {
  height: ICON_SIZE.medium,
  width: ICON_SIZE.medium,
  fill: Colors.darkText,
};

// styles
const styles = StyleSheet.create({
  container: {
    padding: SPACING.small,
  },
});
