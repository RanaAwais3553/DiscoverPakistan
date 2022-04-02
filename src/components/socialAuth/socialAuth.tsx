import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Facebook from "expo-facebook";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { FONT_SIZE, ICON_SIZE, IOS, SOCIAL_LOGIN } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { ROW, SPACING } from "../../themes/helpers";
import * as AppAuth from "expo-app-auth";
import * as GoogleSignIn from "expo-google-sign-in";

import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

// import * as Google from "expo-auth-session/providers/google";
import * as Google from "expo-google-app-auth";
const { URLSchemes } = AppAuth;

export interface Props {
  type: "Login" | "SignUp" | "orderSuccessful";
  responseBack(obj: any): void;
}

export const SocialAuth: React.FC<Props> = ({ type, responseBack }) => {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  //   iosClientId: SOCIAL_LOGIN.GOOGLE_IOS,
  //   androidClientId: SOCIAL_LOGIN.GOOGLE_ANDROID,
  //   scopes: ["profile", "email"],
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     alert(JSON.stringify(authentication, null, 8));
  //   }
  // }, [response]);

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    alert(JSON.stringify(user, null, 8));
  };

  const onLoginWithGoogle = async () => {
    // promptAsync();
    // return;
    //TODO: 1

    try {
      const result = await Google.logInAsync({
        iosClientId: SOCIAL_LOGIN.GOOGLE_IOS,
        androidClientId: SOCIAL_LOGIN.GOOGLE_ANDROID,
        androidStandaloneAppClientId:
          "388807787471-db03a31n4rl1o8bseiptvoo4npgs7qm6.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        behavior: "web",
      });
      if (result.type === "success") {
        let obj = {
          id: result?.user?.id,
          user_id: result?.user?.id,
          image_url: result?.user?.photoUrl,
          email: result?.user?.email,
          name: result?.user?.name,
        };
        responseBack(obj);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  const onLoginWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      alert(JSON.stringify({   

        image_url: credential.user,
        email: credential.email,
        name: credential.fullName,},null,8))   
      return
      //run it
      if (credential) {
        
        if (!credential?.email) {
          alert("Please allow your email address");
          return;
        }

        let obj = {
          id: credential.identityToken,
          user_id: credential.identityToken,
          image_url: credential.user,
          email: credential.email,
          name: credential.fullName,
        };

        responseBack(obj);
      }
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
      } else {
        alert("oops something went wrong!");
      }
    }
  };
  const onLoginWithFaceBook = async () => {
    const { type, token, expires, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,email,picture.type(large)`,
      );

      const result = await response.json();

      let obj = {
        id: result?.id,
        user_id: result?.id,
        image_url: result?.picture?.data?.url,
        email: result?.email,
        name: result?.name,
      };

      responseBack(obj);
    }
  };

  useEffect(() => {
    GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: SOCIAL_LOGIN.GOOGLE_IOS,
    });

    Facebook.initializeAsync({
      appId: SOCIAL_LOGIN.FACEBOOK,
      appName: "Discover Pakistan",
    });
  }, []);
  return (
    <View style={styles.container}>
      {type !== "orderSuccessful" && (
        <Text style={[styles.title, type === "SignUp" && styles.signUpTitle]}>
          {type === "Login"
            ? "Login with account"
            : "or create account using social media"}
        </Text>
      )}
      <View style={styles.iconWrapper}>
        {/* {type !== "orderSuccessful" ||
          (IOS && (
            <TouchableOpacity
              style={[styles.iconStyle, styles.apple]}
              onPress={onLoginWithApple}
            >
              <AntDesign
                name="apple1"
                color={Colors.white}
                size={ICON_SIZE.large - responsiveFontSize(0.5)}
              />
            </TouchableOpacity>
          ))}
         */}

        {type === "orderSuccessful"
          ? null
          : IOS && (
              <TouchableOpacity
                style={[styles.iconStyle, styles.apple]}
                onPress={onLoginWithApple}
              >
                <AntDesign
                  name="apple1"
                  color={Colors.white}
                  size={ICON_SIZE.large - responsiveFontSize(0.5)}
                />
              </TouchableOpacity>
            )}

        <TouchableOpacity
          disabled={type === "orderSuccessful"}
          onPress={onLoginWithFaceBook}
        >
          <FontAwesome5
            name="facebook"
            color={Colors.faceBook}
            style={styles.iconStyle}
            size={ICON_SIZE.xLarge}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLoginWithGoogle}
          disabled={type === "orderSuccessful"}
        >
          <Entypo
            name="google--with-circle"
            color={Colors.google}
            style={styles.iconStyle}
            size={ICON_SIZE.xLarge}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

SocialAuth.defaultProps = {
  type: "Login",
};

// styles
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZE.x2Large,
    alignSelf: "center",
    fontFamily: Fonts.bold,
    marginTop: SPACING.xLarge,
    marginBottom: SPACING.medium,
  },
  signUpTitle: {
    fontSize: FONT_SIZE.medium,
    alignSelf: "center",
    fontFamily: Fonts.regular,
    marginTop: 0,
    marginBottom: SPACING.medium,
  },
  iconWrapper: {
    ...ROW,
  },
  iconStyle: {
    marginHorizontal: SPACING.extraSmall,
  },
  apple: {
    borderRadius: ICON_SIZE.xLarge / 2,
    height: ICON_SIZE.xLarge,
    width: ICON_SIZE.xLarge,
    backgroundColor: Colors.apple,
    alignItems: "center",
    justifyContent: "center",
  },
});
