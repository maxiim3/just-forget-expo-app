import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { SwipeCard } from "./SwipeCard";
import { useAppStore } from "@/lib/store";
import { cardDimensions } from "@/constants/theme";

const SWIPE_THRESHOLD = 40;
const VELOCITY_THRESHOLD = 300;

// How much of the card is visible at rest (the "head")
const VISIBLE_HEAD_HEIGHT = 60;
// How much of the card is hidden below the screen
const HIDDEN_PORTION = cardDimensions.height - VISIBLE_HEAD_HEIGHT;

export function PassedCardsStack() {
  const entries = useAppStore((state) => state.entries);
  const currentCardIndex = useAppStore((state) => state.currentCardIndex);
  const selectedEntryIds = useAppStore((state) => state.selectedEntryIds);
  const setCurrentCardIndex = useAppStore((state) => state.setCurrentCardIndex);

  const activeEntries = entries.filter((e) => !e.archived);

  // Only show the last passed card (the one just before current)
  const lastPassedIndex = currentCardIndex - 1;
  const lastPassedCard = lastPassedIndex >= 0 ? activeEntries[lastPassedIndex] : null;

  const translateY = useSharedValue(0);

  const handleSwipeUp = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only track upward movement (negative Y)
      if (event.translationY < 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      const isSwipeUp =
        event.translationY < -SWIPE_THRESHOLD ||
        event.velocityY < -VELOCITY_THRESHOLD;

      if (isSwipeUp) {
        runOnJS(handleSwipeUp)();
        translateY.value = 0;
      } else {
        translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, -SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  if (!lastPassedCard) return null;

  return (
    <View
      style={{
        position: "absolute",
        // Position so card is mostly off-screen, only head visible
        bottom: -HIDDEN_PORTION,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          {/* Full card - not clipped */}
          <View
            style={{
              width: cardDimensions.width,
              height: cardDimensions.height,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <SwipeCard
              entry={lastPassedCard}
              isSelected={selectedEntryIds.has(lastPassedCard.id)}
            />
            {/* Swipe up overlay */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 16,
                  backgroundColor: "rgba(45, 45, 45, 0.9)",
                  alignItems: "center",
                  justifyContent: "center",
                },
                overlayStyle,
              ]}
            >
              <Animated.Text
                style={{
                  fontFamily: "PermanentMarker_400Regular",
                  fontSize: 24,
                  color: "#FFFFFF",
                }}
              >
                Prev
              </Animated.Text>
            </Animated.View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
