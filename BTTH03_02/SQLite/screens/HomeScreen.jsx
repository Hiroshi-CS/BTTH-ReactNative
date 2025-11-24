import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "../SQLiteDemo";
import { useIsFocused } from "@react-navigation/native";
import { useSettings } from "../context/SettingsContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();

  const { colors, fontSize } = useSettings();

  const getAllNotes = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT * FROM notes ORDER BY id DESC"
      );
      setNotes(result);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await db.runAsync("DELETE FROM notes WHERE id = ?", id);
      getAllNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getAllNotes();
    }
  }, [isFocused]);

  return (
    <ScrollView
      style={[styles.contentContainer, { backgroundColor: colors.background }]}
    >
      {notes.length === 0 ? (
        <Text
          style={[styles.emptyText, { color: colors.textSecondary, fontSize }]}
        >
          No notes yet. Add one!
        </Text>
      ) : (
        notes.map((note) => (
          <View
            style={[
              styles.todoItemContainer,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            key={note.id}
          >
            <TouchableOpacity
              style={styles.noteContent}
              onPress={() => navigation.navigate("EditNoteScreen", { note })}
            >
              <Text
                style={[
                  styles.noteTitle,
                  { color: colors.text, fontSize: fontSize + 2 },
                ]}
              >
                {note.title}
              </Text>
              <Text
                style={[
                  styles.noteText,
                  { color: colors.textSecondary, fontSize },
                ]}
              >
                {note.content}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
              <Ionicons
                name="trash"
                size={fontSize + 8}
                color={colors.danger}
              />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
  },
  todoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  noteContent: {
    flex: 1,
    marginRight: 10,
  },
  noteTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  noteText: {},
});
