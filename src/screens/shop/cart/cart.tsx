import { Entypo } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import { CartList } from "../../../components/cartList/cartList";
import { Separator } from "../../../components/separator/separator";
import { Text } from "../../../components/text/text";
import { FONT_SIZE, ICON_SIZE } from "../../../constants";
import { ROUTE } from "../../../navigation/routeNames";
import { Colors } from "../../../themes";
import { SPACING } from "../../../themes/helpers";
import { calculateTotalCartPrice } from "../../../utilities";

export interface Props {
  closeModal(): void;
  navigation: any;
}

export const Cart: React.FC<Props> = ({ closeModal, navigation }) => {
  const cart = useSelector((state) => state?.shop?.cart);

  const onViewFullBagPressed = () => {
    closeModal();
    navigation.navigate(ROUTE.FullCart);
  };

  const getSubTotal = useCallback(() => {
    return calculateTotalCartPrice(cart);
  }, [cart]);

  return (
    <View style={styles.container}>
      <Text style={styles.myBagText}>{`My Bag (${cart.length})`}</Text>

      <Entypo
        onPress={closeModal}
        style={styles.closeButton}
        name="cross"
        color={Colors.darkText}
        size={ICON_SIZE.medium}
      />

      <Button
        title={"View Full Bag"}
        onPress={onViewFullBagPressed}
        style={styles.button}
        textStyle={styles.buttonTitle}
      />

      <Button
        title={"Continue Shopping"}
        onPress={closeModal}
        style={styles.button}
        isPrimary={false}
        textStyle={styles.buttonTitle}
      />

      <Separator style={styles.separator} />

      <View style={styles.detailsWrapper}>
        <CartList />
        <View style={styles.subTotalView}>
          <Text
            style={styles.subTotalText}
          >{`Sub Total Rs: ${getSubTotal()}`}</Text>
        </View>
      </View>
    </View>
  );
};

Cart.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(80),
    backgroundColor: Colors.primary,
    width: responsiveWidth(100),
    alignItems: "center",
    padding: SPACING.medium,
    justifyContent: "space-between",
    paddingBottom: 0,
  },
  separator: {
    marginTop: SPACING.extraSmall,
    height: StyleSheet.hairlineWidth,
    marginBottom: SPACING.medium,
    width: responsiveWidth(100),
  },
  detailsWrapper: { flex: 1, justifyContent: "space-between" },
  myBagText: {
    fontSize: FONT_SIZE.medium,
  },
  closeButton: {
    alignSelf: "flex-end",
    position: "absolute",
    padding: SPACING.small,
    zIndex: 1,
  },
  button: {
    height: responsiveHeight(5),
    margin: SPACING.small,
  },
  buttonTitle: {
    fontSize: FONT_SIZE.medium,
  },
  subTotalView: {
    backgroundColor: Colors.primaryButton,
    width: responsiveWidth(100),
    alignItems: "flex-end",
    padding: SPACING.small,
  },
  subTotalText: {},
});
