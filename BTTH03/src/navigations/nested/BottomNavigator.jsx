import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import CategoryScreen from "../../screens/CategoryScreen";
import FavoriteScreen from "../../screens/FavoriteScreen";
import ProfileScreen from "../../screens/ProfileScreen";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Bottom = createBottomTabNavigator();

const AppColors = {
  primary: "#007AFF",
  gray500: "#6B7280",
  white: "#FFFFFF",
  border: "#E5E7EB",
};

const BottomNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
      }}
    >
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarLabel: "Trang chủ",
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={28}
              onPress={() =>
                navigation.getParent("DrawerNavigator").openDrawer()
              }
            />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        })}
      />

      <Bottom.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: true,
          tabBarLabel: "Danh mục",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Bottom.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: true,
          title: "Yêu thích",
          tabBarLabel: "Yêu thích",
          tabBarBadge: 3,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: "Cá nhân",
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
