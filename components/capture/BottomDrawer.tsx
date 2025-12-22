import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAppStore } from "@/lib/store";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DRAWER_HEIGHT = 280;
const SNAP_TOP = -DRAWER_HEIGHT;
const SNAP_BOTTOM = 0;

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomDrawer({ isOpen, onClose }: BottomDrawerProps) {
  const [text, setText] = useState("");
  const addEntry = useAppStore((state) => state.addEntry);

  const translateY = useSharedValue(SNAP_BOTTOM);

  // Update position when isOpen changes
  if (isOpen && translateY.value === SNAP_BOTTOM) {
    translateY.value = withSpring(SNAP_TOP, { damping: 20 });
  } else if (!isOpen && translateY.value === SNAP_TOP) {
    translateY.value = withSpring(SNAP_BOTTOM, { damping: 20 });
  }

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    onClose();
  }, [onClose]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = SNAP_TOP + event.translationY;
      if (newY > SNAP_TOP && newY < SNAP_BOTTOM) {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        translateY.value = withSpring(SNAP_BOTTOM, { damping: 20 });
        runOnJS(handleClose)();
      } else {
        translateY.value = withSpring(SNAP_TOP, { damping: 20 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSubmit = useCallback(() => {
    if (text.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        user_id: "user-1",
        content: text.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        archived: false,
      };
      addEntry(newEntry);
      setText("");
      handleClose();
    }
  }, [text, addEntry, handleClose]);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className="absolute left-0 right-0 bg-surface border-t-4 border-x-4 border-primary rounded-t-sketchLg"
        style={[
          {
            height: DRAWER_HEIGHT,
            bottom: -DRAWER_HEIGHT,
          },
          animatedStyle,
        ]}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-2">
          <View className="w-12 h-1.5 bg-muted rounded-full" />
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pb-6">
          <Text className="font-marker text-xl text-primary mb-4">
            Drop a thought
          </Text>

          <TextInput
            className="flex-1 font-caveat text-xl text-primary bg-background border-2 border-muted rounded-sketch p-4"
            placeholder="What's on your mind?"
            placeholderTextColor="#6B6B6B"
            multiline
            value={text}
            onChangeText={setText}
            autoFocus={isOpen}
          />

          <View className="flex-row gap-3 mt-4">
            <Pressable
              className="flex-1 py-3 border-2 border-muted rounded-sketch items-center"
              onPress={handleClose}
            >
              <Text className="font-caveat text-xl text-secondary">Cancel</Text>
            </Pressable>
            <Pressable
              className="flex-1 py-3 bg-primary border-2 border-primary rounded-sketch items-center"
              onPress={handleSubmit}
              disabled={!text.trim()}
            >
              <Text className="font-caveat text-xl text-surface">Drop it</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
