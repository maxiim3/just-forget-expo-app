import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "@/lib/store";
import { EditModal } from "@/components/cards/EditModal";
import type { Entry } from "@/lib/supabase";

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

function RetrieveEntryCard({
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
      className="bg-surface border-4 border-primary rounded-sketch p-4 mb-3"
      style={({ pressed }) => [pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
    >
      <Text
        className="font-caveat text-xl text-primary leading-tight"
        numberOfLines={3}
      >
        {entry.content}
      </Text>
      <Text className="font-caveat text-sm text-secondary mt-2">
        {formatRelativeTime(entry.updated_at)}
      </Text>
    </Pressable>
  );
}

type TabFilter = "active" | "archived";

export default function RetrieveScreen() {
  const entries = useAppStore((state) => state.entries);
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);
  const archiveEntry = useAppStore((state) => state.archiveEntry);
  const unarchiveEntry = useAppStore((state) => state.unarchiveEntry);
  const deleteEntry = useAppStore((state) => state.deleteEntry);

  const [searchQuery, setSearchQuery] = useState("");
  const [tabFilter, setTabFilter] = useState<TabFilter>("active");
  const [menuEntry, setMenuEntry] = useState<Entry | null>(null);

  // Filter entries based on tab and search
  const filteredEntries = entries.filter((entry) => {
    const matchesTab = tabFilter === "active" ? !entry.archived : entry.archived;
    const matchesSearch = searchQuery
      ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTab && matchesSearch;
  });

  const handleArchive = () => {
    if (menuEntry) {
      if (menuEntry.archived) {
        unarchiveEntry(menuEntry.id);
      } else {
        archiveEntry(menuEntry.id);
      }
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

  const renderEmptyState = () => {
    // Case 1: No entries at all
    if (entries.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Text className="font-marker text-2xl text-secondary mb-2">
            No thoughts yet
          </Text>
          <Text className="font-caveat text-xl text-secondary text-center">
            Go to Capture to add your first thought
          </Text>
        </View>
      );
    }

    // Case 2: Search query but no results
    if (searchQuery) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Text className="font-marker text-2xl text-secondary mb-2">
            No matches found
          </Text>
          <Text className="font-caveat text-xl text-secondary text-center">
            Try a different search term
          </Text>
        </View>
      );
    }

    // Case 3: Tab is empty (active or archived)
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="font-marker text-2xl text-secondary mb-2">
          {tabFilter === "active" ? "All clear!" : "Nothing archived"}
        </Text>
        <Text className="font-caveat text-xl text-secondary text-center">
          {tabFilter === "active"
            ? "Your active thoughts will appear here"
            : "Archived thoughts will appear here"}
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <View className="flex-1 px-6">
          {/* Header */}
          <View className="py-4">
            <Text className="font-marker text-3xl text-primary">Search</Text>
          </View>

          {/* Search input */}
          <TextInput
            className="font-caveat text-xl text-primary bg-surface border-4 border-primary rounded-sketch p-4 mb-4"
            placeholder="Search your thoughts..."
            placeholderTextColor="#6B6B6B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Tab filter */}
          <View className="flex-row mb-4 gap-2">
            <Pressable
              className={`flex-1 py-2 rounded-sketch border-2 ${
                tabFilter === "active"
                  ? "bg-primary border-primary"
                  : "bg-surface border-muted"
              }`}
              onPress={() => setTabFilter("active")}
            >
              <Text
                className={`font-caveat text-lg text-center ${
                  tabFilter === "active" ? "text-surface" : "text-secondary"
                }`}
              >
                Active
              </Text>
            </Pressable>
            <Pressable
              className={`flex-1 py-2 rounded-sketch border-2 ${
                tabFilter === "archived"
                  ? "bg-primary border-primary"
                  : "bg-surface border-muted"
              }`}
              onPress={() => setTabFilter("archived")}
            >
              <Text
                className={`font-caveat text-lg text-center ${
                  tabFilter === "archived" ? "text-surface" : "text-secondary"
                }`}
              >
                Archived
              </Text>
            </Pressable>
          </View>

          {/* Entry list */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <RetrieveEntryCard
                  key={entry.id}
                  entry={entry}
                  onPress={() => setEditingEntry(entry)}
                  onLongPress={() => setMenuEntry(entry)}
                />
              ))
            ) : (
              renderEmptyState()
            )}
          </ScrollView>
        </View>
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
                {menuEntry?.archived ? "📤 Unarchive" : "📦 Archive"}
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
