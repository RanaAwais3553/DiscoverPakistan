import { FontAwesome, Fontisto, Zocial } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { AvoideKeyBoard } from "../../components/avoideKeyBoard/avoideKeyBoard";
import Button from "../../components/button/button";
import CheckBox from "../../components/checkBox/checkBox";
import Header from "../../components/header/header";
import { Loader } from "../../components/loader/loader";
import { Separator } from "../../components/separator/separator";
import { SocialAuth } from "../../components/socialAuth/socialAuth";
import { TextInput } from "../../components/textInput/textInput";
import { UploadProile } from "../../components/uploadProile/uploadProile";
import {
  FONT_SIZE,
  ICON_SIZE,
  isEmptyObject,
  PlaceHolders,
} from "../../constants";
import { UserActions } from "../../constants/actionNames";
import { Colors, Fonts } from "../../themes";
import { SPACING, STATUSBARHEIGHT } from "../../themes/helpers";
import { getImage, validateEmail } from "../../utilities";

export const SignUp = ({ navigation }) => {
  const signUp = useSelector((state) => state?.user?.signUp);
  const user = useSelector((state) => state?.user?.user);
  const updateProfile = useSelector((state) => state?.user?.updateProfile);
  const getUserDetails = useSelector((state) => state?.user?.getUserDetails);

  const dispatch = useDispatch();

  const [loader, setloader] = useState(false);
  const [image, setimage] = useState(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [acceptedTerms, setacceptedTerms] = useState(false);

  const enableButton = () => {
    return (
      name?.replace(/^\s+|\s+$/g, "") === "" ||
      email?.replace(/^\s+|\s+$/g, "") === "" ||
      password?.replace(/^\s+|\s+$/g, "") === "" ||
      confirmPassword?.replace(/^\s+|\s+$/g, "") === "" ||
      password !== confirmPassword
    );
  };
  const onSignUpButtonPressed = () => {
    if (name.replace(/^\s+|\s+$/g, "") === "") {
      alert("Enter Full Name");
      return;
    }

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

    if (confirmPassword.replace(/^\s+|\s+$/g, "") === "") {
      alert("Enter Confirm Password");
      return;
    }

    if (
      confirmPassword.replace(/^\s+|\s+$/g, "") !==
      password.replace(/^\s+|\s+$/g, "")
    ) {
      alert("Confirm Password Doesn't Match Full Name");
      return;
    }

    if (!acceptedTerms) {
      alert("Kindly Accept All Terms And Conditions");
      return;
    }

    let payload = {
      name: name.replace(/^\s+|\s+$/g, ""),
      email: email.replace(/^\s+|\s+$/g, ""),
      password: password.replace(/^\s+|\s+$/g, ""),
    };

    dispatch(UserActions.signUpRequest(payload));
  };

  const onCheckBoxPressed = () => {
    setacceptedTerms((p) => !p);
  };

  const onSignUpResponse = (response) => {
    /*

                               [
                                        "id",
                                        "4583313565054913"
                                ],
                                [
                                        "user_id",
                                        "4583313565054913"
                                ],
                                [
                                        "image_url",
                                        "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4583313565054913&height=200&width=200&ext=1641667668&hash=AeSsmdLbLtGQZFawFl8"
                                ],
                                [
                                        "email",
                                        null
                                ],
                                [
                                        "name",
                                        "Shahzeb Aslam"
                                ]
                        ]
*/
    let payload = {
      name: response?.name,
      email: response.email || response?.id + "@facebook.com",
      password: response?.id,
    };

    dispatch(UserActions.signUpRequest(payload));

    // setTimeout(() => {
    //   navigation.navigate(ROUTE.Home);
    // }, 1);
  };
  useEffect(() => {
    if (!isEmptyObject(user)) {
      setname(user?.name);
      setemail(user?.email);
      setimage({ uri: user?.image_url });
    }
  }, []);
  const onUpdateProfile = () => {
    if (name.replace(/^\s+|\s+$/g, "") === "") {
      alert("Enter Full Name");
      return;
    }

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

    if (confirmPassword.replace(/^\s+|\s+$/g, "") === "") {
      alert("Enter Confirm Password");
      return;
    }

    if (
      confirmPassword.replace(/^\s+|\s+$/g, "") !==
      password.replace(/^\s+|\s+$/g, "")
    ) {
      alert("Confirm Password Doesn't Match Full Name");
      return;
    }

    let payload = {
      id: user?.user_id,
      name: name?.replace(/^\s+|\s+$/g, ""),
      email: email.replace(/^\s+|\s+$/g, ""),
      password: password.replace(/^\s+|\s+$/g, ""),
      password_confirmation: confirmPassword.replace(/^\s+|\s+$/g, ""),
      photo: image,
    };

    dispatch(UserActions.updateProfileRequest(payload, onUpdateSuccess));
  };

  const onUpdateSuccess = () => {
    let payload = {
      id: user?.user_id,
    };

    dispatch(UserActions.getUserDetailsRequest(payload));
  };

  const getUserImage = async () => {
    let response = await getImage();
    if (response.success) {
      let result = response?.imageData;

      result["type"] = "*/*";
      delete result["cancelled"];
      let tempArray = result.uri.split("/");
      result["name"] = tempArray[tempArray.length - 1];

      setimage(result);
    }
  };

  return (
    <View style={styles.container}>
      <Loader
        fullScreen
        loading={
          signUp?.loading || updateProfile?.loading || getUserDetails.loading
        }
      />
      <Separator style={styles.separator} />
      <Header hideElevation onBackPress={navigation.goBack} />
      <AvoideKeyBoard>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View style={styles.inScroll}>
            <UploadProile getImage={getUserImage} image={image} />

            <TextInput
              leftComponent={
                <FontAwesome
                  name="user"
                  color={Colors.lightIcon}
                  size={ICON_SIZE.small}
                />
              }
              containerStyle={styles.textInput}
              placeholder={PlaceHolders.fullName}
              keyboardType={"name-phone-pad"}
              onChangeText={setname}
              value={name}
            />
            <TextInput
              leftComponent={
                <Zocial
                  name="email"
                  color={Colors.lightIcon}
                  size={ICON_SIZE.small}
                />
              }
              containerStyle={styles.textInput}
              placeholder={PlaceHolders.email}
              keyboardType={"email-address"}
              onChangeText={setemail}
              value={email}
            />
            <TextInput
              leftComponent={
                <Fontisto
                  name="locked"
                  color={Colors.lightIcon}
                  size={ICON_SIZE.small}
                />
              }
              containerStyle={styles.textInput}
              placeholder={PlaceHolders.password}
              showEye
              onChangeText={setpassword}
              value={password}
            />

            <TextInput
              leftComponent={
                <Fontisto
                  name="locked"
                  color={Colors.lightIcon}
                  size={ICON_SIZE.small}
                />
              }
              containerStyle={styles.textInput}
              placeholder={PlaceHolders.confirmPassword}
              showEye
              onChangeText={setconfirmPassword}
              value={confirmPassword}
            />
            {isEmptyObject(user) && (
              <CheckBox
                onPress={onCheckBoxPressed}
                text={"I accept all terms and conditions"}
              />
            )}

            <Button
              style={[styles.button, styles.updateButton]}
              textStyle={styles.buttonText}
              title={!isEmptyObject(user) ? "Update" : "Sign Up"}
              disabled={
                enableButton() || !isEmptyObject(user)
                  ? false
                  : acceptedTerms === false
              }
              onPress={
                !isEmptyObject(user) ? onUpdateProfile : onSignUpButtonPressed
              }
            />

            {isEmptyObject(user) && (
              <SocialAuth responseBack={onSignUpResponse} type={"SignUp"} />
            )}
          </View>
        </ScrollView>
      </AvoideKeyBoard>
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

    justifyContent: "space-between",
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
    marginTop: SPACING.extraSmall,
    alignSelf: "center",
    width: "50%",
  },
  updateButton: {
    marginTop: SPACING.x4Large,
  },
  buttonText: {
    fontSize: FONT_SIZE.x3Large,
    textTransform: "uppercase",
  },
});
