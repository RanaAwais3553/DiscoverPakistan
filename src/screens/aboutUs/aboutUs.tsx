import React from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Images } from "../../assets/images";
import { Image } from "../../components/image/image";
import { AboutUsRow } from "../../components/aboutUsRow/aboutUsRow";
import { MainHeader } from "../../components/mainHeader/mainHeader";

import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { AboutUsData } from "../../constants/aboutUsData";
import { Colors, Fonts } from "../../themes";
import fonts from "../../themes/fonts";
import { LISTIPADDINGBOTTOM, SPACING } from "../../themes/helpers";
import { Heading } from "../../components/heading/heading";

export const AboutUs = ({ navigation }) => {
  const renderSectionItem = ({ item, index }) =>
    ![0,1,2].includes(index) && <AboutUsRow item={item} />;

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />
      <ImageBackground
        style={styles.aboutUsImageWrapper}
        source={Images.aboutUsBackground}
      >
        <Image
          style={styles.aboutUsImage}
          placeHolderType={"User"}
          loaderType={"ActivityIndicator"}
          source={Images.aboutUsTag}
        />
      </ImageBackground>

      <FlatList
        contentContainerStyle={LISTIPADDINGBOTTOM}
        ListHeaderComponent={
          <>
            <Heading text={"ABOUT DISCOVER PAKISTAN"} />
            <Text style={styles.description}>{AboutUsData[0].designation}</Text>
            <Heading text={"About the CEO / Chairman"} />
            <AboutUsRow item={AboutUsData[1]} />
            <Heading text={"About the Paresident"} />
            <AboutUsRow item={AboutUsData[2]} />
            <Heading text={"HONORARY ADVISORY BOARD"} />
          </>
        }
        showsVerticalScrollIndicator={false}
        data={AboutUsData}
        renderItem={renderSectionItem}
        // ListFooterComponent={
        //   <>
        //     <Heading text={"CEO MESSAGE"} />

        //     <AboutUsRow item={AboutUsData[AboutUsData.length - 1]} />
        //   </>
        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  aboutUsImageWrapper: {
    height: responsiveHeight(20),
    width: "100%",
    justifyContent: "center",
  },

  aboutUsImage: {
    height: ICON_SIZE.medium,
    width: responsiveWidth(30),
  },

  title: {
    color: Colors.primaryButton,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x2Large,
    textTransform: "uppercase",
    width: "95%",
    alignSelf: "center",
    marginVertical: SPACING.small,
  },
  messageTitle: {
    marginTop: SPACING.medium,
  },
  bullet: {
    backgroundColor: Colors.primaryButton,
    lineHeight: SPACING.large,
  },
  description: {
    color: Colors.lightText,
    fontFamily: fonts.regular,
    fontSize: FONT_SIZE.medium,
    width: "90%",
    alignSelf: "center",
    textAlign: "justify",
  },
});
