import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EmptyScreenMessage } from "../../../components/emptyScreenMessage/emptyScreenMessage";
import { Loader } from "../../../components/loader/loader";
import { ShopActions } from "../../../constants/actionNames";
import { EMPTY_List_MESSAGE } from "../../../constants/empty_screen_messages";
import { LISTIPADDINGBOTTOM } from "../../../themes/helpers";
import { ShopItemRow } from "./shopItemRow";

export interface Props {
  onItemPressed(item: any): void;
  onAddToCart(): void;
}

export const ShopItemList: React.FC<Props> = ({
  onItemPressed,
  onAddToCart,
}) => {
  const dispatch = useDispatch();
  const getShopItems = useSelector((state) => state?.shop?.getShopItems);

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }: any) => {
    return (
      <ShopItemRow
        onAddToCart={onAddToCart}
        onPress={onItemPressed}
        item={item}
      />
    );
  };

  useEffect(() => {
    dispatch(ShopActions.getShopItemsRequest({}));
  }, []);

  useEffect(() => {}, [getShopItems?.data]);

  return (
    <>
      {getShopItems.loading ? (
        <Loader fullScreen loading={getShopItems.loading} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getShopItems?.data}
          ListEmptyComponent={
            <EmptyScreenMessage message={EMPTY_List_MESSAGE.NO_DATA} />
          }
          contentContainerStyle={
            getShopItems?.data && getShopItems?.data?.length
              ? LISTIPADDINGBOTTOM
              : styles.contentContainer
          }
          numColumns={2}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

ShopItemList.defaultProps = {};

// styles
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: "5%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
