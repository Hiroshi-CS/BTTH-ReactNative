import { useSQLiteContext } from "expo-sqlite";

export const useNotesDB = () => {
  const db = useSQLiteContext();

  const addNote = async (title, content) => {
    await db.runAsync(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      title,
      content || ""
    );
  };

  const getAllNotes = async () => {
    const notes = await db.getAllAsync("SELECT * FROM notes ORDER BY id DESC");
    return notes;
  };

  const updateNote = async (id, title, content) => {
    await db.runAsync(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?",
      title,
      content || "",
      id
    );
  };

  const deleteNote = async (id) => {
    await db.runAsync("DELETE FROM notes WHERE id = ?", id);
  };

  return { addNote, getAllNotes, updateNote, deleteNote };
};

export const useSettingsDB = () => {
  const db = useSQLiteContext();

  const getSettings = async () => {
    const result = await db.getFirstAsync(
      "SELECT * FROM settings WHERE id = 1"
    );
    return result || { dark_mode: 0, font_size: 16 };
  };

  const updateDarkMode = async (value) => {
    await db.runAsync(
      "UPDATE settings SET dark_mode = ? WHERE id = 1",
      value ? 1 : 0
    );
  };

  const updateFontSize = async (size) => {
    await db.runAsync("UPDATE settings SET font_size = ? WHERE id = 1", size);
  };

  return { getSettings, updateDarkMode, updateFontSize };
};
