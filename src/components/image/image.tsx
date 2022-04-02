import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image as RNImage,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Colors } from "../../themes";
import { makeUrl } from "../../utilities";

export interface Props extends ImageProps {
  style: StyleProp<ImageStyle>;
  imageStyle: StyleProp<ImageStyle>;
  size: number;
  circular: boolean;
  resizeMode: "stretch" | "contain" | "cover";
  resizemethod: "scale";
  source: ImageSourcePropType;
  placeHolderType: "Car" | "User" | "Default";
  loaderType: "SkeletonPlaceholder" | "ActivityIndicator" | "None";
}

let placeHolderUser =
  "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";

let placeHoldersimple =
  "https://www.charityauctionstoday.com/p/wp-content/uploads/2019/04/placeholder.png";

let placeHolderVehicle =
  "https://www.pikeandbambridge.co.uk/uploads/cap/car-placeholder.png";

export const Image: React.FC<Props> = ({
  circular,
  size,
  resizeMode,
  resizeMethod,
  style,
  imageStyle,
  source,
  placeHolderType,
  loaderType,
  ...restProps
}) => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  const placeHolderUri =
    placeHolderType === "Car"
      ? placeHolderVehicle
      : placeHolderType === "User"
      ? placeHolderUser
      : placeHoldersimple;

  const onLoadStart = () => {
    setloading(true);
  };

  const onLoadEnd = () => {
    setloading(false);
  };

  const onError = () => {
    seterror(true);
  };

  useEffect(() => {}, []);

  const loader = (Stl) => {
    return loading ? (
      <ActivityIndicator
        style={[styles.loader, styles.imageStyle, Stl, { zIndex: -1 }]}
        size={responsiveFontSize(4)}
        color={Colors.loader}
      />
    ) : null;
  };

  const getUrl = () => {
    return error
      ? { uri: placeHolderUri, scale: 0.1 }
      : makeUrl(source, placeHolderUri);
  };

  return circular ? (
    <>
      <View
        style={[
          styles.imageStyle,
          style,
          circular
            ? {
                height: size,
                width: size,
                borderRadius: size / 2,
                overflow: "hidden",
              }
            : null,
        ]}
      >
        <RNImage
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
          resizeMethod={resizeMethod}
          resizeMode={resizeMode}
          source={getUrl()}
          style={[styles.imageStyle, imageStyle]}
          {...restProps}
        />
        {loading && loaderType !== "None" && loader()}
      </View>
    </>
  ) : (
    <>
      <RNImage
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        resizeMethod={resizeMethod}
        resizeMode={resizeMode}
        source={getUrl()}
        style={[styles.imageStyle, style]}
        {...restProps}
      />
      {loading && loaderType !== "None" && loader(style)}
    </>
  );
};

Image.defaultProps = {
  size: responsiveFontSize(5),
  circular: false,
  style: {
    height: "100%",
    width: "100%",
  },
  resizeMethod: "scale",
  resizeMode: "stretch",
  placeHolderType: "Default",
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
  },
});
