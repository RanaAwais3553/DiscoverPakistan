import { FontAwesome } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";
import Button from "../../../components/button/button";
import { Counter } from "../../../components/counter/counter";
import Header from "../../../components/header/header";
import { Image } from "../../../components/image/image";
import { Separator } from "../../../components/separator/separator";
import { Text } from "../../../components/text/text";
import { FONT_SIZE, ICON_SIZE, IOS } from "../../../constants";
import { ShopActions } from "../../../constants/actionNames";
import { Colors, Fonts } from "../../../themes";
import {
  BORDERRADIUS,
  LISTIPADDINGBOTTOM,
  SPACING,
} from "../../../themes/helpers";

export interface Props {
  product: any;
  closeModal(): void;
  onCartPressed(): void;
  onAddToCart(item: any): void;
  openCart?(): void;
}

export const ProductDetails: React.FC<Props> = ({
  product,
  closeModal,
  openCart,
}) => {
  const dispatch = useDispatch();
  const [showMore, setshowMore] = useState(false);

  const count = useRef(0);

  const onAddItemToCart = () => {
    let data = {
      cartQuantity: count.current,
      ...product,
    };

    openCart();
    setTimeout(() => {
      dispatch(ShopActions.addToCart(data));
    }, 1);
  };

  const onCountChange = (countValue) => {
    count.current = countValue;
  };

  const onShowHidePressed = () => {
    setshowMore((p) => !p);
  };

  return (
    <View style={styles.container}>
      <Header
        hideElevation
        title={"Product Details"}
        {...(IOS ? { translucent: true } : null)}
        onBackPress={closeModal}
      />

      <ScrollView contentContainerStyle={LISTIPADDINGBOTTOM}>
        <Image
          style={styles.productImage}
          placeHolderType={"User"}
          loaderType={"ActivityIndicator"}
          source={{ uri: product?.img }}
        />
        <Separator style={styles.separator} />
        <View style={styles.detailsWrapper}>
          <Text style={styles.productText}>Sorry for the inconvenience. Our products are under production and will be available soon. Thanks for your interest.</Text>
          </View>
      </ScrollView>
    </View>
  );
};

ProductDetails.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    width: responsiveWidth(100),
  },
  cartButton: {
    position: "absolute",
    transform: [{ rotateZ: "270deg" }],
    right: -responsiveWidth(4.5),
    bottom: responsiveHeight(45),
    alignSelf: "center",
    height: responsiveHeight(4),
    width: responsiveWidth(20),
    marginVertical: 0,
    marginBottom: 0,
  },
  cartButtonTitle: {
    fontSize: FONT_SIZE.x1Large,
  },
  productImage: {
    height: responsiveHeight(30),
    width: responsiveWidth(90),
    ...BORDERRADIUS,
    alignSelf: "center",
  },
  separator: {
    backgroundColor: Colors.primaryButton,
    width: "15%",
    alignSelf: "center",
    marginVertical: SPACING.small,
  },
  newText: {
    color: Colors.primaryButton,
    fontSize: FONT_SIZE.large,
  },
  detailsWrapper: {
    paddingHorizontal: SPACING.medium,
  },
  productText: { paddingBottom: SPACING.large },

  button: {
    width: responsiveWidth(60),
    alignSelf: "center",
    marginTop: SPACING.x4Large,
  },
  buttonTitle: {
    fontSize: FONT_SIZE.large,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginHorizontal: SPACING.medium,
    color: Colors.primaryButton,
    fontFamily: Fonts.bold,
  },
  description: {
    textAlign: "justify",
  },
  counterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.medium,
  },
  quantity: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.large,
  },
});
