/**
 * VoiceButton Component
 *
 * Placeholder button for future voice input feature (Epic 3).
 * Currently displays a disabled microphone icon that shows a "Coming Soon" alert.
 */

import { Pressable, Text, Alert, StyleSheet } from "react-native";

import { colors, borderRadius, spacing } from "@/constants/theme";

interface VoiceButtonProps {
  /** Button is always disabled for now - voice input coming in Epic 3 */
  disabled?: boolean;
}

export function VoiceButton({ disabled = true }: VoiceButtonProps) {
  const handlePress = () => {
    Alert.alert(
      "Coming Soon",
      "Voice input will be available in a future update.",
      [{ text: "OK" }]
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
      accessibilityLabel="Voice input"
      accessibilityHint="Voice input coming soon"
      accessibilityRole="button"
    >
      <Text style={styles.icon}>🎤</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 20,
  },
});
