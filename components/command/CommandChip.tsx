/**
 * CommandChip Component
 *
 * Displays the detected command action as a chip/badge above the input.
 * Shows action state ("Adding...", "Searching...", etc.) and tag badges.
 */

import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { colors, fonts, borderRadius, spacing } from "@/constants/theme";
import type { ActionType } from "@/lib/commandTypes";

/**
 * Maps action types to user-friendly display labels
 */
const ACTION_LABELS: Record<ActionType, string> = {
  add: "Adding...",
  search: "Searching...",
  delete: "Deleting...",
  archive: "Archiving...",
};

interface CommandChipProps {
  /** The detected action type */
  action: ActionType;
  /** Extracted tags without # prefix */
  tags: string[];
  /** Optional callback when clear button is pressed */
  onClear?: () => void;
  /** Control visibility for animation (defaults to true) */
  visible?: boolean;
}

/**
 * ActionBadge - Displays the current action state
 */
function ActionBadge({ action }: { action: ActionType }) {
  return (
    <View style={styles.actionBadge}>
      <Text style={styles.actionText}>{ACTION_LABELS[action]}</Text>
    </View>
  );
}

/**
 * TagBadge - Displays a single tag with # prefix
 */
function TagBadge({ tag }: { tag: string }) {
  return (
    <View style={styles.tagBadge}>
      <Text style={styles.tagText}>#{tag}</Text>
    </View>
  );
}

/**
 * ClearButton - Dismiss button for the chip row
 */
function ClearButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.clearButton}
      accessibilityLabel="Clear command"
      accessibilityRole="button"
      accessibilityHint="Clears the current command input"
    >
      <Text style={styles.clearButtonText}>×</Text>
    </Pressable>
  );
}

/**
 * CommandChip - Main component
 *
 * Displays action state and tags in a horizontal chip row.
 * Hidden when action is 'add' with no tags (default/empty state).
 */
export function CommandChip({
  action,
  tags,
  onClear,
  visible = true,
}: CommandChipProps) {
  // Don't render for default state (add with no tags)
  const isDefaultState = action === "add" && tags.length === 0;
  if (isDefaultState || !visible) {
    return null;
  }

  // Only show action badge if not default 'add' action
  const showActionBadge = action !== "add";

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.container}
      accessible
      accessibilityLabel={`Command: ${ACTION_LABELS[action]}${tags.length > 0 ? `, tags: ${tags.join(", ")}` : ""}`}
    >
      <View style={styles.chipRow}>
        {showActionBadge && <ActionBadge action={action} />}

        {tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}

        {onClear && <ClearButton onPress={onClear} />}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.sm,
  },
  actionBadge: {
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontFamily: fonts.caveat,
    fontSize: 18,
    color: colors.primary,
  },
  tagBadge: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  tagText: {
    fontFamily: fonts.caveat,
    fontSize: 16,
    color: colors.surface,
  },
  clearButton: {
    marginLeft: "auto",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.sm,
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  clearButtonText: {
    fontFamily: fonts.caveat,
    fontSize: 20,
    color: colors.secondary,
    lineHeight: 22,
  },
});
