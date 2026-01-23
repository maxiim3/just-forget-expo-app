import "../global.css";
import { useEffect } from "react";
import { Platform, View, Text, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { useAppStore } from "@/lib/store";
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const systemColorScheme = useColorScheme();
  const themeMode = useAppStore((state) => state.themeMode);

  // Determine if we should use dark mode
  const isDark =
    themeMode === "dark" || (themeMode === "system" && systemColorScheme === "dark");

  // PWA setup on web
  useEffect(() => {
    if (Platform.OS === "web") {
      // Add manifest link
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = "/manifest.json";
      document.head.appendChild(link);

      // Add theme-color meta
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = "#F0F4F8";
      document.head.appendChild(meta);

      // Register service worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("SW registered:", reg.scope))
          .catch((err) => console.log("SW registration failed:", err));
      }
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
        <Text className="text-primary dark:text-dark-primary text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LayoutProvider>
          <GestureHandlerRootView
            style={{ flex: 1 }}
            className={isDark ? "dark" : ""}
          >
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </GestureHandlerRootView>
        </LayoutProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
