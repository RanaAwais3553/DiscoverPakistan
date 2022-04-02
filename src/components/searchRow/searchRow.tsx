import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FONT_SIZE, ICON_SIZE, IOS } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, ELEVATION, SPACING } from "../../themes/helpers";
import { Image } from "../image/image";

export interface Props {
  item: any;
  onPress(item: any): void;
}

export const SearchRow: React.FC<Props> = ({ item, onPress }) => {
  const onItemPressed = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onItemPressed}>
      <Image
        style={styles.image}
        loaderType={"ActivityIndicator"}
        source={{ uri: item?.thumbnail_url }}
      />

      <View
        style={[
          styles.detailsWrapper,
          item?.message && styles.detailsWrapperMessage,
        ]}
      >
        {item?.message && <Text style={styles.message}>{item?.message}</Text>}
        <Text
          numberOfLines={2}
          style={[styles.name, item?.message && styles.ceoName]}
        >
          {item?.title}
        </Text>
        <Text numberOfLines={2} style={styles.designation}>
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

SearchRow.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: responsiveWidth(95),

    flexDirection: "row",
    marginHorizontal: SPACING.small,
    marginVertical: SPACING.extraSmall,
    ...ELEVATION,
    ...BORDERRADIUS,
    height: ICON_SIZE.x3Large,
    ...(!IOS ? { overflow: "hidden" } : null),
  },

  messageContainer: {
    flex: 1,

    width: responsiveWidth(95),

    flexDirection: "row",
    marginHorizontal: SPACING.small,
    marginVertical: SPACING.medium,

    ...(!IOS ? { overflow: "hidden" } : null),
  },

  image: {
    height: ICON_SIZE.x3Large,
    width: responsiveWidth(25),
    ...BORDERRADIUS,
    overflow: "hidden",
  },
  detailsWrapper: {
    flex: 1,
    padding: SPACING.small,
  },
  detailsWrapperMessage: {
    alignItems: "flex-end",
  },
  name: {
    color: Colors.darkText,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.medium,
  },
  designation: {
    color: Colors.lightText,
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.small,
  },
  message: {
    color: Colors.lightText,
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.medium,
    width: "90%",
    alignSelf: "center",
  },
  ceoName: {
    marginTop: SPACING.medium,
  },
});
