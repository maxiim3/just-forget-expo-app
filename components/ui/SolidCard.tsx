/**
 * SolidCard - Clean card component with solid background
 * Replaces the old GlassContainer/GlassSurface components
 */

import { View, StyleSheet, type ViewStyle } from "react-native";
import { colors, borderRadius, shadows } from "@/constants/theme";

interface SolidCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  bordered?: boolean;
  style?: ViewStyle;
}

export function SolidCard({
  children,
  elevated = false,
  bordered = true,
  style,
}: SolidCardProps) {
  return (
    <View
      style={[
        styles.card,
        bordered && styles.bordered,
        elevated && shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});
