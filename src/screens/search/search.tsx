import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { EmptyScreenMessage } from "../../components/emptyScreenMessage/emptyScreenMessage";
import Header from "../../components/header/header";
import { SearchRow } from "../../components/searchRow/searchRow";
import { TextInput } from "../../components/textInput/textInput";
import { ICON_SIZE, IOS, navigation, PlaceHolders } from "../../constants";
import { MainActions } from "../../constants/actionNames";
import { EMPTY_List_MESSAGE } from "../../constants/empty_screen_messages";
import { ROUTE } from "../../navigation/routeNames";
import { Colors } from "../../themes";
import {
  BORDERRADIUS,
  LISTIPADDINGBOTTOM,
  SPACING,
} from "../../themes/helpers";
import { keyExtractor } from "../../utilities";

export const SearchScreen = ({ closeModal }) => {
  const dispatch = useDispatch();
  const searchVideos = useSelector((state) => state?.main?.searchVideos);

  const [searchText, setsearchText] = useState("");

  const onVideoPressed = (video) => {
    closeModal();
    navigation.navigate(ROUTE.VideoDetails, { videoDetails: video });
  };

  const renderItem = ({ item }: any) => {
    return <SearchRow onPress={onVideoPressed} item={item} />;
  };

  const onSearchTextChanged = (text) => {
    let data = { q: text, page: 1 };

    setsearchText(text);

    dispatch(MainActions.searchVideosRequest(data));
  };

  const onPullDownRefresh = () => {};

  return (
    <View style={styles.container}>
      <Header
        {...(IOS ? { translucent: true } : null)}
        onBackPress={closeModal}
        title={"Search"}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            tintColor={Colors.primaryButton}
            colors={[Colors.primaryButton]}
            progressBackgroundColor={Colors.white}
            refreshing={searchVideos?.loading}
            onRefresh={onPullDownRefresh}
          />
        }
        ListHeaderComponent={
          <TextInput
            placeholder={PlaceHolders.search}
            placeholderTextColor={Colors.placeHolder}
            containerStyle={styles.searchTextInput}
            onChangeText={onSearchTextChanged}
            value={searchText}
            leftComponent={
              <AntDesign
                style={styles.iconStyle}
                name="search1"
                color={Colors.grey}
                size={ICON_SIZE.medium}
              />
            }
          />
        }
        contentContainerStyle={
          searchVideos?.data && searchVideos?.data?.length
            ? LISTIPADDINGBOTTOM
            : styles.contentContainer
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        data={searchVideos.data}
        ListEmptyComponent={
          <EmptyScreenMessage
            message={
              searchText && searchVideos?.data?.length === 0
                ? EMPTY_List_MESSAGE.NO_DATA
                : EMPTY_List_MESSAGE.SEARCH_ITEM
            }
          />
        }
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100),
    backgroundColor: Colors.primary,
  },
  searchTextInput: {
    width: responsiveWidth(95),
    alignSelf: "center",

    height: SPACING.x3Large,
    marginVertical: SPACING.medium,
    ...BORDERRADIUS,
  },
  iconStyle: {
    alignSelf: "center",
  },
  contentContainer: {
    paddingHorizontal: "5%",

    flexGrow: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
