import React from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { Image } from "../image/image";
import { Text } from "../text/text";

export interface Props {
  title: string;
  backgroundImage: ImageSourcePropType;
  tagImage: ImageSourcePropType;
}

export const TopImage: React.FC<Props> = ({
  title,
  backgroundImage,
  tagImage,
}) => {
  return (
    <ImageBackground style={styles.topImageWrapper} source={backgroundImage}>
      <Image
        style={styles.topImage}
        placeHolderType={"User"}
        loaderType={"ActivityIndicator"}
        source={tagImage}
      />
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </ImageBackground>
  );
};

TopImage.defaultProps = {};

// styles
const styles = StyleSheet.create({
  topImageWrapper: {
    height: responsiveHeight(20),
    width: "100%",
    justifyContent: "center",
  },

  topImage: {
    height: ICON_SIZE.medium,
    width: responsiveWidth(30),
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.large,
    marginTop: SPACING.small,
  },
});
