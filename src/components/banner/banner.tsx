import React from "react";
import { StyleSheet, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Images } from "../../assets/images";
import { Colors } from "../../themes";

// const IMAGES = [Banner1, Banner2, Banner3];

const IMAGES = [Images.Banner0, Images.Banner1, Images.Banner2];

export const Banner = (props) => {
  return (
    <View style={styles.container}>
      <SliderBox
        // ImageComponent={FastImage}
        images={IMAGES}
        sliderBoxHeight={responsiveHeight(8)}
        // onCurrentImagePressed={(index) =>ø
        //   console.warn(`image ${index} pressed`)
        // }
        dotColor={Colors.primaryButton}
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        // resizeMethod={"scale"}
        resizeMode={"stretch"}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 0,
          height: 0,
        }}
        imageLoadingColor="#2196F3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveHeight(1),
  },
});
