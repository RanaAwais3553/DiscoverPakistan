import Fontisto from "@expo/vector-icons/Fontisto";
import Zocial from "@expo/vector-icons/Zocial";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { DiscoverPakistanBarIcon } from "../../assets/svg";
import { AvoideKeyBoard } from "../../components/avoideKeyBoard/avoideKeyBoard";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import { Loader } from "../../components/loader/loader";
import { Modal } from "../../components/modal/modal";
import { Separator } from "../../components/separator/separator";
import { SocialAuth } from "../../components/socialAuth/socialAuth";
import { Text } from "../../components/text/text";
import { TextInput } from "../../components/textInput/textInput";
import { FONT_SIZE, ICON_SIZE, IOS, PlaceHolders } from "../../constants";
import { UserActions } from "../../constants/actionNames";
import { ROUTE } from "../../navigation/routeNames";
import { Colors, Fonts } from "../../themes";
import {
  LISTIPADDINGBOTTOM,
  SPACING,
  STATUSBARHEIGHT,
} from "../../themes/helpers";
import { validateEmail } from "../../utilities";
import { ForgotPassword } from "../forgotPassword/forgotPassword";

export const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state?.user?.signIn);

  const [loader, setloader] = useState(false);
  //raozubair1441@gmail.com
  //14ot2v3k1980
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  const enableButton = () => {
    return (
      email.replace(/^\s+|\s+$/g, "") === "" ||
      password.replace(/^\s+|\s+$/g, "") === ""
    );
  };

  const closeModal = () => {
    setmodalVisible(false);
  };
  const onSignUpPressed = () => {
    navigation.navigate(ROUTE.SignUp);
  };
  const onForgotPressed = () => {
    setmodalVisible(true);
  };

  const onSignInPressed = () => {
    if (email.replace(/^\s+|\s+$/g, "") === "") {
      alert("Enter Email");
      return;
    } else if (!validateEmail(email)) {
      alert("You have entered an invalid email address!");
      return;
    }

    if (password.replace(/^\s+|\s+$/g, "") === "") {
      alert("Enter Password");
      return;
    }

    let data = {
      email: email,
      password: password,
    };
    dispatch(UserActions.signInRequest(data));
  };

  const onPasswordReset = (email) => {
    dispatch(UserActions.resetPasswordRequest(email));
  };
  const socialLoginResponse = (response) => {
    let payload = {
      email: response.email || response?.id + "@facebook.com",
      password: response?.id,
    };
    dispatch(UserActions.signInRequest(payload));
  };
  return (
    <View style={styles.container}>
      <Loader fullScreen loading={signIn?.loading} />
      <Separator style={styles.separator} />
      <Header hideElevation onBackPress={navigation.goBack} />

      <AvoideKeyBoard>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View style={styles.inScroll}>
            <DiscoverPakistanBarIcon height={responsiveHeight(7)} />
            <View style={styles.textWrapper}>
              <Text style={styles.helloText}>Hello</Text>
              <Text style={styles.headText}>Sign in to your account</Text>
            </View>

            <TextInput
              leftComponent={
                <Zocial
                  name="email"
                  color={Colors.lightIcon}
                  size={ICON_SIZE.small}
                />
              }
              placeholder={PlaceHolders.email}
              keyboardType={"email-address"}
              onChangeText={setemail}
              value={email}
            />

            <TextInput
              secureTextEntry
              leftComponent={
                <Fontisto
                  name="locked"
                  color={Colors.lightIcon}
                  size={ICON_SIZE.small}
                />
              }
              rightIcon
              containerStyle={styles.textInput}
              placeholder={PlaceHolders.password}
              showEye
              onChangeText={setpassword}
              value={password}
            />

            <Text style={styles.forgotPassword} onPress={onForgotPressed}>
              Forgot Your Password?
            </Text>

            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              disabled={enableButton()}
              title={"Sign IN"}
              onPress={onSignInPressed}
            />

            <SocialAuth responseBack={socialLoginResponse} />
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.bottomTextLeft}>Don't have an account?</Text>
            <Text onPress={onSignUpPressed} style={styles.bottomTextRight}>
              Sign Up
            </Text>
          </View>
        </ScrollView>
      </AvoideKeyBoard>

      <Modal visible={modalVisible} closeModal={closeModal}>
        <ForgotPassword onSubmit={onPasswordReset} closeModal={closeModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...STATUSBARHEIGHT,
    flex: 1,
    backgroundColor: Colors.primary,
  },
  inScroll: {
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.large,
    height: responsiveHeight(75),
    justifyContent: "space-between",
    ...LISTIPADDINGBOTTOM,
  },
  separator: {
    backgroundColor: Colors.primaryButton,
    height: responsiveHeight(3),
  },
  textWrapper: {
    alignSelf: "flex-start",
    marginVertical: SPACING.medium,
  },
  helloText: {
    fontSize: responsiveFontSize(6),
    fontFamily: Fonts.bold,
    color: Colors.darkText,
  },
  headText: {
    fontSize: FONT_SIZE.large,
    color: Colors.lightText,
  },
  textInput: {
    marginTop: SPACING.medium,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: Colors.lightText,
    fontSize: FONT_SIZE.large,
    paddingVertical: SPACING.medium,
  },
  button: {
    marginTop: SPACING.medium,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    fontSize: FONT_SIZE.x3Large,
    textTransform: "uppercase",
  },

  bottomText: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: IOS ? SPACING.medium : SPACING.large,
  },
  bottomTextLeft: {
    alignSelf: "center",
    justifyContent: "center",
    color: Colors.lightText,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.medium,
    marginLeft: SPACING.small,
  },
  bottomTextRight: {
    color: Colors.primaryButton,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x1Large,
    alignSelf: "center",
    marginLeft: SPACING.small,
  },
});
