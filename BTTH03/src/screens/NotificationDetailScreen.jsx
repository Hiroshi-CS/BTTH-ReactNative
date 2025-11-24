import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NotificationDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Notification Detail Screen</Text>
    </View>
  );
};

export default NotificationDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
