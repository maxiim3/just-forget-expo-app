import { View, Text } from "react-native";
import type { Entry } from "@/lib/supabase";
import { cardDimensions } from "@/constants/theme";

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
      className={`bg-surface border-4 rounded-sketch p-6 shadow-lg ${
        isSelected ? "border-accent" : "border-primary"
      }`}
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <View className="absolute top-4 right-4 w-8 h-8 bg-accent rounded-full items-center justify-center z-10">
          <Text className="text-white text-lg">✓</Text>
        </View>
      )}

      {/* Content type indicator */}
      <View className="flex-row items-center mb-4">
        <View
          className={`px-3 py-1 rounded-full border-2 border-primary ${
            contentType === "link"
              ? "bg-accent/20"
              : contentType === "list"
              ? "bg-success/20"
              : "bg-muted"
          }`}
        >
          <Text className="font-caveat text-sm text-primary">
            {contentType === "link" ? "link" : contentType === "list" ? "list" : "note"}
          </Text>
        </View>
        <Text className="font-caveat text-secondary ml-auto text-lg">
          {relativeTime}
        </Text>
      </View>

      {/* Main content */}
      <View className="flex-1">
        <Text
          className="font-caveat text-2xl text-primary leading-relaxed"
          numberOfLines={12}
        >
          {entry.content}
        </Text>
      </View>

    </View>
  );
}
