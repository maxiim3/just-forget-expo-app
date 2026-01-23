import { createContext, useContext, useMemo } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";
import { useColorScheme } from "nativewind";
import { useAppStore } from "@/lib/store";
import { colors, darkColors, type ThemeColors } from "@/constants/theme";

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  themeMode: "system" | "light" | "dark";
  setThemeMode: (mode: "system" | "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider that integrates NativeWind's color scheme with Zustand store.
 * Supports system preference detection with manual override.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useNativeColorScheme();
  const { setColorScheme } = useColorScheme();
  const themeMode = useAppStore((state) => state.themeMode);
  const setThemeMode = useAppStore((state) => state.setThemeMode);

  // Determine actual dark mode based on themeMode setting
  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return systemColorScheme === "dark";
    }
    return themeMode === "dark";
  }, [themeMode, systemColorScheme]);

  // Sync with NativeWind's color scheme
  useMemo(() => {
    if (themeMode === "system") {
      setColorScheme("system");
    } else {
      setColorScheme(themeMode);
    }
  }, [themeMode, setColorScheme]);

  const themeColors = isDark ? darkColors : colors;

  const value = useMemo(
    () => ({
      isDark,
      colors: themeColors,
      themeMode,
      setThemeMode,
    }),
    [isDark, themeColors, themeMode, setThemeMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context.
 * Returns current colors, dark mode status, and theme mode setter.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
