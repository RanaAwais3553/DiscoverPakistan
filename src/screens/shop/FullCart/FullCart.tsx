import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { Images } from "../../../assets/images";
import Button from "../../../components/button/button";
import { CartList } from "../../../components/cartList/cartList";
import { MainHeader } from "../../../components/mainHeader/mainHeader";
import { Separator } from "../../../components/separator/separator";
import { Text } from "../../../components/text/text";
import { TextInput } from "../../../components/textInput/textInput";
import { TopImage } from "../../../components/topImage/topImage";
import { FONT_SIZE } from "../../../constants";
import { ROUTE } from "../../../navigation/routeNames";
import { Colors, Fonts } from "../../../themes";
import { LISTIPADDINGBOTTOM, ROW, SPACING } from "../../../themes/helpers";
import { calculateTotalCartPrice } from "../../../utilities";

export const FullCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.shop?.cart);

  const getSubTotal = useCallback(() => {
    return calculateTotalCartPrice(cart);
  }, [cart]);

  const onCheckoutPressed = () => {
    navigation.navigate(ROUTE.CheckOut);
  };
  const row = (leftText, rightText) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{leftText}</Text>
        <Text style={styles.rowText}>{rightText}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />
      <TopImage backgroundImage={Images.shopTopImage} />

      <ScrollView contentContainerStyle={LISTIPADDINGBOTTOM}>
        <Text style={styles.myBagText}>{`My Bag (${cart.length})`}</Text>

        <Text
          style={styles.subTotalText}
        >{`Sub Total Rs: ${getSubTotal()}`}</Text>

        <Separator style={styles.separator} />

        <CartList type={"FullCart"} style={styles.cartList} />

        <View style={styles.promoCodeWrapper}>
          <Text style={styles.promoCode}>PromoCode</Text>

          <Text onPress={() => {}} style={styles.viewPromotions}>
            View Current Promotions
          </Text>
        </View>

        <View style={styles.promoCodeWrapper}>
          <TextInput
            placeholder={"Enter Promo Code"}
            keyboardType={""}
            placeholderTextColor={Colors.lightText}
            containerStyle={styles.textInput}
            onChangeText={(text) => {}}
          />

          <Button
            title={"Apply"}
            onPress={() => {}}
            isPrimary={false}
            style={styles.applyButon}
            textStyle={styles.applyButonTitle}
          />
        </View>

        <Text style={styles.orderSummary}>Order Summary</Text>
        <View>
          {row("Subtotal", getSubTotal())}

          {row("Est. Shipping and Headling", "Rs. 0.00")}

          {row("Ext. Sales Tax", "Rs. 0.00")}

          <Separator style={[styles.separator, styles.summarySeparator]} />
          {row("Total", getSubTotal())}

          {row("*Tax will be estimated during checkout", "")}
        </View>

        <Button
          title={"Checkout"}
          onPress={onCheckoutPressed}
          style={styles.button}
          textStyle={styles.buttonTitle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  myBagText: {
    fontSize: FONT_SIZE.x1Large,
    alignSelf: "center",
    fontFamily: Fonts.bold,
    marginTop: SPACING.medium,
  },
  subTotalText: {
    fontSize: FONT_SIZE.medium,
    alignSelf: "center",
    marginTop: SPACING.medium,
  },
  button: {
    height: responsiveHeight(6),
    alignSelf: "center",
    width: responsiveWidth(70),
    marginTop: SPACING.medium,

    zIndex: 1,
  },
  buttonTitle: {},
  separator: {
    height: StyleSheet.hairlineWidth,
    marginTop: SPACING.medium,
  },
  cartList: {
    marginTop: SPACING.medium,
  },
  promoCodeWrapper: {
    ...ROW,
    paddingHorizontal: SPACING.large,
    marginVertical: SPACING.medium,
  },
  promoCode: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.medium,
  },
  viewPromotions: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    flex: 1,
    marginRight: SPACING.small,
    height: responsiveHeight(5),
  },
  applyButon: {
    width: "30%",
    height: responsiveHeight(5),
  },
  applyButonTitle: {
    fontSize: FONT_SIZE.medium,
  },
  orderSummary: {
    marginLeft: SPACING.large,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x1Large,
    marginVertical: SPACING.xLarge,
  },
  summarySeparator: {
    width: "90%",
    alignSelf: "center",
    marginBottom: SPACING.large,
  },
  row: {
    ...ROW,
    paddingHorizontal: SPACING.large,
  },
  rowText: {
    fontSize: FONT_SIZE.large,
    marginBottom: SPACING.small,
    color: Colors.dimText,
  },
});
