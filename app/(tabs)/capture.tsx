import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardStack, EditModal, SideEditDrawer, SelectionActionBar } from "@/components/cards";
import { CommandInput } from "@/components/command";
import { mockEntries } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";
import type { ParsedCommand } from "@/lib/commandTypes";
import type { Entry } from "@/lib/supabase";

export default function CaptureScreen() {
  const setEntries = useAppStore((state) => state.setEntries);
  const entries = useAppStore((state) => state.entries);
  const addEntry = useAppStore((state) => state.addEntry);
  const setActiveFilter = useAppStore((state) => state.setActiveFilter);

  // Load mock data on first render
  useEffect(() => {
    if (entries.length === 0) {
      setEntries(mockEntries);
    }
  }, []);

  const handleCommand = (command: ParsedCommand) => {
    switch (command.action) {
      case "add":
        // Create new entry
        const newEntry: Entry = {
          id: crypto.randomUUID(),
          user_id: "local",
          content: command.content,
          archived: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        addEntry(newEntry);
        break;
      case "search":
        // Set filter
        setActiveFilter({ query: command.content, tags: command.tags });
        break;
      case "delete":
        // Delete selected (handled elsewhere via SelectionActionBar)
        break;
      case "archive":
        // Archive selected (handled elsewhere via SelectionActionBar)
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-1">
        <CardStack />
      </View>

      <CommandInput onSubmit={handleCommand} placeholder="Drop a thought..." />

      <EditModal />
      <SideEditDrawer />
      <SelectionActionBar />
    </SafeAreaView>
  );
}
