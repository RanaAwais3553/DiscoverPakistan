import React from "react";
import { StyleSheet, View } from "react-native";
import { Images } from "../../assets/images";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { TermsContent } from "../../components/termsContent/termsContent";
import { TopImage } from "../../components/topImage/topImage";
import { TermsCondition } from "../../constants/termsData";
import { Colors } from "../../themes";

export const TermsConditions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} />
      <TopImage
        backgroundImage={Images.TermsBackground}
        title={"Please go through this documents carefully"}
        tagImage={Images.Terms}
      />

      <TermsContent title={"TERMS & CONDITION"} dataList={TermsCondition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
