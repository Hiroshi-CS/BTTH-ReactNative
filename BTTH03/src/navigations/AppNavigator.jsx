import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import BottomNavigator from "./BottomNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
const Stack = createNativeStackNavigator();

export const AppStackNavigator = () => {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token ? (
          <>
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          </>
        ) : (
          <Stack.Screen
            name="AuthStackNavigator"
            component={AuthStackNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
