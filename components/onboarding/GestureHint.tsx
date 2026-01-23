import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface GestureHintProps {
  direction: "up" | "down" | "left" | "right";
}

/**
 * Animated directional arrow hint for onboarding.
 * Pulses in the swipe direction to guide users.
 */
export function GestureHint({ direction }: GestureHintProps) {
  const offset = useSharedValue(0);

  useEffect(() => {
    const distance = 15;
    offset.value = withRepeat(
      withSequence(
        withTiming(distance, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    switch (direction) {
      case "up":
        return { transform: [{ translateY: -offset.value }] };
      case "down":
        return { transform: [{ translateY: offset.value }] };
      case "left":
        return { transform: [{ translateX: -offset.value }] };
      case "right":
        return { transform: [{ translateX: offset.value }] };
    }
  });

  const rotations: Record<string, string> = {
    up: "-90deg",
    down: "90deg",
    left: "180deg",
    right: "0deg",
  };

  return (
    <View className="w-20 h-20 items-center justify-center">
      <Animated.View style={animatedStyle}>
        <Text
          className="font-marker text-5xl text-primary"
          style={{ transform: [{ rotate: rotations[direction] }] }}
        >
          {"\u2192"}
        </Text>
      </Animated.View>
    </View>
  );
}
