import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeDetailsScreen from "../../screens/HomeDetailsScreen";
import BottomNavigator from "./BottomNavigator";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
      }}
    >
      <HomeStack.Screen name="BottomTab" component={BottomNavigator} />

      <HomeStack.Screen
        name="HomeDetailsScreen"
        component={HomeDetailsScreen}
        options={{
          headerShown: true,
          title: "Chi tiết",
        }}
      />
    </HomeStack.Navigator>
  );
};
