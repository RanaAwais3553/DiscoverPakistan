import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";
import { Images } from "../../assets/images";
import { Image } from "../../components/image/image";
import { UserActions } from "../../constants/actionNames";
import ASYNC_VAR from "../../constants/asyncVariables";
import { Colors } from "../../themes";
import { getFromAsyncStorage } from "../../utilities";

export const Splash = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      verifyUser();
    }, 3700);
  }, []);

  const verifyUser = async () => {
    let getUser = await getFromAsyncStorage(ASYNC_VAR.USER);
    if (getUser.success && getUser.value) {
      getUser = JSON.parse(getUser.value);
      dispatch(UserActions.signInSuccess(getUser));
    } else {
      dispatch(UserActions.signInSuccess());
    }
  };
  return (
    <View style={styles.container}>
      <Image
        resizeMode={"stretch"}
        source={Images.SplashGif}
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  splashImage: {
    height: responsiveHeight(60),
    width: responsiveWidth(100),
  },
});
