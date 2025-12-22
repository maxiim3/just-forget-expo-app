import { useCallback } from "react";
import { View, Text } from "react-native";
import { GestureCard } from "./GestureCard";
import { SwipeCard } from "./SwipeCard";
import { PassedCardsStack } from "./PassedCardsStack";
import { useAppStore } from "@/lib/store";
import { cardDimensions } from "@/constants/theme";

export function CardStack() {
  const entries = useAppStore((state) => state.entries);
  const currentCardIndex = useAppStore((state) => state.currentCardIndex);
  const setCurrentCardIndex = useAppStore((state) => state.setCurrentCardIndex);
  const selectedEntryIds = useAppStore((state) => state.selectedEntryIds);
  const toggleSelectedEntry = useAppStore((state) => state.toggleSelectedEntry);
  const setEditDrawerEntry = useAppStore((state) => state.setEditDrawerEntry);

  // Filter out archived entries
  const activeEntries = entries.filter((e) => !e.archived);

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
      // Open edit drawer
      const entry = activeEntries.find((e) => e.id === entryId);
      if (entry) {
        setEditDrawerEntry(entry);
      }
    },
    [activeEntries, setEditDrawerEntry]
  );

  if (activeEntries.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-marker text-3xl text-secondary mb-4">
          All clear!
        </Text>
        <Text className="font-caveat text-xl text-secondary text-center px-8">
          Your inbox is empty. Swipe up from bottom to add a new thought.
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
        <Text className="font-caveat text-lg text-secondary">next</Text>
      </View>

      {/* Left hint */}
      <View
        className="absolute left-4 z-20"
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Text className="font-caveat text-lg text-secondary">select</Text>
      </View>

      {/* Right hint */}
      <View
        className="absolute right-4 z-20"
        style={{ transform: [{ rotate: "90deg" }] }}
      >
        <Text className="font-caveat text-lg text-secondary">edit</Text>
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
        <Text className="font-caveat text-xl text-secondary">
          {currentCardIndex + 1} / {activeEntries.length}
        </Text>
      </View>
    </View>
  );
}
