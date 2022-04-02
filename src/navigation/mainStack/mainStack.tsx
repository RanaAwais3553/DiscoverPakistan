import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screenOptions } from "../../constants";
import { SignIn, SignUp } from "../../screens";
import DrawerStack from "../drawer/drawer";
import { ROUTE } from "../routeNames";

const AppStack = createNativeStackNavigator();
const AppNav = () => (
  <AppStack.Navigator
    screenOptions={screenOptions}
    initialRouteName={ROUTE.MainApp}
  >
    <AppStack.Screen name={ROUTE.MainApp} component={DrawerStack} />
    <AppStack.Screen name={ROUTE.SignIn} component={SignIn} />
    <AppStack.Screen name={ROUTE.SignUp} component={SignUp} />
    <AppStack.Screen name={ROUTE.Profile} component={SignUp} />
  </AppStack.Navigator>
);

export default AppNav;
