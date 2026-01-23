/**
 * OnboardingOverlay - First-time user onboarding
 * Clean modal with gesture hints
 */

import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { GestureHint } from "./GestureHint";
import { colors, fonts, borderRadius, spacing, shadows } from "@/constants/theme";

const STEPS = [
  {
    direction: "down" as const,
    title: "Next Card",
    description: "Swipe down to move to the next thought",
  },
  {
    direction: "left" as const,
    title: "Select",
    description: "Swipe left to select cards for batch actions",
  },
  {
    direction: "right" as const,
    title: "Edit",
    description: "Swipe right to edit, archive, or delete",
  },
  {
    direction: "up" as const,
    title: "Previous",
    description: "Tap the card at the bottom to go back",
  },
];

interface OnboardingOverlayProps {
  onComplete: () => void;
}

export function OnboardingOverlay({ onComplete }: OnboardingOverlayProps) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStep = STEPS[step];

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      <View style={styles.modalWrapper}>
        <View style={[styles.modal, shadows.lg]}>
          <Text style={styles.mainTitle}>Learn the gestures</Text>
          <Text style={styles.stepIndicator}>
            Step {step + 1} of {STEPS.length}
          </Text>

          <View style={styles.gestureHintContainer}>
            <GestureHint direction={currentStep.direction} />
          </View>

          <Text style={styles.stepTitle}>{currentStep.title}</Text>
          <Text style={styles.stepDescription}>{currentStep.description}</Text>

          {/* Step indicators */}
          <View style={styles.dotsContainer}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === step ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              onPress={handleSkip}
              style={({ pressed }) => [
                styles.button,
                styles.skipButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </Pressable>
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.button,
                styles.nextButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.nextButtonText}>
                {step < STEPS.length - 1 ? "Next" : "Got it!"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  modalWrapper: {
    marginHorizontal: spacing.lg,
    maxWidth: 360,
    width: "100%",
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  mainTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  stepIndicator: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  gestureHintContainer: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  stepTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
    justifyContent: "center",
  },
  dot: {
    height: 6,
    width: 32,
    borderRadius: borderRadius.full,
  },
  dotActive: {
    backgroundColor: colors.accent,
  },
  dotInactive: {
    backgroundColor: colors.muted,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: colors.muted,
  },
  skipButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.secondary,
  },
  nextButton: {
    backgroundColor: colors.accent,
  },
  nextButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
