import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { ICON_SIZE, PlaceHolders } from "../../constants";
import { SearchScreen } from "../../screens";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, ELEVATION, ROW, SPACING } from "../../themes/helpers";
import { Modal } from "../modal/modal";

export const SearchButton = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const closeModal = () => {
    setmodalVisible(false);
  };

  const onPress = () => {
    setmodalVisible(true);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <AntDesign
          style={styles.iconStyle}
          name="search1"
          color={Colors.grey}
          size={ICON_SIZE.medium}
        />

        <Text style={styles.searchText}>{PlaceHolders.search}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} closeModal={closeModal}>
        <SearchScreen closeModal={closeModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    height: responsiveHeight(5),
    width: "95%",
    alignSelf: "center",
    ...BORDERRADIUS,
    ...ELEVATION,
    marginVertical: SPACING.small,
    ...ROW,
    justifyContent: "flex-start",
  },
  iconStyle: {
    paddingHorizontal: SPACING.small,
  },
  searchText: {
    letterSpacing: 4,
    fontFamily: Fonts.bold,
  },
});
