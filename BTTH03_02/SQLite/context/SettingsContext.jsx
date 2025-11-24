import React, { createContext, useState, useEffect, useContext } from "react";
import { useSQLiteContext } from "../SQLiteDemo"; // ✅ Import từ SQLiteDemo

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const db = useSQLiteContext(); // ✅ Giờ sẽ hoạt động!

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await db.getFirstAsync(
        "SELECT * FROM settings WHERE id = 1"
      );

      if (result) {
        // ✅ Convert rõ ràng từ SQLite INTEGER (0/1) sang Boolean
        // Xử lý cả trường hợp SQLite trả về string hoặc number
        const darkModeValue = result.dark_mode;
        setDarkMode(darkModeValue === 1 || darkModeValue === "1");
        setFontSize(Number(result.font_size) || 16);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading settings:", error);
      setLoading(false);
    }
  };

  const toggleDarkMode = async (value) => {
    try {
      await db.runAsync(
        "UPDATE settings SET dark_mode = ? WHERE id = 1",
        value ? 1 : 0
      );
      setDarkMode(value);
    } catch (error) {
      console.error("Error updating dark mode:", error);
    }
  };

  const updateFontSize = async (size) => {
    try {
      await db.runAsync(
        "UPDATE settings SET font_size = ? WHERE id = 1",
        Math.round(size)
      );
      setFontSize(Math.round(size));
    } catch (error) {
      console.error("Error updating font size:", error);
    }
  };

  const colors = {
    background: darkMode ? "#1C1C1E" : "#FFFFFF",
    text: darkMode ? "#FFFFFF" : "#000000",
    textSecondary: darkMode ? "#A0A0A0" : "#666666",
    cardBackground: darkMode ? "#2C2C2E" : "#F5F5F5",
    border: darkMode ? "#3A3A3C" : "#E0E0E0",
    primary: "#007AFF",
    danger: "#FF3B30",
  };

  const value = {
    darkMode,
    fontSize,
    colors,
    loading,
    toggleDarkMode,
    updateFontSize,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
