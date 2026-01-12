export const colors = {
  background: "#FAF8F5",
  surface: "#FFFFFF",
  primary: "#2D2D2D",
  secondary: "#6B6B6B",
  accent: "#FF6B6B",
  muted: "#E8E4DF",
  error: "#DC2626",
  success: "#16A34A",
} as const;

export const fonts = {
  caveat: "Caveat_400Regular",
  caveatMedium: "Caveat_500Medium",
  caveatSemiBold: "Caveat_600SemiBold",
  caveatBold: "Caveat_700Bold",
  marker: "PermanentMarker_400Regular",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  sketch: 16,
  sketchLg: 24,
} as const;

export const borderWidth = {
  sm: 2,
  sketch: 4,
  sketchLg: 6,
} as const;

export const cardDimensions = {
  width: 320,
  height: 420,
  stackOffset: 16,
  stackScale: 0.97,
  // Stack visibility
  maxVisibleCards: 10,
  opacityBase: 0.88,
  // Passed cards at bottom
  passedCardHeadHeight: 60,
  passedCardSpacing: 12,
  passedCardMaxVisible: 5,
} as const;

/**
 * Gesture configuration for swipe cards
 * Tuned for 9/10 feel: snappy, responsive, delightful
 */
export const gestureConfig = {
  // Swipe detection thresholds
  swipeThreshold: 40, // px - distance to trigger (was 50, now more responsive)
  velocityThreshold: 400, // px/s - velocity for quick flicks (was 300, now requires more intent)
  directionLockRatio: 0.65, // 0-1 - how pure the direction must be (was 0.6, now stricter)

  // Spring animation - snap back feel
  spring: {
    damping: 20, // Higher = less bouncy (was 15)
    stiffness: 200, // Higher = faster snap (was 150)
  },

  // Rotation during swipe
  rotation: {
    maxDegrees: 6, // Max rotation in degrees (was 8, now subtler)
    translationRange: 120, // px translation for max rotation (was 150)
  },
} as const;
