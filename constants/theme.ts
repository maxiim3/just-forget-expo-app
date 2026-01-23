/**
 * Clean Minimal Design System
 * Vercel + iOS + Google Keep inspired
 * High contrast, solid surfaces, generous whitespace
 */

// ============================================
// COLORS - Light Mode (High Contrast)
// ============================================
export const colors = {
  // Backgrounds
  background: "#FAFAFA",      // Very light gray (Vercel style)
  surface: "#FFFFFF",         // Pure white - SOLID cards

  // Text - HIGH CONTRAST
  primary: "#0F172A",         // Slate 900 - main text (near black)
  secondary: "#475569",       // Slate 600 - secondary text
  tertiary: "#64748B",        // Slate 500 - timestamps/hints only

  // Borders - VISIBLE
  border: "#E2E8F0",          // Slate 200 - subtle but visible
  borderHover: "#CBD5E1",     // Slate 300 - hover/focus state

  // Accent - Black (Vercel style)
  accent: "#000000",
  accentLight: "#F1F5F9",     // Slate 100 - subtle accent bg

  // States
  success: "#16A34A",         // Green 600
  error: "#DC2626",           // Red 600
  warning: "#D97706",         // Amber 600

  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",

  // Legacy compatibility
  muted: "#F1F5F9",           // Slate 100
} as const;

// ============================================
// COLORS - Dark Mode
// ============================================
export const darkColors = {
  // Backgrounds
  background: "#09090B",      // Zinc 950
  surface: "#18181B",         // Zinc 900

  // Text
  primary: "#FAFAFA",         // Zinc 50
  secondary: "#A1A1AA",       // Zinc 400
  tertiary: "#71717A",        // Zinc 500

  // Borders
  border: "#27272A",          // Zinc 800
  borderHover: "#3F3F46",     // Zinc 700

  // Accent
  accent: "#FFFFFF",
  accentLight: "#27272A",     // Zinc 800

  // States
  success: "#22C55E",         // Green 500
  error: "#EF4444",           // Red 500
  warning: "#F59E0B",         // Amber 500

  // Overlay
  overlay: "rgba(0, 0, 0, 0.7)",

  // Legacy
  muted: "#27272A",
} as const;

export type ThemeColors = typeof colors | typeof darkColors;

// ============================================
// TYPOGRAPHY - Space Grotesk
// ============================================
export const fonts = {
  regular: "SpaceGrotesk_400Regular",
  medium: "SpaceGrotesk_500Medium",
  semibold: "SpaceGrotesk_600SemiBold",
  bold: "SpaceGrotesk_700Bold",
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
} as const;

// ============================================
// SPACING
// ============================================
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
} as const;

// ============================================
// SHADOWS - Subtle elevation
// ============================================
export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

// ============================================
// CARD DIMENSIONS
// ============================================
export const cardDimensions = {
  width: 320,
  height: 420,
  stackOffset: 16,
  stackScale: 0.97,
  maxVisibleCards: 10,
  opacityBase: 0.88,
  passedCardHeadHeight: 60,
  passedCardSpacing: 12,
  passedCardMaxVisible: 5,
} as const;

// ============================================
// GESTURE CONFIGURATION
// ============================================
export const gestureConfig = {
  swipeThreshold: 40,
  velocityThreshold: 400,
  directionLockRatio: 0.65,

  spring: {
    damping: 20,
    stiffness: 200,
  },

  rotation: {
    maxDegrees: 6,
    translationRange: 120,
  },
} as const;
