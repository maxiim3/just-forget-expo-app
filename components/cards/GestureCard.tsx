import { ReactNode } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { cardDimensions, gestureConfig, borderRadius, fonts, colors } from "@/constants/theme";

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

  const meetsDistanceThreshold =
    absX >= swipeThreshold || absY >= swipeThreshold;
  const meetsVelocityThreshold =
    Math.abs(velocityX) >= velocityThreshold ||
    Math.abs(velocityY) >= velocityThreshold;

  if (!meetsDistanceThreshold && !meetsVelocityThreshold) {
    return null;
  }

  const total = absX + absY;
  if (total === 0) return null;

  const horizontalRatio = absX / total;

  if (horizontalRatio > directionLockRatio) {
    return translationX > 0 ? "right" : "left";
  } else if (horizontalRatio < 1 - directionLockRatio) {
    return translationY > 0 ? "down" : "up";
  }

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

      translateX.value = withSpring(0, spring);
      translateY.value = withSpring(0, spring);
      cardRotation.value = withSpring(0, spring);
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const stackOffsetY = -stackPosition * cardDimensions.stackOffset;
    const stackScale = Math.pow(cardDimensions.stackScale, stackPosition);
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

  // Overlay styles with high opacity for readability
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

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
        {children}

        {isActive && (
          <>
            {/* Right overlay - Edit (Blue) */}
            <Animated.View style={[styles.overlay, styles.overlayEdit, overlayRightStyle]}>
              <Text style={styles.overlayText}>EDIT</Text>
            </Animated.View>

            {/* Left overlay - Select (Green) */}
            <Animated.View style={[styles.overlay, styles.overlaySelect, overlayLeftStyle]}>
              <Text style={styles.overlayText}>{isSelected ? "UNSELECT" : "SELECT"}</Text>
            </Animated.View>

            {/* Down overlay - Next (Black) */}
            <Animated.View style={[styles.overlay, styles.overlayNext, overlayDownStyle]}>
              <Text style={styles.overlayText}>NEXT</Text>
            </Animated.View>
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
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    // Glassmorphism base
    ...(Platform.OS === "web" && {
      backdropFilter: "blur(16px)",
    }),
  },
  overlayEdit: {
    // Soft blue tint glassmorphism
    backgroundColor: Platform.OS === "web"
      ? "rgba(59, 130, 246, 0.25)"  // Blue 500 with low opacity
      : "rgba(59, 130, 246, 0.85)",
  },
  overlaySelect: {
    // Soft green tint glassmorphism
    backgroundColor: Platform.OS === "web"
      ? "rgba(34, 197, 94, 0.25)"   // Green 500 with low opacity
      : "rgba(34, 197, 94, 0.85)",
  },
  overlayNext: {
    // Soft dark glassmorphism
    backgroundColor: Platform.OS === "web"
      ? "rgba(15, 23, 42, 0.35)"    // Slate 900 with low opacity
      : "rgba(15, 23, 42, 0.90)",
  },
  overlayText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Platform.OS === "web" ? colors.primary : "#FFFFFF",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
