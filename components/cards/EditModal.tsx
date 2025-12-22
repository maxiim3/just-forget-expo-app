import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAppStore } from "@/lib/store";

export function EditModal() {
  const editingEntry = useAppStore((state) => state.editingEntry);
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);
  const updateEntry = useAppStore((state) => state.updateEntry);

  const [text, setText] = useState("");

  useEffect(() => {
    if (editingEntry) {
      setText(editingEntry.content);
    }
  }, [editingEntry]);

  const handleSave = () => {
    if (editingEntry && text.trim()) {
      updateEntry(editingEntry.id, {
        content: text.trim(),
        updated_at: new Date().toISOString(),
      });
      setEditingEntry(null);
    }
  };

  const handleCancel = () => {
    setEditingEntry(null);
  };

  if (!editingEntry) return null;

  return (
    <Modal
      visible={!!editingEntry}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-black/50 items-center justify-center p-6">
          <View className="w-full max-w-md bg-surface border-4 border-primary rounded-sketchLg p-6">
            <Text className="font-marker text-2xl text-primary mb-4">
              Edit thought
            </Text>

            <TextInput
              className="font-caveat text-xl text-primary bg-background border-2 border-muted rounded-sketch p-4 min-h-[200px]"
              placeholder="What's on your mind?"
              placeholderTextColor="#6B6B6B"
              multiline
              textAlignVertical="top"
              value={text}
              onChangeText={setText}
              autoFocus
            />

            <View className="flex-row gap-3 mt-6">
              <Pressable
                className="flex-1 py-3 border-2 border-muted rounded-sketch items-center"
                onPress={handleCancel}
              >
                <Text className="font-caveat text-xl text-secondary">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 py-3 bg-primary border-2 border-primary rounded-sketch items-center"
                onPress={handleSave}
                disabled={!text.trim()}
              >
                <Text className="font-caveat text-xl text-surface">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
