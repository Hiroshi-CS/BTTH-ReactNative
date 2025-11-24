import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HelpsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>HelpsScreen</Text>
    </View>
  );
};

export default HelpsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
