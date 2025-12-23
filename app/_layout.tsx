import "../global.css";
import { useEffect, useState } from "react";
import { Platform, View, Text } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Caveat_400Regular,
  Caveat_500Medium,
  Caveat_600SemiBold,
  Caveat_700Bold,
} from "@expo-google-fonts/caveat";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Caveat_400Regular,
    Caveat_500Medium,
    Caveat_600SemiBold,
    Caveat_700Bold,
    PermanentMarker_400Regular,
  });
  const [appReady, setAppReady] = useState(false);

  // Handle font loading with timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Force app ready after 5s even if fonts failed
      setAppReady(true);
    }, 5000);

    if (fontsLoaded || fontError) {
      clearTimeout(timeout);
      setAppReady(true);
    }

    return () => clearTimeout(timeout);
  }, [fontsLoaded, fontError]);

  // Hide splash when ready
  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

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
      meta.content = "#FAF8F5";
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

  if (!appReady) {
    return null; // SplashScreen handles the loading state
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
