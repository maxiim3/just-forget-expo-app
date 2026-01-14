/**
 * CommandInput - Main unified command input component
 *
 * Composes HighlightedTextInput, CommandChip, and VoiceButton into a
 * complete command input interface. Fixed at the bottom of the screen
 * with proper keyboard handling and safe area support.
 *
 * Layout:
 * ┌─────────────────────────────────────────────────┐
 * │  [Searching...]  [#work]  [#urgent]         [×] │  <- CommandChip
 * ├─────────────────────────────────────────────────┤
 * │  [search #work meeting tomorrow        ] [mic] │  <- Input row
 * └─────────────────────────────────────────────────┘
 *
 * @example
 * <CommandInput
 *   onSubmit={(parsed) => {
 *     if (parsed.action === 'add') {
 *       store.addEntry(parsed.content);
 *     }
 *   }}
 * />
 */

import { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HighlightedTextInput } from "./HighlightedTextInput";
import { CommandChip } from "./CommandChip";
import { VoiceButton } from "./VoiceButton";
import { parseCommand } from "@/lib/commandParser";
import type { ParsedCommand } from "@/lib/commandTypes";
import { colors, spacing, borderRadius } from "@/constants/theme";

interface CommandInputProps {
  /** Called when user submits the command (press enter/send) */
  onSubmit: (command: ParsedCommand) => void;
  /** Initial text value for the input */
  initialValue?: string;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Auto-focus the input on mount */
  autoFocus?: boolean;
}

export function CommandInput({
  onSubmit,
  initialValue = "",
  placeholder = "Drop a thought...",
  autoFocus = false,
}: CommandInputProps) {
  const [text, setText] = useState(initialValue);
  const insets = useSafeAreaInsets();

  // Parse on every keystroke for real-time highlighting
  const parsed = parseCommand(text);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onSubmit(parsed);
    setText(""); // Clear after submit
  }, [text, parsed, onSubmit]);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View
        style={[
          styles.wrapper,
          { paddingBottom: Math.max(insets.bottom, spacing.sm) },
        ]}
      >
        {/* Command chip row - shows action state and tags */}
        <CommandChip
          action={parsed.action}
          tags={parsed.tags}
          onClear={handleClear}
        />

        {/* Input row with text input and voice button */}
        <View style={styles.inputRow}>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrapper: {
    backgroundColor: colors.surface,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    // Subtle shadow for visual separation from content
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android elevation
    elevation: 8,
    // Top border for additional separation
    borderTopWidth: 1,
    borderTopColor: colors.muted,
    borderTopLeftRadius: borderRadius.sketch,
    borderTopRightRadius: borderRadius.sketch,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
  },
});
