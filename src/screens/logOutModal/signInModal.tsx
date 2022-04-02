import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SignInIcon, SignUpIcon } from "../../assets/svg";
import { ROUTE } from "../../navigation/routeNames";
import { Colors, Fonts } from "../../themes";
import { ELEVATION, SPACING } from "../../themes/helpers";

export interface Props {
  navigation: any;
}

export const SignInModal: React.FC<Props> = ({ navigation }) => {
  const button = (Icon, title, onPress) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon />
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const onSignInPressed = () => {
    navigation.navigate(ROUTE.SignIn);
  };

  const onSignUpPressed = () => {
    navigation.navigate(ROUTE.SignUp);
  };
  return (
    <View style={styles.container}>
      {button(SignInIcon, "Sign In", onSignInPressed)}
      {button(SignUpIcon, "Sign Up", onSignUpPressed)}
    </View>
  );
};

SignInModal.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    top: SPACING.x2Large - 5,

    width: responsiveWidth(30),

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightText,
    position: "absolute",
    zIndex: 1,
    ...ELEVATION,
  },
  button: {
    zIndex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: responsiveHeight(1),
    borderBottomColor: "gray",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    paddingHorizontal: "10%",
    paddingVertical: SPACING.small,
  },
  buttonText: {
    marginLeft: SPACING.small,

    fontFamily: Fonts.bold,
    color: Colors.darkText,
  },
});
