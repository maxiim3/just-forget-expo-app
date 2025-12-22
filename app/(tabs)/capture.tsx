import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomDrawer } from "@/components/capture";
import { CardStack, EditModal, SideEditDrawer, SelectionActionBar } from "@/components/cards";
import { mockEntries } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";

export default function CaptureScreen() {
  const setEntries = useAppStore((state) => state.setEntries);
  const entries = useAppStore((state) => state.entries);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load mock data on first render
  useEffect(() => {
    if (entries.length === 0) {
      setEntries(mockEntries);
    }
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-1">
        <CardStack />

        {/* FAB to open drawer */}
        <Pressable
          className="absolute bottom-6 right-6 w-16 h-16 bg-primary border-4 border-primary rounded-full items-center justify-center shadow-lg"
          onPress={openDrawer}
        >
          <Text className="font-marker text-3xl text-surface">+</Text>
        </Pressable>
      </View>

      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <EditModal />
      <SideEditDrawer />
      <SelectionActionBar />
    </SafeAreaView>
  );
}
