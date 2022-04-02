import React from "react";
import {
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FaceBook, Twitter, Youtube } from "../../assets/svg";
import {
  Discover_Pakistan_Social_Links,
  DrawerBottomText,
  FONT_SIZE,
  ICON_SIZE,
} from "../../constants";
import { Colors, Fonts } from "../../themes";
import { SPACING } from "../../themes/helpers";

export interface Props {
  style: StyleProp<ViewStyle>;
}

export const SocialButtons: React.FC<Props> = ({ style }) => {
  const socialIcons = (Icon, onPress) => {
    return (
      <TouchableOpacity style={styles.socialButton} onPress={onPress}>
        <Icon width={ICON_SIZE.large} height={ICON_SIZE.large} fill={"black"} />
      </TouchableOpacity>
    );
  };

  const onPressSicoalButton = async (url) => {
    let finalUrl = url;
    if (url === Discover_Pakistan_Social_Links.FaceBook) {
      finalUrl = `https://facebook.com/${url}`;
    } else if (url === Discover_Pakistan_Social_Links.Twiter) {
      finalUrl = `https://www.twitter.com/${url}`;
    } else if (url === Discover_Pakistan_Social_Links.FaceBook) {
      finalUrl = `https://youtube.com/c/${url}`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(supported ? url : finalUrl);
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const onFaceBookPress = () => {
    onPressSicoalButton(Discover_Pakistan_Social_Links.FaceBook);
  };

  const onTwitterPress = () => {
    onPressSicoalButton(Discover_Pakistan_Social_Links.Twiter);
  };

  const onYouTubePress = () => {
    onPressSicoalButton(Discover_Pakistan_Social_Links.youtube);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconWrapper}>
        {socialIcons(FaceBook, onFaceBookPress)}
        {socialIcons(Twitter, onTwitterPress)}
        {socialIcons(Youtube, onYouTubePress)}
      </View>

      <Text style={styles.bottomText}>{DrawerBottomText}</Text>
    </View>
  );
};

SocialButtons.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialButton: {
    paddingHorizontal: SPACING.medium,
  },
  bottomText: {
    fontSize: FONT_SIZE.extraSmall,
    fontFamily: Fonts.bold,
    marginTop: SPACING.medium,
    color: Colors.primaryButton,
  },
});
