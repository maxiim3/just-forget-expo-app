/**
 * CommandInput - Clean, minimal command input
 */

import { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HighlightedTextInput } from "./HighlightedTextInput";
import { CommandChip } from "./CommandChip";
import { CommandHelp } from "./CommandHelp";
import { VoiceButton } from "./VoiceButton";
import { parseCommand } from "@/lib/commandParser";
import type { ParsedCommand } from "@/lib/commandTypes";
import { colors, spacing, borderRadius, shadows, fonts } from "@/constants/theme";

interface CommandInputProps {
  onSubmit: (command: ParsedCommand) => void;
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function CommandInput({
  onSubmit,
  initialValue = "",
  placeholder = "Drop a thought...",
  autoFocus = false,
}: CommandInputProps) {
  const [text, setText] = useState(initialValue);
  const [showHelp, setShowHelp] = useState(false);
  const insets = useSafeAreaInsets();

  const parsed = parseCommand(text);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onSubmit(parsed);
    setText("");
  }, [text, parsed, onSubmit]);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={[
          styles.wrapper,
          { paddingBottom: Math.max(insets.bottom, spacing.md) + 88 }, // Clear floating tab bar (48 + 24 + 16)
        ]}
      >
        <View style={[styles.inputContainer, shadows.md]}>
          {/* Command chip row */}
          <CommandChip
            action={parsed.action}
            tags={parsed.tags}
            onClear={handleClear}
          />

          {/* Input row */}
          <View style={styles.inputRow}>
            <Pressable
              onPress={() => setShowHelp(true)}
              style={styles.helpButton}
              accessibilityRole="button"
              accessibilityLabel="Show command syntax help"
            >
              <Text style={styles.helpButtonText}>?</Text>
            </Pressable>

            <View style={styles.inputWrapper}>
              <HighlightedTextInput
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSubmit}
                tokens={parsed.tokens}
                placeholder={placeholder}
                autoFocus={autoFocus}
              />
            </View>
            <VoiceButton />
          </View>
        </View>
      </View>

      <CommandHelp visible={showHelp} onClose={() => setShowHelp(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: 560,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  inputContainer: {
    backgroundColor: Platform.OS === "web"
      ? "rgba(255, 255, 255, 0.85)"
      : colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    // Web glassmorphism
    ...(Platform.OS === "web" && {
      backdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    }),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  helpButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.secondary,
  },
});
