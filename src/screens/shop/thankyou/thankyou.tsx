import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";
import { BackIcon } from "../../../assets/svg";
import Header from "../../../components/header/header";
import { Icon } from "../../../components/icon/icon";
import { SocialAuth } from "../../../components/socialAuth/socialAuth";
import { Text } from "../../../components/text/text";
import { FONT_SIZE, ICON_SIZE } from "../../../constants";
import { ShopActions } from "../../../constants/actionNames";
import { ROUTE } from "../../../navigation/routeNames";
import { Colors, Fonts } from "../../../themes";
import { ROW, SPACING } from "../../../themes/helpers";

export const Thankyou = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const orderId = route?.params?.orderId;
  const goToHome = () => {
    navigation.navigate(ROUTE.ShopFirst);
    navigation.navigate(ROUTE.Home);
  };

  const goBack = () => {
    navigation.navigate(ROUTE.ShopFirst);
  };

  useEffect(() => {
    dispatch(ShopActions.clearCart());
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    goBack();

    return true;
  };
  return (
    <View style={styles.container}>
      <Header title={"Order Successful"} translucent onBackPress={goBack} />

      <View style={styles.mainView}>
        <AntDesign
          style={styles.margin}
          name="checkcircle"
          color={Colors.primaryButton}
          size={ICON_SIZE.x3Large}
        />
        <Text style={[styles.heading, styles.margin]}>
          That's all,
          <Text style={[styles.heading, styles.thankyou]}>Thank You!</Text>
        </Text>
        <Text style={[styles.orderId, styles.margin]}>
          {" "}
          Order #: {orderId || 123531}
        </Text>
        <Text style={[styles.appreciate, styles.margin]}>
          We really appreciate your time and doing business with you
        </Text>
        <Text style={[styles.heading, styles.thankyou, styles.margin]}>
          Tell Your Friends
        </Text>

        <SocialAuth type={"orderSuccessful"} />

        <TouchableOpacity style={[ROW, styles.margin]} onPress={goToHome}>
          <Icon Value={BackIcon} />
          <Text style={styles.toHome}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  mainView: {
    alignItems: "center",
    paddingTop: SPACING.x4Large,
    flex: 1,
  },
  margin: {
    marginTop: SPACING.large,
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: responsiveFontSize(4),
  },
  orderId: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x2Large,
  },
  appreciate: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: FONT_SIZE.medium,
  },
  thankyou: {
    color: Colors.primaryButton,
  },
  toHome: {
    marginLeft: SPACING.small,
  },
});
