import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState, createContext, useContext } from "react";
import * as SQLite from "expo-sqlite";
import SQLiteBottomTabNavigator from "./SQLiteNavigator";

// ✅ Tạo Context
const SQLiteContext = createContext(null);

// ✅ Export hook
export const useSQLiteContext = () => {
  const context = useContext(SQLiteContext);
  if (!context) {
    throw new Error("useSQLiteContext must be used within SQLiteProvider");
  }
  return context;
};

const SQLiteDemo = () => {
  const [db, setDb] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    try {
      console.log("🔵 Initializing database...");

      const database = await SQLite.openDatabaseAsync("test.db");

      console.log("🔵 Creating tables...");

      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT NOT NULL, 
          content TEXT
        );
        
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY CHECK (id = 1), 
          dark_mode INTEGER DEFAULT 0,
          font_size INTEGER DEFAULT 16
        );
        
        INSERT OR IGNORE INTO settings (id, dark_mode, font_size) 
        VALUES (1, 0, 16);
      `);

      console.log("✅ Database initialized successfully!");
      setDb(database);
      setReady(true);
    } catch (err) {
      console.error("❌ Database error:", err);
      setError(err.message);
      setReady(true);
    }
  };

  if (!ready) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading database...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>❌ Error: {error}</Text>
        <Text style={styles.errorHint}>{error}</Text>
      </View>
    );
  }

  // ✅ Wrap TOÀN BỘ app với SQLiteContext
  return (
    <SQLiteContext.Provider value={db}>
      <SQLiteBottomTabNavigator />
    </SQLiteContext.Provider>
  );
};

export default SQLiteDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#FF3B30",
    fontWeight: "600",
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
