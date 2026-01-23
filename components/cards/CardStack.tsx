import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { GestureCard } from "./GestureCard";
import { SwipeCard } from "./SwipeCard";
import { PassedCardsStack } from "./PassedCardsStack";
import { useAppStore, useFilteredEntries } from "@/lib/store";
import { cardDimensions } from "@/constants/theme";

export function CardStack() {
  // useFilteredEntries applies search query, tags, and archived filter
  const activeEntries = useFilteredEntries();
  const activeFilter = useAppStore((state) => state.activeFilter);
  const clearFilter = useAppStore((state) => state.clearFilter);
  const currentCardIndex = useAppStore((state) => state.currentCardIndex);
  const setCurrentCardIndex = useAppStore((state) => state.setCurrentCardIndex);
  const selectedEntryIds = useAppStore((state) => state.selectedEntryIds);
  const toggleSelectedEntry = useAppStore((state) => state.toggleSelectedEntry);
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);

  // Check if user is actively filtering
  const isFiltering = activeFilter.query.length > 0 || activeFilter.tags.length > 0;

  const handleSwipeDown = useCallback(() => {
    // Next card
    if (currentCardIndex < activeEntries.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }, [currentCardIndex, activeEntries.length, setCurrentCardIndex]);

  // Swipe up on main card is disabled - use bottom card instead
  const handleSwipeUp = useCallback(() => {
    // No-op: previous is handled by PassedCardsStack
  }, []);

  const handleSwipeLeft = useCallback(
    (entryId: string) => {
      // Toggle selection
      toggleSelectedEntry(entryId);
    },
    [toggleSelectedEntry]
  );

  const handleSwipeRight = useCallback(
    (entryId: string) => {
      // Open edit modal directly
      const entry = activeEntries.find((e) => e.id === entryId);
      if (entry) {
        setEditingEntry(entry);
      }
    },
    [activeEntries, setEditingEntry]
  );

  if (activeEntries.length === 0) {
    if (isFiltering) {
      // No search results - show helpful message with clear action
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="font-sans-semibold text-xl text-secondary dark:text-dark-secondary mb-2">
            No matches found
          </Text>
          <Text className="font-sans text-base text-tertiary dark:text-dark-tertiary text-center px-8 mb-6">
            Try different keywords or clear the filter
          </Text>
          <Pressable
            onPress={clearFilter}
            className="bg-muted/30 dark:bg-dark-muted/30 px-6 py-3 rounded-xl active:opacity-70"
          >
            <Text className="font-sans-medium text-base text-primary dark:text-dark-primary">
              Clear filter
            </Text>
          </Pressable>
        </View>
      );
    }

    // Truly empty inbox
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-sans-bold text-2xl text-secondary dark:text-dark-secondary mb-4">
          All clear!
        </Text>
        <Text className="font-sans text-lg text-tertiary dark:text-dark-tertiary text-center px-8">
          Your inbox is empty. Use the input below to add a thought.
        </Text>
      </View>
    );
  }

  // Show current card + cards behind for depth visualization (up to 10)
  const visibleCards = activeEntries.slice(
    currentCardIndex,
    Math.min(currentCardIndex + cardDimensions.maxVisibleCards, activeEntries.length)
  );

  return (
    <View className="flex-1 items-center justify-center">
      {/* Passed cards at bottom */}
      <PassedCardsStack />

      {/* Gesture hints overlay */}
      {/* Bottom hint */}
      <View className="absolute bottom-20 z-20">
        <Text className="font-sans text-sm text-tertiary dark:text-dark-tertiary uppercase tracking-widest">
          next
        </Text>
      </View>

      {/* Left hint */}
      <View
        className="absolute left-4 z-20"
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Text className="font-sans text-sm text-tertiary dark:text-dark-tertiary uppercase tracking-widest">
          select
        </Text>
      </View>

      {/* Right hint */}
      <View
        className="absolute right-4 z-20"
        style={{ transform: [{ rotate: "90deg" }] }}
      >
        <Text className="font-sans text-sm text-tertiary dark:text-dark-tertiary uppercase tracking-widest">
          edit
        </Text>
      </View>

      {/* Render cards in reverse order so top card is rendered last (on top) */}
      {visibleCards
        .slice()
        .reverse()
        .map((entry, reversedIndex) => {
          const stackPosition = visibleCards.length - 1 - reversedIndex;
          const isActive = stackPosition === 0;

          return (
            <GestureCard
              key={entry.id}
              isActive={isActive}
              isSelected={selectedEntryIds.has(entry.id)}
              stackPosition={stackPosition}
              onSwipeUp={handleSwipeUp}
              onSwipeDown={handleSwipeDown}
              onSwipeLeft={() => handleSwipeLeft(entry.id)}
              onSwipeRight={() => handleSwipeRight(entry.id)}
            >
              <SwipeCard
                entry={entry}
                isSelected={selectedEntryIds.has(entry.id)}
              />
            </GestureCard>
          );
        })}

      {/* Card counter */}
      <View className="absolute bottom-8">
        <Text className="font-sans-medium text-sm text-tertiary dark:text-dark-tertiary">
          {currentCardIndex + 1} / {activeEntries.length}
        </Text>
      </View>
    </View>
  );
}
