import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TopTabNavigator } from "../navigations/nested/CategoryTopTab";

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <TopTabNavigator />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
