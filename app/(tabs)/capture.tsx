import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { BottomDrawer } from "@/components/capture";
import { CardStack, EditModal, SideEditDrawer } from "@/components/cards";
import { mockEntries } from "@/lib/mockData";
import { useAppStore } from "@/lib/store";

const EDGE_ZONE_HEIGHT = 60;

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

  // Bottom edge swipe gesture
  const edgeGesture = Gesture.Pan()
    .onEnd((event) => {
      // Swipe up from bottom edge
      if (event.translationY < -50 && event.velocityY < -100) {
        runOnJS(openDrawer)();
      }
    });

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

        {/* Bottom edge gesture zone */}
        <GestureDetector gesture={edgeGesture}>
          <View
            className="absolute bottom-0 left-0 right-0"
            style={{ height: EDGE_ZONE_HEIGHT }}
          />
        </GestureDetector>
      </View>

      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <EditModal />
      <SideEditDrawer />
    </SafeAreaView>
  );
}
