import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationsScreen from "../../screens/NotificationScreen";
import NotificationDetailScreen from "../../screens/NotificationDetailScreen";
import { Ionicons } from "@expo/vector-icons";

const NotificationsStack = createNativeStackNavigator();

export const NotificationsStackNavigator = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          title: "Thông báo",
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={28}
              onPress={() =>
                navigation.getParent("DrawerNavigator").openDrawer()
              }
            />
          ),
        })}
      />

      <NotificationsStack.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
        options={{
          title: "Chi tiết thông báo",
        }}
      />
    </NotificationsStack.Navigator>
  );
};
