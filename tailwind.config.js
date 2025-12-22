/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5",
        surface: "#FFFFFF",
        primary: "#2D2D2D",
        secondary: "#6B6B6B",
        accent: "#FF6B6B",
        muted: "#E8E4DF",
      },
      fontFamily: {
        caveat: ["Caveat_400Regular"],
        "caveat-medium": ["Caveat_500Medium"],
        "caveat-semibold": ["Caveat_600SemiBold"],
        "caveat-bold": ["Caveat_700Bold"],
        marker: ["PermanentMarker_400Regular"],
      },
      borderRadius: {
        sketch: "16px",
        "sketch-lg": "24px",
      },
      borderWidth: {
        sketch: "4px",
        "sketch-lg": "6px",
      },
    },
  },
  plugins: [],
};
