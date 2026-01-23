/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      // ========================================
      // COLORS - Clean, High Contrast
      // ========================================
      colors: {
        // Backgrounds
        background: "#FAFAFA",
        surface: "#FFFFFF",

        // Text - HIGH CONTRAST
        primary: "#0F172A",
        secondary: "#475569",
        tertiary: "#64748B",

        // Borders
        border: "#E2E8F0",
        "border-hover": "#CBD5E1",

        // Accent (Black - Vercel style)
        accent: "#000000",
        "accent-light": "#F1F5F9",

        // States
        success: "#16A34A",
        error: "#DC2626",
        warning: "#D97706",

        // Overlay
        overlay: "rgba(0, 0, 0, 0.5)",

        // Legacy
        muted: "#F1F5F9",

        // Dark mode
        "dark-background": "#09090B",
        "dark-surface": "#18181B",
        "dark-primary": "#FAFAFA",
        "dark-secondary": "#A1A1AA",
        "dark-tertiary": "#71717A",
        "dark-border": "#27272A",
        "dark-accent": "#FFFFFF",
        "dark-accent-light": "#27272A",
        "dark-muted": "#27272A",
      },

      // ========================================
      // TYPOGRAPHY - Space Grotesk
      // ========================================
      fontFamily: {
        sans: ["SpaceGrotesk_400Regular"],
        "sans-medium": ["SpaceGrotesk_500Medium"],
        "sans-semibold": ["SpaceGrotesk_600SemiBold"],
        "sans-bold": ["SpaceGrotesk_700Bold"],
      },

      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },

      // ========================================
      // BORDER RADIUS
      // ========================================
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },

      // ========================================
      // SHADOWS - Subtle elevation
      // ========================================
      boxShadow: {
        sm: "0 1px 4px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.05)",
        md: "0 4px 12px rgba(0, 0, 0, 0.08)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.1)",
      },

      // ========================================
      // SPACING
      // ========================================
      spacing: {
        "4.5": "18px",
        "5.5": "22px",
        "18": "72px",
        "88": "352px",
      },
    },
  },
  plugins: [],
};
