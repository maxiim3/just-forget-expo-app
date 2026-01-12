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
import { cardDimensions, gestureConfig } from "@/constants/theme";

// Use centralized gesture configuration
const { swipeThreshold, velocityThreshold, directionLockRatio, spring, rotation } = gestureConfig;

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
  const absX = Math.abs(translationX);
  const absY = Math.abs(translationY);

  // Check if minimum threshold met (either distance or velocity)
  const meetsDistanceThreshold =
    absX >= swipeThreshold || absY >= swipeThreshold;
  const meetsVelocityThreshold =
    Math.abs(velocityX) >= velocityThreshold ||
    Math.abs(velocityY) >= velocityThreshold;

  if (!meetsDistanceThreshold && !meetsVelocityThreshold) {
    return null;
  }

  // Determine primary direction using ratio
  const total = absX + absY;
  if (total === 0) return null;

  const horizontalRatio = absX / total;

  if (horizontalRatio > directionLockRatio) {
    // Horizontal swipe
    return translationX > 0 ? "right" : "left";
  } else if (horizontalRatio < 1 - directionLockRatio) {
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
  const cardRotation = useSharedValue(0);

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
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      // Slight rotation based on horizontal movement
      cardRotation.value = interpolate(
        event.translationX,
        [-rotation.translationRange, 0, rotation.translationRange],
        [-rotation.maxDegrees, 0, rotation.maxDegrees]
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

      // Spring back to original position with tuned feel
      translateX.value = withSpring(0, spring);
      translateY.value = withSpring(0, spring);
      cardRotation.value = withSpring(0, spring);
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    // Stack depth visualization for non-active cards
    const stackOffsetY = -stackPosition * cardDimensions.stackOffset;
    const stackScale = Math.pow(cardDimensions.stackScale, stackPosition);
    // Smooth exponential fade for 10 visible cards (never fully disappear)
    const stackOpacity = Math.pow(cardDimensions.opacityBase, stackPosition);

    if (!isActive) {
      return {
        transform: [
          { translateY: stackOffsetY },
          { scale: stackScale },
        ],
        opacity: stackOpacity,
        zIndex: 10 - stackPosition,
      };
    }

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${cardRotation.value}deg` },
      ],
      opacity: 1,
      zIndex: 10,
    };
  });

  // Overlay styles - fade in based on swipe direction
  const overlayRightStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, swipeThreshold],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const overlayLeftStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, -swipeThreshold],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const overlayDownStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, swipeThreshold],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const overlayUpStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, -swipeThreshold],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
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
