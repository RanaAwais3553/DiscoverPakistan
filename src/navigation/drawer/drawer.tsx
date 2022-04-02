import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { screenOptions } from "../../constants";
import {
  AboutUs,
  ContactUs,
  Disclaimar,
  DrawerScreen,
  PrivacyPolicy,
  TermsConditions,
} from "../../screens";
import { ROUTE } from "../routeNames";
import { becomeContributorNav } from "../stacks/becomeContributorStack";
import { HomeNav } from "../stacks/homeStack";
import { ShopNav } from "../stacks/shopStack";

const MyDrawerStack = createDrawerNavigator();

const MyDrawerNav = () => (
  <MyDrawerStack.Navigator
    screenOptions={screenOptions}
    initialRouteName={ROUTE.Home}
    drawerContent={(props) => <DrawerScreen {...props} />}
  >
    <MyDrawerStack.Screen name={ROUTE.Home} component={HomeNav} />
    <MyDrawerStack.Screen
      name={ROUTE.BecomeContributor}
      component={becomeContributorNav}
    />
    <MyDrawerStack.Screen name={ROUTE.AboutUs} component={AboutUs} />
    <MyDrawerStack.Screen name={ROUTE.ContactUs} component={ContactUs} />
    <MyDrawerStack.Screen name={ROUTE.Shop} component={ShopNav} />

    <MyDrawerStack.Screen
      name={ROUTE.TermsCondition}
      component={TermsConditions}
    />
    <MyDrawerStack.Screen
      name={ROUTE.PrivacyPolicy}
      component={PrivacyPolicy}
    />
    <MyDrawerStack.Screen name={ROUTE.Disclaimar} component={Disclaimar} />
  </MyDrawerStack.Navigator>
);

export default MyDrawerNav;
