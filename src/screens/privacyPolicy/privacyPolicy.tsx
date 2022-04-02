import React from "react";
import { StyleSheet, View } from "react-native";
import { Images } from "../../assets/images";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { TermsContent } from "../../components/termsContent/termsContent";
import { TopImage } from "../../components/topImage/topImage";
import { PrivacyPolicyData } from "../../constants/termsData";
import { Colors } from "../../themes";

export const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />
      <TopImage
        backgroundImage={Images.privacyPolicyBackground}
        title={"For Discover Pakistan HDTV"}
        tagImage={Images.privacyPolicy}
      />

      <TermsContent title={"PRIVACY POLICY"} dataList={PrivacyPolicyData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
