/**
 * CommandChip - Clean command state indicator
 */

import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { colors, fonts, borderRadius, spacing } from "@/constants/theme";
import type { ActionType } from "@/lib/commandTypes";

const ACTION_LABELS: Record<ActionType, string> = {
  add: "Adding...",
  search: "Searching...",
  delete: "Deleting...",
  archive: "Archiving...",
};

interface CommandChipProps {
  action: ActionType;
  tags: string[];
  onClear?: () => void;
  visible?: boolean;
}

function ActionBadge({ action }: { action: ActionType }) {
  return (
    <View style={styles.actionBadge}>
      <Text style={styles.actionText}>{ACTION_LABELS[action]}</Text>
    </View>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <View style={styles.tagBadge}>
      <Text style={styles.tagText}>#{tag}</Text>
    </View>
  );
}

function ClearButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.clearButton}
      accessibilityLabel="Clear command"
      accessibilityRole="button"
    >
      <Text style={styles.clearButtonText}>×</Text>
    </Pressable>
  );
}

export function CommandChip({
  action,
  tags,
  onClear,
  visible = true,
}: CommandChipProps) {
  const isDefaultState = action === "add" && tags.length === 0;
  if (isDefaultState || !visible) {
    return null;
  }

  const showActionBadge = action !== "add";

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.container}
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
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.sm,
  },
  actionBadge: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.secondary,
  },
  tagBadge: {
    backgroundColor: "#DCFCE7", // Green 100
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  tagText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: "#16A34A", // Green 600
  },
  clearButton: {
    marginLeft: "auto",
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: colors.muted,
  },
  clearButtonText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.secondary,
  },
});
