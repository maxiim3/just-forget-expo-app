import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "@/lib/store";
import type { Entry } from "@/lib/supabase";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - 48 - CARD_GAP) / 2;

// Format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

function GridCard({ entry }: { entry: Entry }) {
  return (
    <Pressable
      className="bg-surface border-4 border-primary rounded-sketch p-4"
      style={{ width: CARD_WIDTH, minHeight: 140 }}
    >
      <Text
        className="font-caveat text-lg text-primary leading-tight"
        numberOfLines={5}
      >
        {entry.content}
      </Text>
      <Text className="font-caveat text-sm text-secondary mt-auto pt-2">
        {formatRelativeTime(entry.updated_at)}
      </Text>
    </Pressable>
  );
}

export default function GridScreen() {
  const entries = useAppStore((state) => state.entries);
  const activeEntries = entries.filter((e) => !e.archived);
  const archivedEntries = entries.filter((e) => e.archived);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-4">
          <Text className="font-marker text-3xl text-primary">All Thoughts</Text>
          <Text className="font-caveat text-xl text-secondary">
            {activeEntries.length} active, {archivedEntries.length} archived
          </Text>
        </View>

        {/* Active entries grid */}
        {activeEntries.length > 0 && (
          <View
            className="flex-row flex-wrap"
            style={{ gap: CARD_GAP, paddingBottom: 24 }}
          >
            {activeEntries.map((entry) => (
              <GridCard key={entry.id} entry={entry} />
            ))}
          </View>
        )}

        {/* Archived section */}
        {archivedEntries.length > 0 && (
          <>
            <View className="py-4 border-t-2 border-muted">
              <Text className="font-marker text-xl text-secondary">
                Archived
              </Text>
            </View>
            <View
              className="flex-row flex-wrap opacity-60"
              style={{ gap: CARD_GAP, paddingBottom: 48 }}
            >
              {archivedEntries.map((entry) => (
                <GridCard key={entry.id} entry={entry} />
              ))}
            </View>
          </>
        )}

        {/* Empty state */}
        {entries.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="font-marker text-2xl text-secondary mb-2">
              No thoughts yet
            </Text>
            <Text className="font-caveat text-xl text-secondary text-center">
              Go to Capture to add your first thought
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
