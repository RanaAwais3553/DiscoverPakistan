import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ICON_SIZE } from "../../constants";
import { Colors } from "../../themes";
import { Image } from "../image/image";

export interface Props {
  image: ImageSourcePropType;
  getImage?(): void;
}

export const UploadProile: React.FC<Props> = ({ image, getImage }) => {
  return (
    <View style={styles.container}>
      {!image?.uri ? (
        <View style={styles.imageView}>
          <FontAwesome
            name="user"
            color={Colors.dimLightIcon}
            size={ICON_SIZE.x2Large}
          />
        </View>
      ) : (
        <Image
          source={image}
          circular
          size={ICON_SIZE.x4Large}
          style={styles.imageView}
        />
      )}

      <TouchableOpacity style={styles.plus} onPress={getImage}>
        <Entypo
          name="circle-with-plus"
          color={Colors.primaryButton}
          size={ICON_SIZE.xLarge}
        />
      </TouchableOpacity>
    </View>
  );
};

UploadProile.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },

  imageView: {
    height: ICON_SIZE.x4Large,
    width: ICON_SIZE.x4Large,
    borderRadius: ICON_SIZE.x4Large,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightText,
  },

  plus: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});
