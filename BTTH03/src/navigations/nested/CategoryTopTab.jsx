import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Category1Screen from "../../screens/Category1";
import Category2Screen from "../../screens/Category2";
import Category3Screen from "../../screens/Category3";

const TopTab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Category1" component={Category1Screen} />
      <TopTab.Screen name="Category2" component={Category2Screen} />
      <TopTab.Screen name="Category3" component={Category3Screen} />
    </TopTab.Navigator>
  );
};
