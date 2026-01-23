/**
 * ErrorFallback - Clean error UI for ErrorBoundary
 */

import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts, borderRadius, spacing, shadows } from "@/constants/theme";

interface Props {
  error: Error | null;
  onReset: () => void;
}

export function ErrorFallback({ error, onReset }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>Something went wrong</Text>

        <View style={[styles.errorCard, shadows.md]}>
          <Text style={styles.errorText}>
            {error?.message || "An unexpected error occurred"}
          </Text>
        </View>

        <Pressable
          onPress={onReset}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  errorCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginBottom: spacing["2xl"],
    maxWidth: 320,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.secondary,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing["2xl"],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
