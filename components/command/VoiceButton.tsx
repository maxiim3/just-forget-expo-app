/**
 * VoiceButton - Clean voice input placeholder
 */

import { Pressable, Text, Alert, StyleSheet } from "react-native";
import { colors, borderRadius } from "@/constants/theme";

interface VoiceButtonProps {
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
    width: 40,
    height: 40,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 18,
  },
});
