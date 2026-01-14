/**
 * HighlightedTextInput - TextInput with syntax highlighting overlay
 *
 * Uses the overlay technique to achieve syntax highlighting in React Native:
 * 1. TextInput with transparent text (cursor remains visible)
 * 2. Absolutely positioned Text overlay with colored spans
 * 3. Overlay has pointerEvents="none" to pass touches to TextInput
 *
 * @example
 * const [text, setText] = useState('');
 * const tokens = tokenize(text);
 * <HighlightedTextInput
 *   value={text}
 *   onChangeText={setText}
 *   tokens={tokens}
 *   placeholder="Type a command..."
 * />
 */

import { View, TextInput, Text, StyleSheet } from "react-native";
import type { Token, TokenType } from "@/lib/commandTypes";
import { colors, fonts } from "@/constants/theme";

/**
 * Color mapping for each token type.
 * Matches the design system colors.
 */
const TOKEN_COLORS: Record<TokenType, string> = {
  action: colors.accent, // #FF6B6B - command keywords
  tag: colors.success, // #16A34A - #hashtags
  date: "#3B82F6", // blue - date keywords
  text: colors.primary, // #2D2D2D - regular text
};

interface HighlightedTextInputProps {
  /** Current input value */
  value: string;
  /** Called when text changes */
  onChangeText: (text: string) => void;
  /** Called when user presses submit/enter */
  onSubmitEditing?: () => void;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Tokens from commandParser for syntax highlighting */
  tokens: Token[];
  /** Auto-focus the input on mount */
  autoFocus?: boolean;
}

/**
 * Represents a segment of text to render with a specific color.
 * Covers the entire input string with no gaps.
 */
interface ColorSegment {
  text: string;
  color: string;
  key: string;
}

/**
 * Builds an array of colored segments covering the full input string.
 * Fills gaps between tokens with the default text color.
 *
 * @param input - Full input string
 * @param tokens - Parsed tokens with position info
 * @returns Array of segments for rendering
 */
function buildColorSegments(input: string, tokens: Token[]): ColorSegment[] {
  if (!input) return [];

  const segments: ColorSegment[] = [];
  let currentPos = 0;

  // Tokens should already be sorted by start position from parser
  for (const token of tokens) {
    // Fill gap before this token with default text color
    if (token.start > currentPos) {
      const gapText = input.slice(currentPos, token.start);
      segments.push({
        text: gapText,
        color: TOKEN_COLORS.text,
        key: `gap-${currentPos}`,
      });
    }

    // Add the token with its color
    segments.push({
      text: token.raw,
      color: TOKEN_COLORS[token.type],
      key: `${token.type}-${token.start}`,
    });

    currentPos = token.end;
  }

  // Fill any remaining text after the last token
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
      {/* Syntax highlighting overlay - renders colored text */}
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.overlayText}>
          {segments.map((segment) => (
            <Text key={segment.key} style={{ color: segment.color }}>
              {segment.text}
            </Text>
          ))}
        </Text>
      </View>

      {/* Actual TextInput - transparent text but visible cursor */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.secondary}
        selectionColor={colors.primary}
        returnKeyType="send"
        blurOnSubmit={false}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Command input"
        accessibilityHint="Type a command with hashtags, dates, or action keywords"
        // Web: ensure Enter triggers submit
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

/**
 * Styles using StyleSheet for performance.
 * TextInput and overlay share identical dimensions and font settings
 * to ensure perfect alignment of the overlay text with the cursor.
 */
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    // Transparent text - cursor remains visible
    color: "transparent",
    // Typography - must match overlay exactly
    fontFamily: fonts.caveat,
    fontSize: 20,
    // Spacing
    paddingHorizontal: 16,
    paddingVertical: 12,
    // Visual styling
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16, // rounded-sketch
  },
  overlay: {
    // Position over the TextInput
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Match TextInput padding exactly
    paddingHorizontal: 16,
    paddingVertical: 12,
    // Don't capture touches
    pointerEvents: "none",
    // Ensure overlay doesn't affect layout
    justifyContent: "center",
  },
  overlayText: {
    // Typography - must match input exactly
    fontFamily: fonts.caveat,
    fontSize: 20,
    // Prevent wrapping differences
    flexShrink: 0,
  },
});
