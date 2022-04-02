import React from "react";
import { StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";
import Button from "../../../components/button/button";
import { Image } from "../../../components/image/image";
import { Text } from "../../../components/text/text";
import { FONT_SIZE } from "../../../constants";
import { ShopActions } from "../../../constants/actionNames";
import { Colors, Fonts } from "../../../themes";
import { ROW, SPACING } from "../../../themes/helpers";

export interface Props {
  item: any;
  type: "FullCart" | "CheckOut" | "Default";
}

export const CartRow: React.FC<Props> = ({ item, type }) => {
  const dispatch = useDispatch();
  //   {
  //     "product_id": "12",
  //     "name": "Adventure Bag pack By Discover Pakistan",
  //     "slug": "adventure-bag-pack-by-discover-pakistan",
  //     "description": "<p>Perfect for short excursion and day trip , This Discover Pakistan Adventure Packable bag pack will hold all of your gateway travel essentials .</p><p><span style=\"font-weight: bold;\">Magic in The Details&nbsp;&nbsp;</span></p><ul><li>Top Zipper Main compartment with fold over flap .</li><li>&nbsp;Zipper Compartment&nbsp; in the front top flap .</li><li>Fabric Strap with Plastic Buckle in the front .</li><li>Padded shoulders straps</li><li>Top carry handle&nbsp;</li><li>PVC Free</li><li>Features a Discover Pakistan Adventure Series logo.</li><li>Available in Black and green</li></ul><p><span style=\"font-weight: bold;\">The Bare necessities&nbsp;</span></p><ul><li>All Man-Made Materials</li><li>16 1/4\" H x 10 1/2\" W x 4\" D</li><li>Made in the Pakistan&nbsp;</li></ul><p>Item No : 20124524234</p>",
  //     "price": "4999",
  //     "quantity": "966",
  //     "color": null,
  //     "seo_title": "Adventure Bag pack By Discover Pakistan",
  //     "meta_description": "                                Adventure Bag pack By Discover Pakistan                        ",
  //     "focus_keyword": "",
  //     "tags": "",
  //     "publication": "1",
  //     "created_at": "2020-12-08",
  //     "img": "https://discoverpakistan.tv/discoverpakistanroute/uploads/product/Adventure-Backpack.jpg"
  // }

  const onEditPressed = () => {};
  const onRemovePressed = () => {
    setTimeout(() => {
      dispatch(ShopActions.removeFromCart(item));
    }, 1);
  };

  return (
    <View
      style={[
        styles.container,
        type === "FullCart" && styles.fullCartContainer,
      ]}
    >
      <Image
        style={styles.productImage}
        placeHolderType={"Default"}
        resizeMode={"cover"}
        loaderType={"ActivityIndicator"}
        source={{ uri: item?.img }}
      />

      <View style={styles.detailsWrapper}>
        <Text style={styles.productText}>{item?.name}</Text>
        <Text style={styles.productText}>{`Rs: ${item?.price}`}</Text>
        {["FullCart", "CheckOut"].includes(type) && (
          <Text
            style={[
              styles.productText,
              type === "FullCart" && styles.fullCartDimText,
            ]}
          >{`ID: ${item?.product_id}`}</Text>
        )}
        <Text
          style={[
            styles.productText,
            type === "FullCart" && styles.fullCartDimText,
          ]}
        >{`Quantity: ${item?.cartQuantity || 1}`}</Text>
        {type === "FullCart" && (
          <View style={styles.buttonWrapper}>
            <Button
              title={"Edit"}
              onPress={onEditPressed}
              style={styles.button}
              textStyle={styles.buttonTitle}
            />
            <Button
              title={"Remove"}
              onPress={onRemovePressed}
              style={styles.button}
              textStyle={styles.buttonTitle}
            />
          </View>
        )}
      </View>
    </View>
  );
};

CartRow.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SPACING.small,
    marginBottom: SPACING.small,
  },
  fullCartContainer: {
    paddingBottom: SPACING.small,
  },
  productImage: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    borderWidth: StyleSheet.hairlineWidth,
  },

  detailsWrapper: {
    paddingHorizontal: SPACING.small,

    flex: 1,
  },

  productText: { paddingBottom: SPACING.extraSmall },
  fullCartDimText: {
    color: Colors.lightText,
  },
  buttonWrapper: {
    ...ROW,
    paddingRight: SPACING.x4Large,
  },

  button: {
    backgroundColor: Colors.transparent,
    width: responsiveWidth(20),
    height: FONT_SIZE.x4Large,
    alignItems: "flex-start",
  },
  buttonTitle: {
    color: Colors.primaryButton,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primaryButton,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.medium,
  },
});
