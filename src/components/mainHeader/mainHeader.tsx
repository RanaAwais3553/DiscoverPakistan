import React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  DiscoverPakEngIcon,
  DiscoverPakUrduIcon,
  DrawerIcon,
} from "../../assets/svg";
import { ICON_SIZE } from "../../constants";
import { ELEVATION, SPACING, STATUSBARHEIGHT } from "../../themes/helpers";
import { HeaderAvatar } from "../headerAvatar/headerAvatar";
import { Icon } from "../icon/icon";

export interface Props {
  navigation: any;
  navigates():void;
}

const Header: React.FC<Props> = ({ navigation,navigates }) => {
  const onDrawerIconPressed = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.container}>
      <Icon onPress={onDrawerIconPressed} Value={DrawerIcon} />
      <Icon onPress={navigates} width={responsiveWidth(20)} Value={DiscoverPakEngIcon} />
      <Icon
        width={responsiveWidth(25)}
        height={ICON_SIZE.large}
        Value={DiscoverPakUrduIcon}
      />
      <HeaderAvatar navigation={navigation} />
    </View>
  );
};

Header.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: SPACING.extraSmall,
    paddingRight: SPACING.small,
    ...STATUSBARHEIGHT,
    ...ELEVATION,
  },
});

export const MainHeader = React.memo(Header);
