import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Notification Screen</Text>
      <Button
        title="GO TO DETAILS"
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => navigation.navigate("NotificationDetailScreen")}
      ></Button>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
