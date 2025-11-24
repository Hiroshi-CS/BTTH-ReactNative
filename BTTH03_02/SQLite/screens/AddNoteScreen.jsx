import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSQLiteContext } from "../SQLiteDemo";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../context/SettingsContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddNoteScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const db = useSQLiteContext();
  const navigation = useNavigation();

  const { colors, fontSize } = useSettings();

  const handleSavePress = async () => {
    if (title.trim() === "") {
      Alert.alert("Warning", "Please enter a title!", [{ text: "OK" }]);
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        title.trim(),
        content.trim()
      );
      console.log("Saving note successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Saving note error: ", error);
      Alert.alert("Error", "Failed to save note!");
    }
  };

  const handleCancelPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TextInput
        placeholder="Enter your title"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
        style={[
          styles.textInput,
          {
            fontSize,
            color: colors.text,
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      />
      <TextInput
        placeholder="Enter your content"
        placeholderTextColor={colors.textSecondary}
        value={content}
        onChangeText={setContent}
        style={[
          styles.textInput,
          styles.contentInput,
          {
            fontSize,
            color: colors.text,
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#999" }]}
          onPress={handleCancelPress}
        >
          <Ionicons name="close-circle" size={fontSize + 4} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSavePress}
        >
          <Ionicons name="checkmark-circle" size={fontSize + 4} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  contentInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
