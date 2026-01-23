import { useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { Text, View, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useLayout } from "@/contexts/LayoutContext";
import { colors, fonts, shadows, borderRadius } from "@/constants/theme";

type TabIconProps = {
  label: string;
  focused: boolean;
};

function TabIcon({ label, focused }: TabIconProps) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <Text
        style={[
          styles.tabLabel,
          focused ? styles.tabLabelActive : styles.tabLabelInactive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const pathname = usePathname();
  const { toGrid, toStack } = useLayout();

  // Trigger layout transition on tab change
  useEffect(() => {
    if (pathname === "/grid") {
      toGrid();
    } else if (pathname === "/" || pathname === "/capture") {
      toStack();
    }
  }, [pathname, toGrid, toStack]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS !== "web" ? (
            <BlurView
              intensity={80}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.tabBarWebBg]} />
          ),
      }}
    >
      <Tabs.Screen
        name="capture"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Swipe" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="grid"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Grid" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="retrieve"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    transform: [{ translateX: -80 }], // Half of width (160)
    width: 160,
    height: 48,
    borderRadius: borderRadius.full,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    ...shadows.lg,
    // Web-specific shadow
    ...(Platform.OS === "web" && {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    }),
  },
  tabBarWebBg: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  tabItemActive: {
    backgroundColor: colors.accent,
  },
  tabLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    color: colors.surface,
  },
  tabLabelInactive: {
    color: colors.secondary,
  },
});
