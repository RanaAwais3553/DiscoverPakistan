import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screenOptions } from "../../constants";
import { BecomeContributor, UploadContent } from "../../screens";
import { ROUTE } from "../routeNames";

const becomeContributorStack = createNativeStackNavigator();
export const becomeContributorNav = () => (
  <becomeContributorStack.Navigator
    screenOptions={screenOptions}
    initialRouteName={"App"}
  >
    <becomeContributorStack.Screen
      name={ROUTE.BecomeContributorFirst}
      component={BecomeContributor}
    />

    <becomeContributorStack.Screen
      name={ROUTE.UploadContent}
      component={UploadContent}
    />
  </becomeContributorStack.Navigator>
);
