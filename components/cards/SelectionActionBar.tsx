import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useAppStore } from "@/lib/store";
import { colors, fonts, borderRadius, spacing } from "@/constants/theme";

export function SelectionActionBar() {
  const selectedEntryIds = useAppStore((state) => state.selectedEntryIds);
  const clearSelection = useAppStore((state) => state.clearSelection);
  const archiveSelected = useAppStore((state) => state.archiveSelected);
  const deleteSelected = useAppStore((state) => state.deleteSelected);

  const count = selectedEntryIds.size;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(count > 0 ? 0 : 60, {
            damping: 25,
            stiffness: 120,
          }),
        },
      ],
      opacity: withTiming(count > 0 ? 1 : 0, { duration: 150 }),
    };
  });

  if (count === 0) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.bar}>
        {/* Count */}
        <Text style={styles.countText}>{count} selected</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Actions */}
        <Pressable
          onPress={archiveSelected}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
        >
          <Text style={styles.actionText}>Archive</Text>
        </Pressable>

        <Pressable
          onPress={deleteSelected}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
        >
          <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Close */}
        <Pressable
          onPress={clearSelection}
          style={({ pressed }) => [styles.closeButton, pressed && styles.actionPressed]}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 160, // Above input and tab bar
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Platform.OS === "web"
      ? "rgba(15, 23, 42, 0.90)" // Slate 900
      : colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
    ...(Platform.OS === "web" && {
      backdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)",
    }),
  },
  countText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
  },
  actionPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  actionText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: "#FFFFFF",
  },
  actionTextDanger: {
    color: "#FCA5A5", // Red 300
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  closeText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
