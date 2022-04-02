import React from "react";
import { StyleSheet, View } from "react-native";
import { Images } from "../../assets/images";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { TermsContent } from "../../components/termsContent/termsContent";
import { TopImage } from "../../components/topImage/topImage";
import { DisclaimarData } from "../../constants/termsData";
import { Colors } from "../../themes";

export const Disclaimar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />
      <TopImage
        backgroundImage={Images.TermsBackground}
        title={"Please go through this documents carefully"}
        tagImage={Images.disclaimer}
      />

      <TermsContent title={"DISCLAIMER"} dataList={DisclaimarData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
