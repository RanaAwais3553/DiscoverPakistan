import { useDrawerProgress } from "@react-navigation/drawer";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { DiscoverPakistanBarIcon } from "../../assets/svg";
import { DrawerRow } from "../../components/drawerRow/drawerRow";
import { SocialButtons } from "../../components/socialButtons/socialButtons";
import { IOS } from "../../constants";
import { MainActions } from "../../constants/actionNames";
import { DRAWERROWS } from "../../constants/screenNames";
import { ROUTE } from "../../navigation/routeNames";
import { Colors } from "../../themes";
import { SPACING, STATUSBARHEIGHT } from "../../themes/helpers";
import { keyExtractor } from "../../utilities";

export const DrawerScreen = (props) => {
  const currentDrawerScreen = useSelector(
    (state) => state?.main?.currentDrawerScreen,
  );

  const dispatch = useDispatch();

  const progress = useDrawerProgress();
  const onDrawerRowPressed = (drawerItem) => {
    if (drawerItem?.slug) {
      setTimeout(() => {
        dispatch(
          MainActions.getVideoBySlugRequest(
            drawerItem?.slug,
            drawerItem?.title,
          ),
        );
        dispatch(MainActions.setCurrentDrawerScreen(drawerItem?.title));
      }, 1);
    } else if (drawerItem?.show) {
      setTimeout(() => {
        dispatch(MainActions.getShowsRequest(drawerItem?.show));
        dispatch(MainActions.setCurrentDrawerScreen(drawerItem?.title));
      }, 1);

      props.navigation.navigate(ROUTE.HomeFirst);
    }

    props.navigation.navigate(
      drawerItem?.isHome ? ROUTE.HomeFirst : drawerItem?.screen,
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <DrawerRow
        marginLeft={marginLeft}
        item={item}
        height={height}
        isFocused={item?.title === currentDrawerScreen}
        onPress={onDrawerRowPressed}
        {...{ ...props }}
      />
    );
  };

  const marginLeft = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [responsiveWidth(200), 0],
  });

  const height = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-responsiveHeight(10), responsiveHeight(5)],
  });

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <DiscoverPakistanBarIcon width={responsiveWidth(40)} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={DRAWERROWS}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>

      <SocialButtons style={styles.bottomView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    ...(IOS ? { paddingBottom: SPACING.medium } : null),
    ...STATUSBARHEIGHT,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomView: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: SPACING.medium,
  },
});
