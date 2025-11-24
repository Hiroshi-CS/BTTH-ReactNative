import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Category1Screen = () => {
  return (
    <View style={styles.container}>
      <Text>Category 1 Screen</Text>
    </View>
  );
};

export default Category1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
