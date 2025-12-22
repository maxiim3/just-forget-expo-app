import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useAppStore } from "@/lib/store";

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
          translateY: withSpring(count > 0 ? 0 : 100, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
      opacity: withTiming(count > 0 ? 1 : 0, { duration: 200 }),
    };
  });

  if (count === 0) return null;

  return (
    <Animated.View
      style={[animatedStyle]}
      className="absolute bottom-24 left-4 right-4 bg-surface border-4 border-primary rounded-sketch p-4 shadow-lg"
    >
      {/* Header with count and close */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-marker text-xl text-primary">
          {count} selected
        </Text>
        <Pressable
          onPress={clearSelection}
          className="w-8 h-8 bg-muted rounded-full items-center justify-center"
        >
          <Text className="text-secondary text-lg">×</Text>
        </Pressable>
      </View>

      {/* Action buttons */}
      <View className="flex-row gap-3">
        {/* Archive */}
        <Pressable
          onPress={archiveSelected}
          className="flex-1 py-3 bg-accent/20 border-2 border-accent rounded-sketch items-center active:opacity-80"
        >
          <Text className="font-caveat text-lg text-accent">Archive</Text>
        </Pressable>

        {/* Delete */}
        <Pressable
          onPress={deleteSelected}
          className="flex-1 py-3 bg-red-100 border-2 border-red-500 rounded-sketch items-center active:opacity-80"
        >
          <Text className="font-caveat text-lg text-red-500">Delete</Text>
        </Pressable>

        {/* Tags (stubbed) */}
        <Pressable
          onPress={() => {
            // TODO: Implement tag picker
            console.log("Tags feature coming soon");
          }}
          className="flex-1 py-3 bg-muted border-2 border-secondary rounded-sketch items-center active:opacity-80"
        >
          <Text className="font-caveat text-lg text-secondary">Tags</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
