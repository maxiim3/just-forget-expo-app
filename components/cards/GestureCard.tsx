import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { cardDimensions } from "@/constants/theme";

const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 300;
const DIRECTION_LOCK_RATIO = 0.6;

interface GestureCardProps {
  isActive: boolean;
  isSelected: boolean;
  stackPosition: number;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: ReactNode;
}

type SwipeDirection = "up" | "down" | "left" | "right" | null;

function determineSwipeDirection(
  translationX: number,
  translationY: number,
  velocityX: number,
  velocityY: number
): SwipeDirection {
  "worklet";
  const absX = Math.abs(translationX);
  const absY = Math.abs(translationY);

  // Check if minimum threshold met (either distance or velocity)
  const meetsDistanceThreshold =
    absX >= SWIPE_THRESHOLD || absY >= SWIPE_THRESHOLD;
  const meetsVelocityThreshold =
    Math.abs(velocityX) >= VELOCITY_THRESHOLD ||
    Math.abs(velocityY) >= VELOCITY_THRESHOLD;

  if (!meetsDistanceThreshold && !meetsVelocityThreshold) {
    return null;
  }

  // Determine primary direction using ratio
  const total = absX + absY;
  if (total === 0) return null;

  const horizontalRatio = absX / total;

  if (horizontalRatio > DIRECTION_LOCK_RATIO) {
    // Horizontal swipe
    return translationX > 0 ? "right" : "left";
  } else if (horizontalRatio < 1 - DIRECTION_LOCK_RATIO) {
    // Vertical swipe
    return translationY > 0 ? "down" : "up";
  }

  // Diagonal - no action
  return null;
}

export function GestureCard({
  isActive,
  isSelected,
  stackPosition,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  children,
}: GestureCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const handleSwipe = (direction: SwipeDirection) => {
    switch (direction) {
      case "up":
        onSwipeUp();
        break;
      case "down":
        onSwipeDown();
        break;
      case "left":
        onSwipeLeft();
        break;
      case "right":
        onSwipeRight();
        break;
    }
  };

  const panGesture = Gesture.Pan()
    .enabled(isActive)
    .activeOffsetX([-15, 15])
    .activeOffsetY([-15, 15])
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      // Subtle rotation based on horizontal movement
      rotation.value = interpolate(
        event.translationX,
        [-200, 0, 200],
        [-4, 0, 4]
      );
    })
    .onEnd((event) => {
      const direction = determineSwipeDirection(
        event.translationX,
        event.translationY,
        event.velocityX,
        event.velocityY
      );

      if (direction) {
        runOnJS(handleSwipe)(direction);
      }

      // Spring back to original position (snappy, minimal bounce)
      translateX.value = withSpring(0, { damping: 20, stiffness: 400 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 400 });
      rotation.value = withSpring(0, { damping: 20, stiffness: 400 });
    });

  // Static style for inactive cards (no animation needed)
  const staticStackStyle = !isActive
    ? {
        transform: [
          { translateY: -stackPosition * cardDimensions.stackOffset },
          { scale: Math.pow(cardDimensions.stackScale, stackPosition) },
        ],
        opacity: Math.pow(cardDimensions.opacityBase, stackPosition),
        zIndex: 10 - stackPosition,
      }
    : undefined;

  // Animated style ONLY for the active card
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  // Overlay styles - fade in based on swipe direction
  const overlayRightStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const overlayLeftStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, -SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const overlayDownStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const overlayUpStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, -SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  // Combine styles: use animated style for active, static for inactive
  const cardStyle = isActive
    ? [styles.cardContainer, animatedCardStyle, { opacity: 1, zIndex: 10 }]
    : [styles.cardContainer, staticStackStyle];

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={cardStyle}>
        {children}

        {/* Swipe overlays - only show on active card */}
        {isActive && (
          <>
            {/* Right overlay - Edit */}
            <Animated.View style={[styles.overlay, styles.overlayEdit, overlayRightStyle]}>
              <Text style={styles.overlayText}>Edit</Text>
            </Animated.View>

            {/* Left overlay - Select/Unselect */}
            <Animated.View style={[styles.overlay, styles.overlaySelect, overlayLeftStyle]}>
              <Text style={styles.overlayText}>{isSelected ? "Unselect" : "Select"}</Text>
            </Animated.View>

            {/* Down overlay - Next */}
            <Animated.View style={[styles.overlay, styles.overlayNext, overlayDownStyle]}>
              <Text style={styles.overlayText}>Next</Text>
            </Animated.View>

            {/* Up overlay - Disabled (prev is handled by bottom card) */}
          </>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayEdit: {
    backgroundColor: "rgba(22, 163, 74, 0.9)", // success green
  },
  overlaySelect: {
    backgroundColor: "rgba(255, 107, 107, 0.9)", // accent red
  },
  overlayNext: {
    backgroundColor: "rgba(45, 45, 45, 0.9)", // primary dark
  },
  overlayPrev: {
    backgroundColor: "rgba(45, 45, 45, 0.9)", // primary dark
  },
  overlayText: {
    fontFamily: "PermanentMarker_400Regular",
    fontSize: 32,
    color: "#FFFFFF",
  },
});
