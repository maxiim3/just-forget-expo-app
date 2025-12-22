import { View, Text } from "react-native";
import type { Entry } from "@/lib/supabase";
import { cardDimensions } from "@/constants/theme";

interface SwipeCardProps {
  entry: Entry;
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

export function SwipeCard({ entry }: SwipeCardProps) {
  const contentType = getContentType(entry.content);
  const relativeTime = formatRelativeTime(entry.updated_at);

  return (
    <View
      className="bg-surface border-4 border-primary rounded-sketch p-6 shadow-lg"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
      }}
    >
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

      {/* Bottom hint */}
      <View className="mt-4 pt-4 border-t-2 border-muted">
        <Text className="font-caveat text-secondary text-center text-base">
          ← archive · keep → · ↑↓ edit
        </Text>
      </View>
    </View>
  );
}
