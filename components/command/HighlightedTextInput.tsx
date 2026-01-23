/**
 * HighlightedTextInput - TextInput with syntax highlighting overlay
 */

import { View, TextInput, Text, StyleSheet } from "react-native";
import type { Token, TokenType } from "@/lib/commandTypes";
import { colors, fonts, borderRadius } from "@/constants/theme";

const TOKEN_COLORS: Record<TokenType, string> = {
  action: "#2563EB",   // Blue 600
  tag: "#16A34A",      // Green 600
  date: "#7C3AED",     // Violet 600
  text: colors.primary,
};

interface HighlightedTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  tokens: Token[];
  autoFocus?: boolean;
}

interface ColorSegment {
  text: string;
  color: string;
  key: string;
}

function buildColorSegments(input: string, tokens: Token[]): ColorSegment[] {
  if (!input) return [];

  const segments: ColorSegment[] = [];
  let currentPos = 0;

  for (const token of tokens) {
    if (token.start > currentPos) {
      const gapText = input.slice(currentPos, token.start);
      segments.push({
        text: gapText,
        color: TOKEN_COLORS.text,
        key: `gap-${currentPos}`,
      });
    }

    segments.push({
      text: token.raw,
      color: TOKEN_COLORS[token.type],
      key: `${token.type}-${token.start}`,
    });

    currentPos = token.end;
  }

  if (currentPos < input.length) {
    segments.push({
      text: input.slice(currentPos),
      color: TOKEN_COLORS.text,
      key: `tail-${currentPos}`,
    });
  }

  return segments;
}

export function HighlightedTextInput({
  value,
  onChangeText,
  onSubmitEditing,
  placeholder,
  tokens,
  autoFocus = false,
}: HighlightedTextInputProps) {
  const segments = buildColorSegments(value, tokens);

  return (
    <View style={styles.container}>
      {/* Syntax highlighting overlay */}
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.overlayText}>
          {segments.map((segment) => (
            <Text key={segment.key} style={{ color: segment.color }}>
              {segment.text}
            </Text>
          ))}
        </Text>
      </View>

      {/* Actual TextInput */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.tertiary}
        selectionColor={colors.accent}
        returnKeyType="send"
        blurOnSubmit={false}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Command input"
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Enter" && onSubmitEditing) {
            e.preventDefault?.();
            onSubmitEditing();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    color: "transparent",
    fontFamily: fonts.regular,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    pointerEvents: "none",
    justifyContent: "center",
  },
  overlayText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    flexShrink: 0,
  },
});
