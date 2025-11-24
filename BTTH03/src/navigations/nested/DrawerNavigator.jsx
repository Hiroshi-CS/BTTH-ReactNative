import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStackNavigator } from "./HomeStack";
import { NotificationsStackNavigator } from "./NotificationsStack"; // ✅ Thêm
import HelpsScreen from "../../screens/HelpsScreen"; // ✅ Thêm

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      id="DrawerNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          drawerLabel: "Trang chủ",
          title: "Trang chủ",
        }}
      />

      <Drawer.Screen
        name="NotificationsStack"
        component={NotificationsStackNavigator}
        options={{
          drawerLabel: "Thông báo",
          title: "Thông báo",
        }}
      />

      <Drawer.Screen
        name="Helps"
        component={HelpsScreen}
        options={{
          drawerLabel: "Trợ giúp",
          title: "Trợ giúp",
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};
