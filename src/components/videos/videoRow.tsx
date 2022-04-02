import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { ICON_SIZE, IOS } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, ELEVATION, SPACING } from "../../themes/helpers";
import { Image } from "../image/image";

export interface Props {
  item: any;
  onPress(item: any): void;
}

export const VideoRow: React.FC<Props> = React.memo(({ item, onPress }) => {
  const onItemPressed = () => {
    onPress(item);
  };
// console.log("video item in VideoRow Component is:!...",item?.video_views)
  return (
    <TouchableOpacity style={styles.container} onPress={onItemPressed}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.videoImage}
          loaderType={"ActivityIndicator"}
          source={{ uri: item?.img }}
        />
        <View style={styles.playIcon}>
          <Entypo
            name="controller-play"
            color={Colors.white}
            size={ICON_SIZE.large}
          />
        </View>
      </View>

      <View style={styles.detailsWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {item?.title || item?.name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item?.meta_description || item?.description}
        </Text>

        {item?.repeat && (
          <Text numberOfLines={1} style={styles.views}>
            {item?.time}
          </Text>
        )}

        {item?.repeat ? (
          <Text numberOfLines={1} style={styles.views}>
            {item?.repeat}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.views}>{`${
            item?.video_views || 0
          } views | ${item?.release}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
});
VideoRow.defaultProps = {};

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
    height: ICON_SIZE.x4Large,
    ...(!IOS ? { overflow: "hidden" } : null),
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    position: "absolute",
    height: ICON_SIZE.xLarge,
    width: ICON_SIZE.xLarge,
    backgroundColor: "rgba(25, 178, 75, 0.4)",
    borderRadius: ICON_SIZE.xLarge / 2,
    overflow: "hidden",
    paddingLeft: SPACING.extraSmall,
    alignItems: "center",
    justifyContent: "center",
  },

  videoImage: {
    height: "100%",
    width: responsiveWidth(38),
    ...BORDERRADIUS,
    overflow: "hidden",
  },
  detailsWrapper: {
    flex: 1,
    justifyContent: "space-between",
    padding: SPACING.small,
  },
  title: {
    color: Colors.darkText,
    fontFamily: Fonts.bold,
  },
  description: {
    color: Colors.darkText,
    fontFamily: Fonts.regular,
  },
  views: {
    color: Colors.lightText,

    fontFamily: Fonts.light,
  },
});
