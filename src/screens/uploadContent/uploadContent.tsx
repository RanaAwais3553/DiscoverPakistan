import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import { Loader } from "../../components/loader/loader";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { MainActions } from "../../constants/actionNames";
import { Colors } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { openAppSettings } from "../../utilities";

export const UploadContent = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);
  const uploadContent = useSelector((state) => state?.main?.uploadContent);

  const [uploadedImages, setuploadedImages] = useState([]);

  const onNextPressed = () => {
    let data = {
      user_id: user?.user_id,
      "file[]": uploadedImages,
    };
    dispatch(MainActions.uploadContentRequest(data));
  };

  const pickFile = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Sorry, we need camera roll permissions to make this work! Kindly enable permission from settings",
      );
      openAppSettings();
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result?.cancelled) {
      result["type"] = "*/*";
      delete result["cancelled"];
      let tempArray = result?.uri.split("/");
      let fileName = tempArray[tempArray.length - 1];
      result["name"] = fileName;
      let extArray = fileName.split(".");
      let ext = extArray[extArray.length - 1];

      let images = [...uploadedImages];
      images.push(`data:image/${ext};base64,${result?.base64}`);

      setuploadedImages([...images]);
    }
  };

  return (
    <View style={styles.container}>
      <Loader fullScreen loading={uploadContent.loading} />
      <MainHeader navigation={navigation} />
      <ScrollView>
        <Header title={"Upload Your Content"} onBackPress={navigation.goBack} />

        <Text style={styles.description}>
          {
            "Uploading Vectors? Now, simply upload your EPS files. No JPEG required.\n\nJPEG preview now automatically generate for your EPS files. You no longer need to upload aJPEG with each vector"
          }
        </Text>

        <View style={styles.dataWrapper}>
          <Button
            title={"Select From Here"}
            onPress={pickFile}
            style={styles.buttonSelect}
          />

          <Text style={styles.dataWrapperText}>
            (.eps file or jpegs files that are atleast 4.0 megapixels)
          </Text>
        </View>

        <Button
          title={"Next"}
          onPress={onNextPressed}
          style={styles.buttonNext}
        />
      </ScrollView>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  description: {
    backgroundColor: Colors.dimPrimaryButton,
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    padding: SPACING.small,
    margin: SPACING.medium,
  },
  dataWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    width: "90%",
    padding: SPACING.large,
    alignSelf: "center",
    marginTop: SPACING.xLarge,
    marginBottom: SPACING.x4Large,
  },
  dataWrapperText: {
    textAlign: "center",
  },
  buttonSelect: {
    width: responsiveWidth(60),
    alignSelf: "center",
    height: responsiveHeight(4),
    marginVertical: SPACING.medium,
  },
  buttonNext: {
    alignSelf: "center",
    width: responsiveWidth(40),
    height: responsiveHeight(5),
    marginTop: SPACING.x4Large,
  },
});

//             <View
//               style={[
//                 styles.uploadContentBtnRow,
//                 uploadedImages.length > 0
//                   ? { height: hp(35) }
//                   : { marginBottom: hp(14) },
//               ]}
//             >

//

//               {uploadedImages.length > 0 && (
//                 <View style={{ height: hp(17), marginTop: hp(2) }}>
//                   <FlatList
//                     data={uploadedImages}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.flatListContainer}
//                     keyExtractor={(item, i) => JSON.stringify(i)}
//                     renderItem={(item) => {
//                       return (
//                         <>
//                           <Image
//                             source={{ uri: item?.item }}
//                             style={styles.flatListImg}
//                           />
//                           <View
//                             style={{
//                               position: "absolute",
//                               zIndex: 2,
//                               right: 0,
//                             }}
//                           >
//                             <TouchableOpacity
//                               style={{
//                                 backgroundColor: "#fff",
//                                 borderRadius: 50,
//                                 width: 24,
//                                 height: 24,
//                               }}
//                             >
//                               <AntDesign
//                                 name={"closecircle"}
//                                 size={24}
//                                 color={"green"}
//                               />
//                             </TouchableOpacity>
//                           </View>
//                         </>
//                       );
//                     }}
//                   />
//                 </View>
//               )}
//             </View>
//             <View
//               style={{
//                 justifyContent: "flex-end",
//                 height: hp(10),
//                 width: wp(90),
//               }}
//             >
//               <TouchableOpacity style={styles.nextBtn}>
//                 <Text style={styles.selectFromHereTxt}>Next</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   cardsCol: {
//     width: wp(100),
//     height: hp(70),
//     alignItems: "center",
//     flexDirection: "column",
//   },
//   uploadContentBtnRow: {
//     borderWidth: 1,
//     borderColor: "#333",
//     width: wp(90),
//     height: hp(20),
//     marginTop: hp(5),
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   selectFromHereBtn: {
//     backgroundColor: "#19b24b",
//     height: hp(6),
//     width: wp(50),
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   },
//   selectFromHereTxt: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   flatListContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//     height: hp(17),
//   },
//   flatListImg: {
//     height: hp(14),
//     width: wp(25.5),
//     borderColor: "#333",
//     borderWidth: 1,
//     margin: hp(1),
//     // resizeMode:'contain',
//   },
//   nextBtn: {
//     backgroundColor: "#19b24b",
//     height: hp(4),
//     width: wp(30),
//     marginTop: hp(2),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   greenArea: {
//     flexDirection: "column",
//     backgroundColor: "#9EF0BA",
//     paddingBottom: hp(2),
//     width: wp(90),
//     padding: hp(1),
//   },
//   row01: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: wp(90),
//     marginTop: hp(1),
//     marginBottom: hp(3),
//   },
// });
