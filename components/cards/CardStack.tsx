import { useRef, useCallback } from "react";
import { View, Text } from "react-native";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { SwipeCard } from "./SwipeCard";
import { useAppStore } from "@/lib/store";
import type { Entry } from "@/lib/supabase";
import { cardDimensions } from "@/constants/theme";

export function CardStack() {
  const swiperRef = useRef<SwiperCardRefType>(null);
  const entries = useAppStore((state) => state.entries);
  const setCurrentCardIndex = useAppStore((state) => state.setCurrentCardIndex);
  const setEditDrawerEntry = useAppStore((state) => state.setEditDrawerEntry);

  // Filter out archived entries
  const activeEntries = entries.filter((e) => !e.archived);

  const handleSwipeRight = useCallback(
    (index: number) => {
      const entry = activeEntries[index];
      if (entry) {
        setEditDrawerEntry(entry);
      }
    },
    [activeEntries, setEditDrawerEntry]
  );

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentCardIndex(index);
    },
    [setCurrentCardIndex]
  );

  const renderCard = useCallback(
    (entry: Entry) => <SwipeCard entry={entry} />,
    []
  );

  const OverlayLeft = useCallback(
    () => (
      <View className="flex-1 items-center justify-center bg-success/90 rounded-sketch">
        <Text className="font-marker text-4xl text-white">Keep</Text>
      </View>
    ),
    []
  );

  const OverlayRight = useCallback(
    () => (
      <View className="flex-1 items-center justify-center bg-primary/90 rounded-sketch">
        <Text className="font-marker text-4xl text-white">Actions</Text>
      </View>
    ),
    []
  );

  if (activeEntries.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-marker text-3xl text-secondary mb-4">
          All clear!
        </Text>
        <Text className="font-caveat text-xl text-secondary text-center px-8">
          Your inbox is empty. Swipe up to add a new thought.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Swiper
        ref={swiperRef}
        data={activeEntries}
        renderCard={renderCard}
        cardStyle={{
          width: cardDimensions.width,
          height: cardDimensions.height,
        }}
        onSwipeRight={handleSwipeRight}
        onIndexChange={handleIndexChange}
        OverlayLabelLeft={OverlayLeft}
        OverlayLabelRight={OverlayRight}
      />

      {/* Card counter */}
      <View className="absolute bottom-8">
        <Text className="font-caveat text-xl text-secondary">
          {activeEntries.length} {activeEntries.length === 1 ? "thought" : "thoughts"} remaining
        </Text>
      </View>
    </View>
  );
}
