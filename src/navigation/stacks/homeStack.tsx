import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screenOptions } from "../../constants";
import { Home, VideoDetails } from "../../screens";
import { ROUTE } from "../routeNames";
const Options = {
  animation: "none",
};

const HomeStack = createNativeStackNavigator();
export const HomeNav = () => (
  <HomeStack.Navigator screenOptions={screenOptions} initialRouteName={"App"}>
    <HomeStack.Screen name={ROUTE.HomeFirst} component={Home} />

    <HomeStack.Screen
      options={Options}
      name={ROUTE.VideoDetails}
      component={VideoDetails}
    />
  </HomeStack.Navigator>
);
