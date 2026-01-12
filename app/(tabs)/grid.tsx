import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "@/lib/store";
import { EditModal } from "@/components/cards/EditModal";
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

function GridCard({
  entry,
  onPress,
  onLongPress,
}: {
  entry: Entry;
  onPress: () => void;
  onLongPress: () => void;
}) {
  return (
    <Pressable
      className="bg-surface border-4 border-primary rounded-sketch p-4"
      style={({ pressed }) => [
        { width: CARD_WIDTH, minHeight: 140 },
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
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
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);
  const archiveEntry = useAppStore((state) => state.archiveEntry);
  const deleteEntry = useAppStore((state) => state.deleteEntry);

  const [menuEntry, setMenuEntry] = useState<Entry | null>(null);

  const activeEntries = entries.filter((e) => !e.archived);
  const archivedEntries = entries.filter((e) => e.archived);

  const handleArchive = () => {
    if (menuEntry) {
      archiveEntry(menuEntry.id);
      setMenuEntry(null);
    }
  };

  const handleDelete = () => {
    if (!menuEntry) return;

    Alert.alert(
      "Delete thought",
      "Are you sure? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteEntry(menuEntry.id);
            setMenuEntry(null);
          },
        },
      ]
    );
  };

  return (
    <>
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
              <GridCard
                key={entry.id}
                entry={entry}
                onPress={() => setEditingEntry(entry)}
                onLongPress={() => setMenuEntry(entry)}
              />
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
                <GridCard
                  key={entry.id}
                  entry={entry}
                  onPress={() => setEditingEntry(entry)}
                  onLongPress={() => setMenuEntry(entry)}
                />
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
      <EditModal />

      {/* Context menu modal */}
      <Modal
        visible={!!menuEntry}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuEntry(null)}
      >
        <Pressable
          className="flex-1 bg-black/50 items-center justify-center"
          onPress={() => setMenuEntry(null)}
        >
          <View className="bg-surface border-4 border-primary rounded-sketchLg p-4 min-w-[200px]">
            <Text className="font-marker text-lg text-primary mb-3 text-center">
              Actions
            </Text>
            <Pressable
              className="py-3 px-4 border-2 border-muted rounded-sketch mb-2"
              onPress={handleArchive}
            >
              <Text className="font-caveat text-xl text-primary text-center">
                📦 Archive
              </Text>
            </Pressable>
            <Pressable
              className="py-3 px-4 bg-red-100 border-2 border-red-400 rounded-sketch"
              onPress={handleDelete}
            >
              <Text className="font-caveat text-xl text-red-600 text-center">
                🗑️ Delete
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
