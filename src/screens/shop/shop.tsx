import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "../../components/button/button";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { Modal } from "../../components/modal/modal";
import { FONT_SIZE } from "../../constants";
import { Colors } from "../../themes";
import { Cart } from "./cart/cart";
import { ProductDetails } from "./productDetails/productDetails";
import { ShopItemList } from "./shopItemList/shopItemList";

export const Shop = ({ navigation }) => {
  const selectedProduct = useRef({});

  const [modalVisible, setmodalVisible] = useState(false);
  const [productModalVisible, setproductModalVisible] = useState(false);

  const [cartModalVisible, setcartModalVisible] = useState(false);

  const onCartPressed = () => {
    setcartModalVisible(true);
    setmodalVisible(true);
    setproductModalVisible(false);
  };

  const onItemPressed = (product) => {
    selectedProduct.current = product;
    setproductModalVisible(true);
    setmodalVisible(true);
  };

  const closeModal = () => {
    setproductModalVisible(false);
    setmodalVisible(false);
    setcartModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />
      <ShopItemList onAddToCart={onCartPressed} onItemPressed={onItemPressed} />
      <Button
        title={"Cart"}
        onPress={onCartPressed}
        style={styles.cartButton}
        textStyle={styles.cartButtonTitle}
      />

      <Modal visible={modalVisible} closeModal={closeModal}>
        {productModalVisible && (
          <ProductDetails
            openCart={onCartPressed}
            closeModal={closeModal}
            product={selectedProduct.current}
          />
        )}
        {cartModalVisible && (
          <Cart navigation={navigation} closeModal={closeModal} />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    width: responsiveWidth(100),
  },
  cartButton: {
    position: "absolute",
    transform: [{ rotateZ: "270deg" }],
    right: -responsiveWidth(5),
    bottom: responsiveHeight(45),
    alignSelf: "center",
    height: responsiveHeight(5),
    width: responsiveWidth(25),
    marginVertical: 0,
  },
  cartButtonTitle: {
    fontSize: FONT_SIZE.x1Large,
  },
});
