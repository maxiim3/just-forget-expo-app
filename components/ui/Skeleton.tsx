import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { cardDimensions } from "@/constants/theme";

/**
 * Animated skeleton loader matching the card dimensions.
 * Pulses opacity for a smooth loading effect with sketch aesthetic.
 */
export function CardSkeleton() {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        { width: cardDimensions.width, height: cardDimensions.height },
      ]}
      className="bg-muted border-4 border-secondary/30 rounded-sketch p-6"
    >
      {/* Content type badge skeleton */}
      <View className="bg-secondary/20 h-6 w-16 rounded-sketch mb-4" />

      {/* Text line skeletons */}
      <View className="bg-secondary/20 h-5 w-full rounded mb-3" />
      <View className="bg-secondary/20 h-5 w-11/12 rounded mb-3" />
      <View className="bg-secondary/20 h-5 w-4/5 rounded mb-3" />
      <View className="bg-secondary/20 h-5 w-3/4 rounded mb-3" />
      <View className="bg-secondary/20 h-5 w-1/2 rounded" />

      {/* Timestamp skeleton at bottom */}
      <View className="absolute bottom-4 right-4">
        <View className="bg-secondary/20 h-4 w-20 rounded" />
      </View>
    </Animated.View>
  );
}

/**
 * Simple loading spinner with sketch aesthetic.
 */
export function LoadingSpinner({ size = 40 }: { size?: number }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[animatedStyle, { width: size, height: size }]}
      className="border-4 border-muted border-t-primary rounded-full"
    />
  );
}
