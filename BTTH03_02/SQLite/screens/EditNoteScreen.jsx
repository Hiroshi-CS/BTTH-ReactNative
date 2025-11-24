import { Button, StyleSheet, TextInput, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useSQLiteContext } from "../SQLiteDemo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../context/SettingsContext";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const EditNoteScreen = () => {
  const route = useRoute();
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const { colors, fontSize } = useSettings();

  const db = useSQLiteContext();
  const navigation = useNavigation();

  const handleSavePress = async () => {
    if (title.trim() === "") {
      Alert.alert("Warning", "Please enter a title!", [{ text: "OK" }]);
      return;
    }

    try {
      await db.runAsync(
        "UPDATE notes SET title = ?, content = ? WHERE id = ?",
        title.trim(),
        content.trim(),
        note.id
      );
      console.log("Updated note successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Updating note error: ", error);
      Alert.alert("Error", "Failed to update note!");
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

export default EditNoteScreen;

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
