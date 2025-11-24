import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddNoteScreen from "./screens/AddNoteScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import { Pressable } from "react-native";
import { useSettings, SettingsProvider } from "./context/SettingsContext"; // ✅ Import SettingsProvider
import Ionicons from "@expo/vector-icons/Ionicons";

const Bottom = createBottomTabNavigator();
const Stack = createStackNavigator();

const HeaderRightIcon = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate("AddNoteScreen")}>
      <Ionicons name="add-circle" size={30} color="orange" />
    </Pressable>
  );
};

const HomeStack = () => {
  const { colors } = useSettings();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Stack.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
          title: "Note App",
        })}
      />
      <Stack.Screen
        component={AddNoteScreen}
        name="AddNoteScreen"
        options={{ title: "Add Note" }}
      />
      <Stack.Screen
        component={EditNoteScreen}
        name="EditNoteScreen"
        options={{ title: "Edit Note" }}
      />
    </Stack.Navigator>
  );
};

const BottomTabsContent = () => {
  const { colors } = useSettings();

  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Bottom.Screen
        component={HomeStack}
        name="HomeStack"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        component={SettingsScreen}
        name="SettingsScreen"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

const SQLiteBottomTabNavigator = () => {
  return (
    <NavigationContainer>
      {/* ✅ Wrap SettingsProvider ở đây */}
      <SettingsProvider>
        <BottomTabsContent />
      </SettingsProvider>
    </NavigationContainer>
  );
};

export default SQLiteBottomTabNavigator;
