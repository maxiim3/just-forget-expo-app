/**
 * CommandHelp - Clean bottom sheet showing command syntax
 */

import { View, Text, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { colors, fonts, borderRadius, spacing, shadows } from "@/constants/theme";

const SYNTAX_DOCS = [
  {
    syntax: "#tag",
    color: "#16A34A", // Green 600
    description: "Add tags to categorize thoughts",
    example: "Buy milk #shopping #groceries",
  },
  {
    syntax: "search <term>",
    color: colors.accent,
    description: "Find thoughts containing a term",
    example: "search meeting notes",
  },
  {
    syntax: "today / tomorrow",
    color: "#7C3AED", // Violet 600
    description: "Add date hints to thoughts",
    example: "Call mom tomorrow",
  },
  {
    syntax: "next week / monday",
    color: "#7C3AED", // Violet 600
    description: "Schedule for specific days",
    example: "Review goals next week",
  },
];

interface CommandHelpProps {
  visible: boolean;
  onClose: () => void;
}

export function CommandHelp({ visible, onClose }: CommandHelpProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        style={styles.overlay}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close help"
      >
        <Pressable onPress={(e) => e.stopPropagation()} style={styles.sheetContainer}>
          <View style={[styles.sheet, shadows.lg]}>
            <View style={styles.header}>
              <Text style={styles.title}>Command Syntax</Text>
              <Text style={styles.subtitle}>Use these keywords while typing</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              {SYNTAX_DOCS.map((doc, i) => (
                <View
                  key={i}
                  style={[
                    styles.docItem,
                    i < SYNTAX_DOCS.length - 1 && styles.docItemBorder,
                  ]}
                >
                  <View style={styles.syntaxBadgeContainer}>
                    <View style={styles.syntaxBadge}>
                      <Text style={[styles.syntaxText, { color: doc.color }]}>
                        {doc.syntax}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.description}>{doc.description}</Text>
                  <Text style={styles.example}>e.g., "{doc.example}"</Text>
                </View>
              ))}
            </ScrollView>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sheetContainer: {
    maxHeight: "70%",
    width: "100%",
    maxWidth: 560,
    paddingHorizontal: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
  },
  scrollView: {
    maxHeight: 400,
  },
  docItem: {
    paddingVertical: spacing.md,
  },
  docItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  syntaxBadgeContainer: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  syntaxBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  syntaxText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  example: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.tertiary,
  },
  closeButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  closeButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.secondary,
  },
});
