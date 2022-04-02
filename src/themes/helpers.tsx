import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { IOS } from "../constants";
const ELEVATION = {
  backgroundColor: "white",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 10,
};

const ROW = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const SPACING = {
  extraSmall: responsiveFontSize(0.5),
  small: responsiveFontSize(1),
  medium: responsiveFontSize(2),
  large: responsiveFontSize(3),
  xLarge: responsiveFontSize(4),
  x2Large: responsiveFontSize(5),
  x3Large: responsiveFontSize(6),
  x4Large: responsiveFontSize(7),
};

const BORDERRADIUS = {
  borderRadius: responsiveFontSize(0.4),
};

const STATUSBARHEIGHT = {
  paddingTop: responsiveHeight(IOS ? 5 : 6),
};

const LISTIPADDINGBOTTOM = {
  paddingBottom: responsiveHeight(10),
};

const DISABLED = {
  opacity: 0.2,
};

export {
  ELEVATION,
  ROW,
  BORDERRADIUS,
  STATUSBARHEIGHT,
  LISTIPADDINGBOTTOM,
  SPACING,
  DISABLED,
};
