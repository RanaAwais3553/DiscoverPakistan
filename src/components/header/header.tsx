import React, { ReactElement } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { BackIcon } from "../../assets/svg";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { ELEVATION, SPACING, STATUSBARHEIGHT } from "../../themes/helpers";
import { Icon } from "../icon/icon";

export interface Props {
  onBackPress(): void;
  title?: string;
  rightComponent?: ReactElement;
  onRightComponentPress?(): void;
  onpressToOpenModal?(): void;
  hideElevation?: boolean;
  subTitle?: string;

  translucent?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<Props> = ({
  onBackPress,
  translucent,
  title,
  rightComponent,
  onRightComponentPress,
  hideElevation,

  subTitle = null,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        !hideElevation && ELEVATION,
        translucent && styles.statusBar,
        style,
      ]}
    >
      <Icon
        style={styles.headerButtons}
        Value={BackIcon}
        onPress={onBackPress}
      />

      <View style={styles.headerTextWrapper}>
        <Text style={[styles.headerText]}>{title}</Text>
        {subTitle && <Text style={styles.sub_title}>{subTitle}</Text>}
      </View>

      {rightComponent && (
        <TouchableOpacity
          disabled={rightComponent ? true : null}
          style={styles.headerButtons}
          onPress={onRightComponentPress}
        >
          {rightComponent}
        </TouchableOpacity>
      )}
    </View>
  );
};

Header.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.primary,

    alignItems: "center",
  },

  headerButtons: {
    padding: ICON_SIZE.small,
  },

  headerText: {
    color: Colors.darkText,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x1Large,
    textTransform: "uppercase",
    marginLeft: SPACING.medium,
    alignSelf: "center",
  },

  sub_title: {
    textAlign: "left",
    color: Colors.darkText,
    fontSize: FONT_SIZE.small,
    fontFamily: Fonts.bold,
  },

  statusBar: {
    ...STATUSBARHEIGHT,
  },
});

const MemodFuncComponent = React.memo(Header);
export default MemodFuncComponent;
