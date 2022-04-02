import { lockAsync, OrientationLock } from "expo-screen-orientation";
import React, { useEffect,useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Banner } from "../../components/banner/banner";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { SearchButton } from "../../components/searchButton/searchButton";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import { Videos } from "../../components/videos/videos";
import { ROUTE } from "../../navigation/routeNames";
import { Colors } from "../../themes";

export const Home = ({ navigation }) => {
  const [load , setLoad] = useState(false)
  const onWillFocus = () => {
    lockAsync(OrientationLock.ALL);
  };

  const onWillBlur = async () => {
    await lockAsync(OrientationLock.PORTRAIT);
  };

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = navigation.addListener("focus", () => {
      onWillFocus();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = navigation.addListener("blur", () => {
      onWillBlur();
    });

    return unsubscribe;
  }, []);
  const navigates = () =>{
    setLoad(true)
    setTimeout(()=>{
      navigation.navigate(ROUTE.MainApp)
setLoad(false)
    },1000)
  }
  return (
    <>
    { 
    load ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator color="#121212" size={24}/></View> :
    <View style={styles.container}>
      <MainHeader navigation={navigation} navigates={navigates}/>
      <VideoPlayer navigation={navigation} />
      <Banner />
      <SearchButton />
      <Videos navigation={navigation} navigates={navigates} />
    </View>
}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
  },
});
