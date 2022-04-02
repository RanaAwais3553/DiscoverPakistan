import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { ICON_SIZE, isEmptyObject } from "../../constants";
import { ROUTE } from "../../navigation/routeNames";
import { LogOutModal } from "../../screens";
import { Colors } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { Image } from "../image/image";

export interface Props {
  navigation: any;
}

export const HeaderAvatar: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.user);

  const [showModal, setshowModal] = useState(false);
  const openModal = () => {
    if (isEmptyObject(user)) {
      navigation.navigate(ROUTE.SignIn);
      return;
    }
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.profileName}>
        {user?.name || ""}
      </Text>

      <TouchableOpacity style={styles.profileImg} onPress={openModal}>
        {!isEmptyObject(user) ? (
          <Image
            source={{ uri: user?.img || user?.image_url || "" }}
            style={styles.profileImg}
          />
        ) : (
          <FontAwesome name="user" size={ICON_SIZE.small} color="#333" />
        )}
      </TouchableOpacity>

      <LogOutModal
        navigation={navigation}
        visible={showModal}
        closeModal={closeModal}
      />
    </View>
  );
};

HeaderAvatar.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingLeft: SPACING.small,

    flexDirection: "row",
  },

  profileName: {
    color: Colors.darkText,
    marginRight: SPACING.small,
    flex: 1,

    textAlign: "right",
  },

  profileImg: {
    height: ICON_SIZE.medium,
    width: ICON_SIZE.medium,
    borderWidth: 0.7,
    borderColor: Colors.lightText,
    borderRadius: ICON_SIZE.medium / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
