import { IOS, isEmptyObject, navigation } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Linking, NativeModules } from "react-native";
import { ROUTE } from "../navigation/routeNames";
const { RNAndroidOpenSettings } = NativeModules;
const makeUrl = (source, placeHolderUri) => {
  const normalisedSource =
    source &&
    typeof source?.uri === "string" &&
    !source?.uri.split("http")[1] &&
    !source?.uri.split("file:")[1] &&
    !source?.uri
      ? {
          uri: placeHolderUri,
        }
      : source;

  return normalisedSource;
};

const keyExtractor = (item, index) => index.toString();

const makeFormData = (data) => {
  let newData = new FormData();
  if (!isEmptyObject(data)) {
    for (let key in data) {
      newData.append(key, data[key]);
    }
  }

  return newData;
};

const validateEmail = (value) => {
  const email = value && value.trim();
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    )
  ) {
    return true;
  }
  return false;
};

const saveInAsyncStorage = async (key: string, value: any) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Saved ${key} in async storage`);

    return true;
  } catch (error) {
    console.error(`Error setting  ${key} in Async: `, error);
    return false;
  }
};

const getFromAsyncStorage = async (value: string) => {
  try {
    let val = await AsyncStorage.getItem(value);
    console.log(`Got ${value} from async storage`);
    return {
      success: true,
      value: val,
    };
  } catch (error) {
    console.error(`Error getting ${value} from Async: `, error);
    return {
      success: false,
      value: "",
    };
  }
};

const removeFromAsyncStorage = async (value: string) => {
  try {
    await AsyncStorage.removeItem(value);
    console.log(`Removed ${value} from async storage`);
    return true;
  } catch (error) {
    console.error(`Error removing ${value} from Async: `, error);
    return false;
  }
};

// const getDiffInDates = (from, to) => {
//   if (from) {
//     var fromDate = new Date(from);
//     var toDate = to ? new Date(to) : new Date();
//     var difference_In_Time = toDate.getTime() - fromDate.getTime();
//     var difference_In_Days = parseInt(difference_In_Time / (1000 * 3600 * 24));
//     if (difference_In_Days > 365) {
//       return `${parseInt(difference_In_Days / 365)} years`;
//     }
//     if (difference_In_Days > 365) {
//       return `${parseInt(difference_In_Days / 30)} months`;
//     }
//     if (difference_In_Days > 6) {
//       return `${parseInt(difference_In_Days / 7)} weeks`;
//     }
//     return `${parseInt(difference_In_Days)} days`;
//   }
// };

const getDiffInDates = (value: any) => {
  value = value?.replace(/ /gi, "T");

  if (value) {
    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

    if (seconds < 29)
      // less than 30 seconds ago will show as 'Just now'
      return "Just now";

    const intervals = {
      year: 31536000,

      month: 2592000,

      week: 604800,

      day: 86400,

      hour: 3600,

      minute: 60,

      second: 1,
    };

    let counter;

    for (const i in intervals) {
      counter = Math.floor(seconds / intervals[i]);

      if (counter > 0)
        if (counter === 1) {
          return counter + " " + i + " ago"; // singular (1 day ago)
        } else {
          return counter + " " + i + "s ago"; // plural (2 days ago)
        }
    }
  }

  return value;
};

const imageFromPhone = () =>
  new Promise((resolve, reject) => {
    {
      ImagePicker.requestCameraPermissionsAsync().then(({ status }) => {
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 0.5,
            allowsMultipleSelection: false,
            base64: true,
          })
            .then((response) => {
              resolve(response);
            })
            .catch(() => {
              reject();
            });
        }
      });
    }
  });
const getImage = async () => {
  try {
    let res = await imageFromPhone();

    return {
      success: true,
      imageData: res,
    };
  } catch (e) {}
};

const openAppSettings = () => {
  if (IOS) {
    Linking.openURL("app-settings:");
  } else {
    RNAndroidOpenSettings.appDetailsSettings();
  }
};

const checkIfEmpty = (value, message) => {
  if (value || value === false) {
    return false;
  } else {
    alert(message);
    return true;
  }
};
const calculateTotalCartPrice = (cart = []) => {
  //used on many screens
  const total = cart.reduce((currentTotal, item) => {
    console.log(JSON.stringify(currentTotal, null, 8));
    return (
      parseInt(item?.price * (item?.cartQuantity || 1)) + parseInt(currentTotal)
    );
  }, 0);

  return total;
};

const ifUserNotLoggedIn = (user) => {
  if (!user?.user_id) {
    navigation.navigate(ROUTE.SignIn);
    return true;
  }
};

const sortComments = (arr) => {
  var temp = [...arr];
  arr = arr.sort((a, b) => b.parent - a.parent);
  arr.forEach((o, index) => {
    if (temp[0].parent_comment_id === 0 || temp[0].parent_comment_id === "0")
      return;
    var parentIndex = temp.findIndex(
      (o) => o.vcomment_id === temp[0].parent_comment_id,
    );
    if (parentIndex > -1) {
      temp[parentIndex].replies
        ? temp[parentIndex].replies.push(temp[0])
        : (temp[parentIndex].replies = [temp[0]]);
    }
    temp.shift();
  });
  return temp;
};

export {
  sortComments,
  removeFromAsyncStorage,
  ifUserNotLoggedIn,
  checkIfEmpty,
  saveInAsyncStorage,
  calculateTotalCartPrice,
  getFromAsyncStorage,
  makeUrl,
  keyExtractor,
  makeFormData,
  validateEmail,
  getDiffInDates,
  openAppSettings,
  getImage,
};
