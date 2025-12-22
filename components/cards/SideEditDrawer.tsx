import { useEffect } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useAppStore } from "@/lib/store";

export function SideEditDrawer() {
  const editDrawerEntry = useAppStore((state) => state.editDrawerEntry);
  const setEditDrawerEntry = useAppStore((state) => state.setEditDrawerEntry);
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);
  const archiveEntry = useAppStore((state) => state.archiveEntry);
  const deleteEntry = useAppStore((state) => state.deleteEntry);

  const translateX = useSharedValue(300);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (editDrawerEntry) {
      opacity.value = withTiming(1, { duration: 200 });
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateX.value = withTiming(300, { duration: 200 });
    }
  }, [editDrawerEntry]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleClose = () => {
    setEditDrawerEntry(null);
  };

  const handleEdit = () => {
    if (editDrawerEntry) {
      setEditingEntry(editDrawerEntry);
      setEditDrawerEntry(null);
    }
  };

  const handleArchive = () => {
    if (editDrawerEntry) {
      archiveEntry(editDrawerEntry.id);
      setEditDrawerEntry(null);
    }
  };

  const handleDelete = () => {
    if (editDrawerEntry) {
      deleteEntry(editDrawerEntry.id);
      setEditDrawerEntry(null);
    }
  };

  if (!editDrawerEntry) return null;

  return (
    <Modal visible={!!editDrawerEntry} transparent animationType="none">
      <View className="flex-1 flex-row">
        {/* Backdrop */}
        <Pressable
          className="flex-1"
          onPress={handleClose}
          style={{ backgroundColor: "transparent" }}
        >
          <Animated.View
            style={[backdropStyle]}
            className="flex-1 bg-black/30"
          />
        </Pressable>

        {/* Side Drawer */}
        <Animated.View
          style={[animatedStyle]}
          className="w-64 bg-surface border-l-4 border-primary shadow-2xl"
        >
          <View className="flex-1 pt-20 px-6">
            <Text className="font-marker text-2xl text-primary mb-6">
              Actions
            </Text>

            {/* Edit Button */}
            <Pressable
              className="mb-4 py-4 px-6 bg-primary border-2 border-primary rounded-sketch items-center active:opacity-80"
              onPress={handleEdit}
            >
              <Text className="font-caveat text-xl text-surface">
                ✏️ Edit
              </Text>
            </Pressable>

            {/* Archive Button */}
            <Pressable
              className="mb-4 py-4 px-6 bg-accent/20 border-2 border-accent rounded-sketch items-center active:opacity-80"
              onPress={handleArchive}
            >
              <Text className="font-caveat text-xl text-accent">
                📦 Archive
              </Text>
            </Pressable>

            {/* Delete Button */}
            <Pressable
              className="mb-4 py-4 px-6 bg-red-100 border-2 border-red-500 rounded-sketch items-center active:opacity-80"
              onPress={handleDelete}
            >
              <Text className="font-caveat text-xl text-red-500">
                🗑️ Delete
              </Text>
            </Pressable>

            {/* Close Button */}
            <Pressable
              className="mt-auto mb-8 py-4 px-6 border-2 border-muted rounded-sketch items-center active:opacity-80"
              onPress={handleClose}
            >
              <Text className="font-caveat text-xl text-secondary">
                Cancel
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
