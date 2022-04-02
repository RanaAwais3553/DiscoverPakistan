import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Button from "../../components/button/button";
import { TextInput } from "../../components/textInput/textInput";

import { FONT_SIZE, ICON_SIZE, PlaceHolders } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, SPACING } from "../../themes/helpers";
import { useSelector } from "react-redux";
import { Loader } from "../../components/loader/loader";
import { responsiveHeight } from "react-native-responsive-dimensions";

export interface Props {
  closeModal(): void;
  onSubmit(): void;
}

export const ForgotPassword: React.FC<Props> = ({ closeModal, onSubmit }) => {
  const resetPassword = useSelector((state) => state?.user?.resetPassword);

  const [text, settext] = useState("");
  const onResetPassword = () => {
    onSubmit(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButtonView} onPress={closeModal}>
        <AntDesign
          name="close"
          size={ICON_SIZE.medium}
          color={Colors.darkIcon}
        />
      </TouchableOpacity>

      <Text style={styles.text}>Forgot Password</Text>

      <TextInput
        placeholder={PlaceHolders.email}
        keyboardType={"email-address"}
        onChangeText={settext}
        value={text}
      />

      {resetPassword?.loading ? (
        <Loader style={[styles.button, styles.loader]} loading={true} />
      ) : (
        <Button
          title={"Reset Password"}
          disabled={text === ""}
          onPress={onResetPassword}
          loading={true}
          style={styles.button}
        />
      )}
    </View>
  );
};

ForgotPassword.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: SPACING.large,
    margin: SPACING.small,

    ...BORDERRADIUS,
  },

  text: {
    color: Colors.darkText,
    fontSize: FONT_SIZE.x1Large,
    fontFamily: Fonts.bold,
    marginVertical: SPACING.medium,
    alignSelf: "center",
  },

  button: {
    backgroundColor: Colors.primaryButton,
    paddingHorizontal: SPACING.medium,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: SPACING.large,
  },

  closeButtonView: {
    position: "absolute",
    top: SPACING.small,
    right: SPACING.small,
    zIndex: 1,
  },

  loader: {
    paddingHorizontal: SPACING.medium,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: SPACING.large,
    flex: 0,
    backgroundColor: Colors.white,
    height: responsiveHeight(7),
  },
});
