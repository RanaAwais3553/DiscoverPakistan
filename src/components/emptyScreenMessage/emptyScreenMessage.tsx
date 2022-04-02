import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { AboutUsIcon as noDataImage } from "../../assets/svg";

const msg = {
  details: "No Data Available at the moment",
  heading: "No Data!!",
  icon: noDataImage,
};

export const EmptyScreenMessage = ({
  message,
  onPress,
  detailsStyle,
  headingStyle,
  imageStyle,
  textWraperStyle,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={onPress ? false : true}
      style={[styles.container, style]}
      onPress={onPress}
    >
      {message.icon && (
        <message.icon
          height={responsiveWidth(16)}
          width={responsiveWidth(16)}
          fill={"grey"}
        />
      )}

      <View style={[styles.textWrapper, textWraperStyle]}>
        {message?.heading ? (
          <Text style={[styles.heading, headingStyle]}>
            {message ? message.heading : msg.heading}
          </Text>
        ) : null}

        <Text style={[styles.details, detailsStyle]}>
          {message ? message.details : msg.details}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: "20%",
  },
  imageView: {
    height: responsiveWidth(23),
    width: responsiveWidth(23),
    borderRadius: responsiveWidth(23) / 2,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: responsiveWidth(15) / 2,
  },
  textWrapper: {
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: responsiveWidth(4.5),
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "5%",
  },
  details: {
    fontSize: responsiveWidth(4.6),
    color: "grey",

    textAlign: "center",
    width: "90%",
  },
});
