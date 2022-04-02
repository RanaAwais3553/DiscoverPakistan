import { FontAwesome5, Foundation, Ionicons } from "@expo/vector-icons";
import React,{useState} from "react";
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import WebView from "react-native-webview";
import { Images } from "../../assets/images";
import { AvoideKeyBoard } from "../../components/avoideKeyBoard/avoideKeyBoard";
import Button from "../../components/button/button";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { MultiLineTextInput } from "../../components/multiLineTextInput/multiLineTextInput";
import { TextInput } from "../../components/textInput/textInput";
import { FONT_SIZE, ICON_SIZE, PlaceHolders } from "../../constants";
import { Colors, Fonts } from "../../themes";
import {
  BORDERRADIUS,
  ELEVATION,
  LISTIPADDINGBOTTOM,
  SPACING,
} from "../../themes/helpers";

export const ContactUs = ({ navigation }) => {
const [fullname , setFullName] = useState("")
const [email , setEmail] = useState("")
const [phone , setPhone] = useState("")
const [multilineText , setmultilineText] = useState("")
const [subject , setSubject] = useState("")
  const row = (icon, text, onPress, lastRow) => {
    return (
      <TouchableOpacity
        disabled={!onPress}
        style={[styles.row, lastRow && styles.address]}
        onPress={onPress}
      >
        {icon}

        <Text style={styles.rowText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const onWebSitePressed = () => {
    let url = "https://www.discoverPakistan.tv";

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(url);
      })
      .catch((err) => console.error("An error occurred", err));
  };
  const onEmailPressed = () => {
    let url = "mailto: info@discoverpakistan.tv";

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(url);
      })
      .catch((err) => console.error("An error occurred", err));
  };
  const onPhonePressed = () => {
    let url = "tel: +92 (042) 35975008";

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(url);
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const onAddressPressed = () => {
    try {
      let geo = "31.494797, 74.351770";

      let url = `https://www.google.com/maps/search/?api=1&query=${geo}`;

      // latitude: 31.596468,
      // longitude: 71.75174,

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />

      <AvoideKeyBoard>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={LISTIPADDINGBOTTOM}
        >
          <ImageBackground
            style={styles.contactUsImageWrapper}
            source={Images.contactUsBackground}
          />

          <Text style={styles.heading}>Contact Info</Text>

          <View style={styles.surface}>
            {row(
              <Ionicons
                style={styles.icon}
                name="globe"
                color={Colors.lightIcon}
                size={ICON_SIZE.medium}
              />,
              "www.discoverPakistan.tv",
              onWebSitePressed,
              false,
            )}

            {row(
              <Ionicons
                style={styles.icon}
                name="globe"
                color={Colors.lightIcon}
                size={ICON_SIZE.medium}
              />,
              "info@discoverpakistan.tv",
              onEmailPressed,
              false,
            )}

            {row(
              <Foundation
                style={styles.icon}
                name="telephone"
                color={Colors.lightIcon}
                size={ICON_SIZE.large}
              />,
              "+92 (042) 35975008",
              onPhonePressed,
              false,
            )}

            {row(
              <FontAwesome5
                style={styles.icon}
                name="home"
                color={Colors.lightIcon}
                size={ICON_SIZE.medium}
              />,
              `DISCOVER PAKISTAN 
PAF Falcon Complex
Gulberg |||, Lahore, Pakistan`,
              onAddressPressed,
              true,
            )}
          </View>

          <Text style={styles.heading}>Get in touch</Text>

          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder={PlaceHolders.fullName}
              keyboardType={"default"}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={(text) =>  setFullName(text)  }
              value={fullname}             />
            <TextInput
              placeholder={PlaceHolders.email}
              keyboardType={"email-address"}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              placeholder={PlaceHolders.telephoneNumber}
              keyboardType={"name-phone-pad"}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={(text) => setPhone(text)}
              value={phone}
            />
            <TextInput
              placeholder={PlaceHolders.subject}
              keyboardType={"default"}
              placeholderTextColor={Colors.lightText}
              containerStyle={styles.textInput}
              onChangeText={(text) => setSubject(text)}
              value={subject}
            />

            <MultiLineTextInput
              style={styles.multiLine}
              maxLength={500}
              onChangeText={(text) => setmultilineText(text)}
              placeholder={"Enter here..."}
              value={multilineText}
              placeholderTextColor={Colors.placeHolder}
            />
          </View>

          <Button style={styles.button} onPress={() => {}} title={"Send"} />

          <WebView
            style={styles.webView}
            source={{
              html: `<iframe
                 src="https://www.google.com/maps/place/AFOHS+Club+Falcon+Complex/@31.4769203,74.29007,13z/data=!4m19!1m13!4m12!1m4!2m2!1d74.2934383!2d31.4523157!4e1!1m6!1m2!1s0x391904367d01d2c1:0x2baafe6e4adbd8a9!2sfalcon+club!2m2!1d74.352183!2d31.4945731!3m4!1s0x391904367d01d2c1:0x2baafe6e4adbd8a9!8m2!3d31.4945731!4d74.352183"
                 width="100%"
                 height="100%"
                 frameborder="0"
                 style="border:0">
                 </iframe>`,
            }}
          />
        </ScrollView>
      </AvoideKeyBoard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  contactUsImageWrapper: {
    height: responsiveHeight(20),
    width: "100%",
    justifyContent: "center",
  },
  heading: {
    fontSize: FONT_SIZE.x3Large,
    fontFamily: Fonts.bold,
    alignSelf: "center",
    marginVertical: SPACING.large,
  },
  surface: {
    ...ELEVATION,
    ...BORDERRADIUS,

    width: responsiveWidth(90),
    alignSelf: "center",
    padding: SPACING.medium,
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.small,
  },
  address: {
    alignItems: "flex-start",
  },
  icon: {
    paddingHorizontal: SPACING.small,
  },
  rowText: {
    fontSize: FONT_SIZE.x1Large,
    fontFamily: Fonts.bold,
    alignSelf: "center",
    flex: 1,
  },
  textInputWrapper: {
    width: "90%",
    alignSelf: "center",
  },
  textInput: {
    marginBottom: SPACING.medium,
  },
  button: {
    alignSelf: "center",
    width: responsiveWidth(40),
    marginVertical: SPACING.small,
  },
  multiLine: { marginBottom: SPACING.x2Large },
  webView: {
    height: responsiveHeight(30),
    width: responsiveWidth(100),
    marginVertical: SPACING.medium,
  },
});
