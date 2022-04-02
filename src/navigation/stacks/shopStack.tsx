import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screenOptions } from "../../constants";
import { CheckOut, FullCart, Shop, Thankyou } from "../../screens";
import { ROUTE } from "../routeNames";

const ShopStack = createNativeStackNavigator();
export const ShopNav = () => (
  <ShopStack.Navigator screenOptions={screenOptions}>
    <ShopStack.Screen name={ROUTE.ShopFirst} component={Shop} />
    <ShopStack.Screen name={ROUTE.FullCart} component={FullCart} />
    <ShopStack.Screen name={ROUTE.CheckOut} component={CheckOut} />
    <ShopStack.Screen name={ROUTE.OrderSuccessful} component={Thankyou} />
  </ShopStack.Navigator>
);
