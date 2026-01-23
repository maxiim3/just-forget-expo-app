/**
 * Grid View - Animated grid of all thoughts
 * Cards explode into position when switching from stack view.
 */

import { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Modal,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  interpolate,
  withDelay,
  withSpring,
  Extrapolation,
} from "react-native-reanimated";
import { useAppStore, useFilteredEntries } from "@/lib/store";
import { useLayout } from "@/contexts/LayoutContext";
import { EditModal } from "@/components/cards/EditModal";
import { CommandInput } from "@/components/command";
import { colors, fonts, borderRadius, spacing, shadows } from "@/constants/theme";
import type { Entry } from "@/lib/supabase";
import type { ParsedCommand } from "@/lib/commandTypes";

const CARD_GAP = 12;
const CARD_MIN_WIDTH = 160;

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AnimatedGridCard({
  entry,
  index,
  cardWidth,
  onPress,
  onLongPress,
  isArchived = false,
}: {
  entry: Entry;
  index: number;
  cardWidth: number;
  onPress: () => void;
  onLongPress: () => void;
  isArchived?: boolean;
}) {
  const { progress, getStaggerDelay } = useLayout();
  const staggerDelay = getStaggerDelay(index);

  // Animate from center (stacked) to grid position
  const animatedStyle = useAnimatedStyle(() => {
    // Scale from 0.8 to 1
    const scale = interpolate(
      progress.value,
      [0, 1],
      [0.85, 1],
      Extrapolation.CLAMP
    );

    // Fade in
    const opacity = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, 0.5, 1],
      Extrapolation.CLAMP
    );

    // Start from center offset, move to final position
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [50, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }, { translateY }],
      opacity,
    };
  });

  return (
    <AnimatedPressable
      style={[
        styles.gridCard,
        { width: cardWidth },
        isArchived && styles.gridCardArchived,
        animatedStyle,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
    >
      <Text style={styles.cardContent} numberOfLines={5}>
        {entry.content}
      </Text>
      <Text style={styles.cardTimestamp}>
        {formatRelativeTime(entry.updated_at)}
      </Text>
    </AnimatedPressable>
  );
}

export default function GridScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const entries = useAppStore((state) => state.entries);
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);
  const archiveEntry = useAppStore((state) => state.archiveEntry);
  const deleteEntry = useAppStore((state) => state.deleteEntry);
  const addEntry = useAppStore((state) => state.addEntry);
  const setActiveFilter = useAppStore((state) => state.setActiveFilter);
  const activeFilter = useAppStore((state) => state.activeFilter);
  const clearFilter = useAppStore((state) => state.clearFilter);

  const [menuEntry, setMenuEntry] = useState<Entry | null>(null);

  // Responsive grid: calculate columns based on screen width
  const horizontalPadding = 40; // 20px each side
  const availableWidth = screenWidth - horizontalPadding;
  const columns = Math.max(2, Math.floor(availableWidth / (CARD_MIN_WIDTH + CARD_GAP)));
  const cardWidth = (availableWidth - (columns - 1) * CARD_GAP) / columns;

  const filteredEntries = useFilteredEntries();
  const activeEntries = filteredEntries.filter((e) => !e.archived);
  const archivedEntries = entries.filter((e) => e.archived);

  const isFiltering = activeFilter.query.length > 0 || activeFilter.tags.length > 0;

  const handleCommand = (command: ParsedCommand) => {
    switch (command.action) {
      case "add":
        const newEntry: Entry = {
          id: crypto.randomUUID(),
          user_id: "local",
          content: command.content,
          archived: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        addEntry(newEntry);
        break;
      case "search":
        setActiveFilter({ query: command.content, tags: command.tags });
        break;
      case "delete":
      case "archive":
        break;
    }
  };

  const handleArchive = () => {
    if (menuEntry) {
      archiveEntry(menuEntry.id);
      setMenuEntry(null);
    }
  };

  const handleDelete = () => {
    if (!menuEntry) return;

    if (Platform.OS === "web") {
      if (window.confirm("Delete this thought? This cannot be undone.")) {
        deleteEntry(menuEntry.id);
        setMenuEntry(null);
      }
    } else {
      Alert.alert(
        "Delete thought",
        "Are you sure? This cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteEntry(menuEntry.id);
              setMenuEntry(null);
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>All Thoughts</Text>
            <Text style={styles.headerSubtitle}>
              {activeEntries.length} active · {archivedEntries.length} archived
            </Text>
          </View>

          {/* Active entries grid */}
          {activeEntries.length > 0 && (
            <View style={styles.grid}>
              {activeEntries.map((entry, index) => (
                <AnimatedGridCard
                  key={entry.id}
                  entry={entry}
                  index={index}
                  cardWidth={cardWidth}
                  onPress={() => setEditingEntry(entry)}
                  onLongPress={() => setMenuEntry(entry)}
                />
              ))}
            </View>
          )}

          {/* Archived section */}
          {archivedEntries.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Archived</Text>
              </View>
              <View style={styles.grid}>
                {archivedEntries.map((entry, index) => (
                  <AnimatedGridCard
                    key={entry.id}
                    entry={entry}
                    index={activeEntries.length + index}
                    cardWidth={cardWidth}
                    onPress={() => setEditingEntry(entry)}
                    onLongPress={() => setMenuEntry(entry)}
                    isArchived
                  />
                ))}
              </View>
            </>
          )}

          {/* Empty state - no search results */}
          {isFiltering && activeEntries.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No matches found</Text>
              <Text style={styles.emptySubtitle}>
                Try different keywords or clear the filter
              </Text>
              <Pressable
                onPress={clearFilter}
                style={({ pressed }) => [
                  styles.clearFilterButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.clearFilterText}>Clear filter</Text>
              </Pressable>
            </View>
          )}

          {/* Empty state - truly empty */}
          {!isFiltering && entries.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No thoughts yet</Text>
              <Text style={styles.emptySubtitle}>
                Go to Swipe to add your first thought
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <CommandInput onSubmit={handleCommand} placeholder="Drop a thought..." />

      <EditModal />

      {/* Context menu modal */}
      <Modal
        visible={!!menuEntry}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuEntry(null)}
      >
        <Pressable
          style={styles.menuOverlay}
          onPress={() => setMenuEntry(null)}
        >
          <View style={styles.menuContent}>
            <Pressable
              style={({ pressed }) => [
                styles.menuButton,
                pressed && styles.menuButtonPressed,
              ]}
              onPress={handleArchive}
            >
              <Text style={styles.menuButtonText}>Archive</Text>
            </Pressable>
            <View style={styles.menuDivider} />
            <Pressable
              style={({ pressed }) => [
                styles.menuButton,
                pressed && styles.menuButtonPressed,
              ]}
              onPress={handleDelete}
            >
              <Text style={[styles.menuButtonText, styles.menuButtonTextDanger]}>Delete</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 200, // Room for input + floating tab bar
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 24,
    color: colors.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
    paddingBottom: 24,
  },
  gridCard: {
    minHeight: 140,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.sm,
  },
  gridCardArchived: {
    opacity: 0.6,
  },
  cardContent: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.primary,
    lineHeight: 20,
    flex: 1,
  },
  cardTimestamp: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.tertiary,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sectionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.tertiary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: colors.secondary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.tertiary,
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  clearFilterButton: {
    backgroundColor: colors.muted,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: borderRadius.lg,
  },
  clearFilterText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.primary,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: {
    minWidth: 160,
    backgroundColor: Platform.OS === "web"
      ? "rgba(255, 255, 255, 0.95)"
      : colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
    ...(Platform.OS === "web" && {
      backdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
    }),
  },
  menuButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuButtonPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  menuButtonText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  menuButtonTextDanger: {
    color: colors.error,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
