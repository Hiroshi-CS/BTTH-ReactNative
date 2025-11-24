import { StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import { useSettings } from "../context/SettingsContext";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { darkMode, fontSize, colors, toggleDarkMode, updateFontSize } =
    useSettings();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.settingItem}>
        <Text style={[styles.label, { color: colors.text, fontSize }]}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#D1D1D6", true: "#34C759" }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.fontSizeHeader}>
          <Text style={[styles.label, { color: colors.text, fontSize }]}>
            Font Size
          </Text>
          <Text
            style={[styles.fontSizeValue, { color: colors.primary, fontSize }]}
          >
            {fontSize}
          </Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={36}
          step={2}
          value={fontSize}
          onValueChange={updateFontSize}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />

        <View style={styles.sliderLabels}>
          <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>
            12
          </Text>
          <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>
            36
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.previewContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>
          Preview:
        </Text>
        <Text style={[styles.previewText, { color: colors.text, fontSize }]}>
          This is how your text will look!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    marginBottom: 30,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10,
  },
  fontSizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  fontSizeValue: {
    fontWeight: "700",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  sliderLabel: {
    fontSize: 12,
  },
  previewContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
  },
  previewLabel: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  previewText: {
    lineHeight: 24,
  },
});
