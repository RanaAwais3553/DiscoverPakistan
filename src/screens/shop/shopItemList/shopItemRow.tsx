import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
import { Colors } from "../../../themes";
import { BORDERRADIUS, ELEVATION, SPACING } from "../../../themes/helpers";

export interface Props {
  onPress(item: any): void;
  onAddToCart(): void;
  item: any;
}

export const ShopItemRow: React.FC<Props> = ({
  onPress,
  item,
  onAddToCart,
}) => {
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

  const onAddToCartPressed = () => {
    setTimeout(() => {
      dispatch(ShopActions.addToCart(item));
    }, 1);
    onAddToCart();
  };

  const onItemPressed = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onItemPressed}>
      <Image
        style={styles.productImage}
        placeHolderType={"Default"}
        resizeMode={"cover"}
        loaderType={"ActivityIndicator"}
        source={{ uri: item?.img }}
      />

      <Text style={styles.productTitle}>{item?.name}</Text>
      <Button
        disabled={item?.quantity < 1}
        title={item?.quantity < 1 ? "Out of Stock" : "Add To Cart"}
        onPress={onAddToCartPressed}
        style={styles.button}
        textStyle={styles.buttonTitle}
      />
    </TouchableOpacity>
  );
};

ShopItemRow.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.small,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.small,
    ...ELEVATION,
    ...BORDERRADIUS,
  },
  productImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(30),
  },
  productTitle: {
    textAlign: "center",
    width: "90%",
  },
  button: {
    backgroundColor: Colors.transparent,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightText,
    height: responsiveHeight(4),
    marginVertical: SPACING.small,
  },
  buttonTitle: {
    color: Colors.darkText,
    fontSize: FONT_SIZE.small,
  },
});
