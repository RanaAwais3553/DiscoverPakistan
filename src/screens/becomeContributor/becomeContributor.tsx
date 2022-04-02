import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../../assets/images";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { ROUTE } from "../../navigation/routeNames";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, SPACING } from "../../themes/helpers";

export const BecomeContributor = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate(ROUTE.Home);
  };

  const onGoNext = () => {
    navigation.navigate(ROUTE.UploadContent);
  };
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />

      <ImageBackground
        style={styles.imageContainer}
        source={Images.becomeContributor}
      >
        
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  surface: {
    backgroundColor: Colors.primary,
    padding: SPACING.medium,
    width: "90%",
    ...BORDERRADIUS,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x2Large,
    marginBottom: SPACING.medium,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.large,
    marginBottom: SPACING.medium,
  },
  underLinedText: {
    fontFamily: Fonts.regular,
    color: Colors.primaryButton,
    fontSize: FONT_SIZE.large,

    textDecorationLine: "underline",
  },
  uloadButton: {
    backgroundColor: Colors.primaryButton,
    paddingHorizontal: SPACING.small,
    marginVertical: SPACING.xLarge,
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  uloadButtonText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginVertical: SPACING.small,
    fontSize: FONT_SIZE.x1Large,
    alignSelf: "center",
    textTransform: "uppercase",

    textAlign: "center",
    flex: 1,
  },

  goToText: {
    fontFamily: Fonts.bold,
    color: Colors.primaryButton,
    fontSize: FONT_SIZE.large,
    marginBottom: SPACING.medium,
    alignSelf: "center",
    textTransform: "capitalize",
  },
});
