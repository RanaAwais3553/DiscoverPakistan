import { Platform } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import * as NavigationService from "../navigation/navigationService";

const CONSTANTS = {
  LIVE_URL: `https://livecdn.live247stream.com/discoverpakistan/${
    Platform.OS === `ios` ? `iphone` : Platform.OS
  }/playlist.m3u8`,
  //BASE_URL:'https://discoverpakistan.tv/Legacy_api/',
  BASE_URL: "https://discoverpakistan.tv/discoverpakistanroute/Mobile_app_api/",
  // BASE_URL:'http://smartmultimediahouse.com/discover/Legacy_api/',
  // WEB_URL:'https://discoverpakistan.tv/',
  WEB_URL: "https://discoverpakistan.tv/dp_admin/",
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const VideoTypes = {
  popularDocumentaries: "popular-documentaries",
  mostViewed: "most-viewed",
  completeArchieve: "complete-archive",
  Shows: "Shows",
};

const SOCIAL_LOGIN = {
  FACEBOOK: "1620949568083766",
  GOOGLE_IOS:
    "388807787471-5j629v9aq98dhjtonk8pdo1een6d3n0o.apps.googleusercontent.com",
  GOOGLE_ANDROID:
    "388807787471-afhq1g2ns58p8b3v4jto52paujmpctjb.apps.googleusercontent.com",
};

const KEYS = {
  BA_UNAME:
    "WEJnTnFPNE96Zm0yOUZWT29OSWxRMzNsbHQ5c0V1ZTI0bDZha2E4clE0NlRndW9JSnN1ZFRGS0dJYjlCM3Y5VjE1ODAzMDI2NzM",
  BA_PWD: "NVRscEJJMUZhWXNiNW9RZ0p2RGhaeTBmOE1lZlAzSlcxNTgwMzAyNjcz",
};

const DrawerBottomText = "All Copyright © Reserved by Discover Pakistan HD TV";

const Discover_Pakistan_Social_Links = {
  //   Linking.openURL('fb://page/PAGE_ID');
  // Linking.openURL('http://instagram.com/_u/USER_NAME');
  // Linking.openURL('http://instagram.com/_p/PICTURE');
  youtube: "https://youtube.com/c/DiscoverPakistanOfficial",
  FaceBook: "https://m.facebook.com/discoverpakistan.tv",
  Twiter: "https://twitter.com/DiscoverpakTv?s=09",
};

const navigation = NavigationService;

const screenOptions = {
  headerShown: false,
};

const IOS = Platform.OS === "ios";

const ICON_SIZE = {
  small: responsiveFontSize(1.9),
  medium: responsiveFontSize(3),
  large: responsiveFontSize(3.5),
  xLarge: responsiveFontSize(5),
  x2Large: responsiveFontSize(7),
  x3Large: responsiveFontSize(9),
  x4Large: responsiveFontSize(13),
};
const SIZE = {
  small: responsiveFontSize(2.5),
  small1: responsiveFontSize(5),
  medium: responsiveHeight(7),
  large: responsiveFontSize(3.5),
};

const Mask = {
  cellNumber: "+1 ([000]) [000] [0000]",
  driverLicenceNumber: "[a][0000]-[00000]-[0]",
  sin: "[000] [000] [000]",
  numeric: "[999999999]",
  date: "[00]/[00]/[0000]",
  price: "$ [999999999]",
  postalCode: "[---] [AAA]",
};

const FONT_SIZE = {
  extraSmall: responsiveFontSize(1),
  ls: responsiveFontSize(1.5),
  small: responsiveFontSize(1.5),
  medium: responsiveFontSize(1.77), //12,13
  large: responsiveFontSize(2), //14
  x1Large: responsiveFontSize(2.3),
  x2Large: responsiveFontSize(2.519),
  x3Large: responsiveFontSize(2.9), //24
  x4Large: responsiveFontSize(3),
};

const PlaceHolders = {
  fullName: "Full Name",
  email: "E-mail address",
  password: "Password",
  confirmPassword: "Password Confirmation",
  subject: "Subject",
  telephoneNumber: "Telephone Number",
  search: "Search...",
  country: "Pakistan",
  firstName: "First Name*",
  lastName: "Last Name*",
  address1: "Address 1*",
  address2: "Address 2",
  zipCode: "Zip Code*",
  phoneNumber: "Phone Number*",
  addComment: "Add a Comment...",
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const URI = {
  LOGIN: "login",
  SIGNUP: "signup",
  RESET_PASSWORD: "password_reset?email=",
  SEARCH: "search",
  UPDATE_PROFILE: "update_profile",
  GET_USER_DETAILS: "get_user_details_by_user_id",
  CATEGORIES: "category",
  VIDEO_BY_SLUG: "get_video_by_slug?slug=",
  GET_SINGLE_VIDEO: "get_single_video_by_slug?slug=",
  GET_PARTNERS: "partners",
  ADD_FAVORITE: "add_favorite",
  RM_FAVORITE: "remove_favorite",
  GET_FAVORITE: "get_favorite",
  GET_SHOWS_DETAIL: "shows",
  GET_VIDEOS_BY_SHOW_ID: "get_video_by_show_id",
  ADD_COMMUNITY_COMMENT: "add_community_comment",
  COMMUNITY_LIKE_DISLIKE: "cummunity_like_dislike",
  APPLY_FOR_JOB: "apply_career",
  JOBS_LIST: "career",

  COMMUNITIES: "communities",
  SUGGEST_COMMUNITY: "suuggest_tourist_community",
  GET_COMMENTS: "get_video_comments",
  DO_COMMENTS: "add_video_comment",
  ADD_WATCH_LATER: "add_to_watch_later",
  REMOVE_WATCH_LATER: "remove_watch_later",
  GET_WATCH_LATER: "watch_later",
  VIDEO_LIKE_DISLIKE: "video_like_dislike",
  VIDEO_COMMENT_DEL: "delete_video_comment",
  UPDATE_VIDEO_COMMENT: "update_video_comment",
  COMMENT_LIKE_DISLIKE: "video_comment_like_dislike",

  UPLOAD_CONTRIBUTOR: "upload_contributor",

  GET_COMMUNITIES_COMMENTS: "get_community_comments",
  DEL_COMMUNITY_COMMENT: "delete_community_comment",
  UPDATE_COMMUNITY_COMMENT: "update_community_comment",
  GET_MARCHANDIES_PRODUCT: "discover_products",
  GET_SINGLE_PRODUCT: "view_product",

  GET_MOVES: "get_movies",

  GET_CART_LIST: "cart_items",
  ADD_TO_CART: "add_to_cart",
  REMOVE_CART: "delete_item",
  ORDER_PRODUCTS: "insert_order",
  UPDATE_PROFILE_PIC: "",
};

const getUrl = (url, slug = false) => {
  if (url) {
    if (url.includes("http")) {
      if (url.includes("watch?v=")) {
        return {
          html: `<iframe src="${url.replace("watch?v=", "embed/")}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                    />`,
        };
      } else if (url.includes("youtu.be")) {
        return {
          html: `<iframe src="${url.replace("youtu.be", "youtube.com/embed/")}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                    />`,
        };
      } else {
        return { uri: url };
      }
    } else {
      if (slug) {
        return {
          html: `<iframe src="https://www.youtube.com/embed/${url}?rel=0"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                allow="fullscreen" allowfullscreen="allowfullscreen"  
                />`,
        };
      }

      return {
        html: `<iframe src="https://www.youtube.com/embed/${url}"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
                />`,
      };
    }
  } else {
    return {
      html: `<iframe src="https://www.youtube.com/embed/zer2lMc5J5k"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="1" 
        />`,
    };
  }
};

export {
  VideoTypes,
  URI,
  FONT_SIZE,
  Mask,
  SIZE,
  ICON_SIZE,
  IOS,
  screenOptions,
  navigation,
  Discover_Pakistan_Social_Links,
  DrawerBottomText,
  KEYS,
  SOCIAL_LOGIN,
  isEmptyObject,
  CONSTANTS,
  PlaceHolders,
  getUrl,
};
