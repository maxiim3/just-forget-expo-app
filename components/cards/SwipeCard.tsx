import { View, Text, StyleSheet } from "react-native";
import type { Entry } from "@/lib/supabase";
import { cardDimensions, colors, shadows, borderRadius, fonts } from "@/constants/theme";

interface SwipeCardProps {
  entry: Entry;
  isSelected?: boolean;
}

// Format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
};

// Detect content type for styling hints
const getContentType = (content: string): "link" | "list" | "note" => {
  if (content.startsWith("http://") || content.startsWith("https://")) {
    return "link";
  }
  if (content.includes(":") && content.split(",").length > 2) {
    return "list";
  }
  return "note";
};

export function SwipeCard({ entry, isSelected = false }: SwipeCardProps) {
  const contentType = getContentType(entry.content);
  const relativeTime = formatRelativeTime(entry.updated_at);

  return (
    <View
      style={[
        styles.card,
        shadows.md,
        isSelected && styles.cardSelected,
      ]}
    >
      {/* Selection indicator */}
      {isSelected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}

      {/* Content type indicator and timestamp */}
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            contentType === "link" && styles.badgeLink,
            contentType === "list" && styles.badgeList,
          ]}
        >
          <Text style={styles.badgeText}>
            {contentType.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.timestamp}>{relativeTime}</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.contentText} numberOfLines={14}>
          {entry.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardDimensions.width,
    height: cardDimensions.height,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  checkmark: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    backgroundColor: colors.accent,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  checkmarkText: {
    color: colors.surface,
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: colors.muted,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  badgeLink: {
    backgroundColor: colors.accentLight,
  },
  badgeList: {
    backgroundColor: "#DCFCE7", // Green 100
  },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  timestamp: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.tertiary,
    marginLeft: "auto",
  },
  content: {
    flex: 1,
  },
  contentText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary,
    lineHeight: 24,
  },
});
