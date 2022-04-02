import { Fontisto } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { Images } from "../../../assets/images";
import { AvoideKeyBoard } from "../../../components/avoideKeyBoard/avoideKeyBoard";
import Button from "../../../components/button/button";
import { CartList } from "../../../components/cartList/cartList";
import { Loader } from "../../../components/loader/loader";
import { MainHeader } from "../../../components/mainHeader/mainHeader";
import { Separator } from "../../../components/separator/separator";
import { Text } from "../../../components/text/text";
import { TextInput } from "../../../components/textInput/textInput";
import { TopImage } from "../../../components/topImage/topImage";
import { FONT_SIZE, ICON_SIZE, PlaceHolders } from "../../../constants";
import { ShopActions } from "../../../constants/actionNames";
import { Colors, Fonts } from "../../../themes";
import {
  ELEVATION,
  LISTIPADDINGBOTTOM,
  ROW,
  SPACING,
} from "../../../themes/helpers";
import { calculateTotalCartPrice, checkIfEmpty } from "../../../utilities";

export const CheckOut = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);

  const cart = useSelector((state) => state?.shop?.cart);
  const onCheckOut = useSelector((state) => state?.shop?.onCheckOut);

  const scrollRef = useRef(null);

  const [country, setcountry] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [tcsStandard, settcsStandard] = useState(true);

  const getSubTotal = useCallback(() => {
    return calculateTotalCartPrice(cart);
  }, [cart]);

  const onSubmitOrder = () => {
    if (checkIfEmpty(firstName, "Kindly enter first name")) {
      scrollRef.current.scrollTo({ y: responsiveHeight(5), animated: true });
      return;
    }
    if (checkIfEmpty(lastName, "Kindly enter last name")) {
      scrollRef.current.scrollTo({ y: responsiveHeight(15), animated: true });
      return;
    }
    if (checkIfEmpty(address1, "Kindly enter address")) {
      scrollRef.current.scrollTo({ y: responsiveHeight(20), animated: true });
      return;
    }

    if (checkIfEmpty(zipCode, "Kindly enter zip code")) {
      scrollRef.current.scrollTo({ y: responsiveHeight(25), animated: true });
      return;
    }
    if (checkIfEmpty(phoneNumber, "Kindly enter phone number")) {
      scrollRef.current.scrollTo({ y: responsiveHeight(30), animated: true });
      return;
    }

    let payLoad = {
      user_id: user?.user_id,
      billing_first_name: firstName,
      billing_last_name: lastName,
      zip_code: zipCode,
      billing_address_1: address1,
      billing_address_2: address2,
      billing_country: "Pakistan",
      order_comments: "",
      billing_phone: phoneNumber,
      payment_method: tcsStandard,
    };

    dispatch(ShopActions.onCheckOutRequest(payLoad));
  };
  const row = (leftText, rightText) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{leftText}</Text>
        <Text style={styles.rowText}>{rightText}</Text>
      </View>
    );
  };
  const onToggleDeliveryMethod = () => {
    settcsStandard((p) => !p);
  };

  return (
    <View style={styles.container}>
      <Loader fullScreen loading={onCheckOut.loading} />
      <MainHeader navigation={navigation} />
      <TopImage backgroundImage={Images.shopTopImage} />
      <AvoideKeyBoard>
        <ScrollView ref={scrollRef} contentContainerStyle={LISTIPADDINGBOTTOM}>
          <Text style={styles.myBagText}>Complete Your Order</Text>

          <View style={styles.elevatedSurface}>
            <Text style={styles.orderSummary}>Address Info</Text>
            <TextInput
              hideElevation
              placeholder={PlaceHolders.country}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={setcountry}
              value={country}
            />
            <TextInput
              hideElevation
              placeholder={PlaceHolders.firstName}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={setfirstName}
              value={firstName}
            />
            <TextInput
              hideElevation
              placeholder={PlaceHolders.lastName}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={setlastName}
              value={lastName}
            />
            <TextInput
              hideElevation
              placeholder={PlaceHolders.address1}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={setaddress1}
              value={address1}
            />
            <TextInput
              hideElevation
              placeholder={PlaceHolders.address2}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={setaddress2}
              value={address2}
            />
            <TextInput
              hideElevation
              placeholder={PlaceHolders.zipCode}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={setzipCode}
              value={zipCode}
            />
            <TextInput
              hideElevation
              placeholder={PlaceHolders.phoneNumber}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              keyboardType={"numeric"}
              onChangeText={setphoneNumber}
              value={phoneNumber}
            />

            <Text style={[styles.orderSummary, styles.deliverMethod]}>
              Choose Delivery Method
            </Text>
            <Separator
              style={[styles.separator, styles.deliverMethodSeparator]}
            />
            <TouchableOpacity
              style={styles.radioButton}
              onPress={onToggleDeliveryMethod}
            >
              <Fontisto
                name={tcsStandard ? "radio-btn-active" : "radio-btn-passive"}
                color={Colors.primaryButton}
                size={ICON_SIZE.medium}
              />
              <Text style={styles.radioButtonTitle} text={"T.C.S Standard"} />
            </TouchableOpacity>
            <Text
              style={styles.deliverMethodText}
              text={"currently four days, unless otherwise noted"}
            />
          </View>

          <View style={styles.elevatedSurface}>
            <Text style={styles.orderSummary}>Item Summary</Text>
            <CartList type={"CheckOut"} style={styles.cartList} />
          </View>

          <View style={styles.elevatedSurface}>
            <Text style={styles.orderSummary}>Order Summary</Text>
            {row("Subtotal", getSubTotal())}
            {row("Est. Shipping and Headling", "Rs. 0.00")}
            {row("Ext. Sales Tax", "Rs. 0.00")}
            <Separator style={[styles.separator, styles.summarySeparator]} />
            {row("Total", getSubTotal())}
            {row(
              "Your credit card will not be charged until your order has shipped unless it is a part of subscription  program. By clicking 'Submit Order' I agree to the discover pakistan shop Term of Use.",
              "",
            )}
          </View>

          <Button
            title={"Submit Order"}
            onPress={onSubmitOrder}
            style={styles.button}
            textStyle={styles.buttonTitle}
          />
        </ScrollView>
      </AvoideKeyBoard>
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
  textInput: {
    width: "90%",
    alignSelf: "center",
    marginBottom: SPACING.small,
    borderBottomWidth: StyleSheet.hairlineWidth,
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

  applyButonTitle: {
    fontSize: FONT_SIZE.medium,
  },
  orderSummary: {
    marginLeft: SPACING.large,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x1Large,
    marginBottom: SPACING.xLarge,
  },
  deliverMethod: {
    marginTop: SPACING.xLarge,
    marginBottom: 0,
  },
  deliverMethodSeparator: {
    marginBottom: SPACING.medium,
  },
  elevatedSurface: {
    backgroundColor: "grey",
    margin: SPACING.medium,
    paddingVertical: SPACING.medium,
    ...ELEVATION,
  },
  deliverMethodText: {
    marginLeft: SPACING.x4Large,
    marginTop: SPACING.small,
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
  radioButton: {
    ...ROW,
    paddingHorizontal: SPACING.medium,
    justifyContent: "flex-start",
  },
  radioButtonTitle: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.large,
    marginLeft: SPACING.medium,
  },
});
