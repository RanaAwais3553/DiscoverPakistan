import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { SCREEN_NAME } from "../../constants/screenNames";
import { ROUTE } from "../../navigation/routeNames";
import { Colors, Fonts } from "../../themes";
import { SPACING } from "../../themes/helpers";

const getActiveRouteState = (routes: any[], index: number, name: string) =>
  routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;

export const DrawerRow = ({
  item,
  onPress,
  state,
  progress,
  height,
  marginLeft,
  isFocused,
  isAssetIcon = false,
}) => {
  const { routes, index } = state;
  // console.log("Routes index and item is:!...",item)
  const isItFocused = () => {
    let focus = false;

    focus = getActiveRouteState(
      routes,
      index,
      item?.screen?.toLowerCase().replace(/\s/gi, ""),
    );

    if (
      focus &&
      (item?.screen === SCREEN_NAME.Home || item?.screen === ROUTE.HomeFirst)
    ) {
      focus = isFocused;
    }
    return focus;
  };

  const focused = isItFocused();

  const onItemPressed = () => {
    let focus = false;

    focus = getActiveRouteState(
      routes,
      index,
      item?.screen?.toLowerCase().replace(/\s/gi, ""),
    );

    if (
      focus &&
      (item?.screen === SCREEN_NAME.Home || item?.screen === ROUTE.HomeFirst)
    ) {
      focus = isFocused;
    }

    onPress(item);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onItemPressed}>
      <Animated.View
        style={[
          styles.rowOverLay,
          {
            backgroundColor: focused ? Colors.primaryButton : "transparent",

            marginLeft: marginLeft,
            height: height,
          },
        ]}
      />
      <View style={styles.rowWrapper}>
        <item.icon width={ICON_SIZE.medium} />
        <Text numberOfLines={1} style={styles.text}>
          {item?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(5),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.small,
  },
  rowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: SPACING.medium,
  },
  text: {
    fontSize: FONT_SIZE.medium,
    paddingLeft: SPACING.medium,
    color: Colors.darkText,
    width: "85%",
    fontFamily: Fonts.regular,
    textTransform: "capitalize",
  },
  rowOverLay: {
    opacity: 0.2,

    position: "absolute",
    width: responsiveWidth(70),
    borderRadius: SPACING.large,

    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
});
