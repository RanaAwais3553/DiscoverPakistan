import React from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSelector } from "react-redux";
import { CartRow } from "../../screens/shop/cart/cartRow";
import { keyExtractor } from "../../utilities";

export interface Props {
  style: StyleProp<ViewStyle>;
  type: "FullCart" | "CheckOut" | "Default";
}

export const CartList: React.FC<Props> = ({ style, type }) => {
  const cart = useSelector((state) => state?.shop?.cart);

  const renderItem = ({ item }: any) => {
    return <CartRow type={type} item={item} />;
  };

  return (
    <FlatList
      style={style}
      showsVerticalScrollIndicator={false}
      data={cart}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

CartList.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
});
