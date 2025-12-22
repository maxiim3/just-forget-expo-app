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
