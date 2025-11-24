import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { changeToken } from "../../store/reducers/authReducer";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(changeToken(false));
  };

  return (
    <View style={styles.container}>
      <Text>Cá nhân</Text>
      <Button title="LOG OUT" onPress={handleLogout}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default ProfileScreen;
