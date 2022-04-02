import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header";
import { Loader } from "../../components/loader/loader";
import { Modal } from "../../components/modal/modal";
import { RowButton } from "../../components/rowButton/rowButton";
import { SocialButtons } from "../../components/socialButtons/socialButtons";
import { FONT_SIZE, ICON_SIZE, IOS } from "../../constants";
import { MainActions, UserActions } from "../../constants/actionNames";
import ASYNC_VAR from "../../constants/asyncVariables";
import { LOGOUTMODALROWS } from "../../constants/screenNames";
import { color } from "../../constants/theme";
import { Colors } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { keyExtractor, removeFromAsyncStorage } from "../../utilities";

export const LogOutModal = ({ visible, closeModal, isLoader, navigation }) => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  const onItemPressed = (item) => {
    if (item.screen === LOGOUTMODALROWS[3].screen) {
      closeModal();
      dispatch(UserActions.onLogOut());
      removeFromAsyncStorage(ASYNC_VAR.USER);

      alert("Logout successfully");

      return;
    } else if (item.screen === LOGOUTMODALROWS[1].screen) {
      let data = {
        user_id: user?.user_id,
      };

      dispatch(MainActions.getFavoriteVideosRequest(data));
      closeModal();
      return;
    } else if (item.screen === LOGOUTMODALROWS[2].screen) {
      let data = {
        user_id: user?.user_id,
      };
      dispatch(MainActions.getWatchLaterVideosRequest(data));
      closeModal();
      return;
    }
    closeModal();
    navigation.navigate(item.screen);
  };

  const renderItem = ({ item }) => {
    return item.name ? (
      <RowButton onPress={onItemPressed} item={item} />
    ) : (
      <View style={styles.separator} />
    );
  };

  const userView = (user) => {
    return (
      <View style={styles.userContainer}>
        <Image
          source={{ uri: user?.img || user?.image_url || "" }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
    );
  };

  return (
    <Modal
      closeModal={closeModal}
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <Loader loading={isLoader} />

      <View style={styles.inModal}>
        <Header
          {...(IOS ? { translucent: true } : null)}
          onBackPress={closeModal}
        />

        <FlatList
          ListHeaderComponent={userView(user)}
          showsVerticalScrollIndicator={false}
          data={LOGOUTMODALROWS}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />

        <SocialButtons />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inModal: {
    flex: 1,
    backgroundColor: Colors.primary,
    width: responsiveWidth(100),
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: SPACING.x2Large,
  },
  closeButton: {
    top: SPACING.x3Large,
    left: SPACING.medium,
    height: ICON_SIZE.xLarge,
    width: ICON_SIZE.xLarge,
    borderRadius: ICON_SIZE.xLarge,
    backgroundColor: color.design,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  closeIcon: {
    height: ICON_SIZE.small,
    width: ICON_SIZE.small,
    tintColor: color.tertiary,
  },

  userContainer: {
    alignItems: "center",
    marginVertical: SPACING.x2Large,
  },

  userImage: {
    height: ICON_SIZE.x3Large,
    width: ICON_SIZE.x3Large,
    borderRadius: ICON_SIZE.x3Large,
  },

  userName: {
    fontSize: FONT_SIZE.small,
    marginTop: SPACING.x1Large,
    color: Colors.lightText,
  },

  separator: {
    backgroundColor: "red",
    height: responsiveHeight(0.2),
    width: "100%",
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: "5%",
  },
  bottomText: {
    fontSize: responsiveWidth(2.6),
    fontWeight: "bold",

    color: color.design,
    top: -responsiveHeight(3),
  },
});
