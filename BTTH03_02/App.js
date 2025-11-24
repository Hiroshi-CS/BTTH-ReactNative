import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SQLiteDemo from "./SQLite/SQLiteDemo";

export default function App() {
  return <SQLiteDemo></SQLiteDemo>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
