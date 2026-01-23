/**
 * EditModal - Clean solid modal for editing entries
 */

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import { useAppStore } from "@/lib/store";
import { colors, fonts, borderRadius, spacing, shadows } from "@/constants/theme";

export function EditModal() {
  const editingEntry = useAppStore((state) => state.editingEntry);
  const setEditingEntry = useAppStore((state) => state.setEditingEntry);
  const updateEntry = useAppStore((state) => state.updateEntry);
  const archiveEntry = useAppStore((state) => state.archiveEntry);
  const deleteEntry = useAppStore((state) => state.deleteEntry);

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

  const handleArchive = () => {
    if (editingEntry) {
      archiveEntry(editingEntry.id);
      setEditingEntry(null);
    }
  };

  const handleDelete = () => {
    if (editingEntry) {
      if (Platform.OS === "web") {
        if (window.confirm("Delete this thought? This cannot be undone.")) {
          deleteEntry(editingEntry.id);
          setEditingEntry(null);
        }
      } else {
        Alert.alert(
          "Delete thought",
          "This cannot be undone.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                deleteEntry(editingEntry.id);
                setEditingEntry(null);
              },
            },
          ]
        );
      }
    }
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
        style={styles.keyboardView}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, shadows.lg]}>
              <Text style={styles.title}>Edit thought</Text>

              <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.tertiary}
                multiline
                textAlignVertical="top"
                value={text}
                onChangeText={setText}
                autoFocus
              />

              {/* Action buttons row */}
              <View style={styles.buttonRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    styles.archiveButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleArchive}
                >
                  <Text style={styles.archiveButtonText}>Archive</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    styles.deleteButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>

              {/* Save/Cancel row */}
              <View style={styles.buttonRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    styles.cancelButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    styles.saveButton,
                    !text.trim() && styles.buttonDisabled,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleSave}
                  disabled={!text.trim()}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  textInput: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    minHeight: 180,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  archiveButton: {
    backgroundColor: colors.accentLight,
  },
  archiveButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.accent,
  },
  deleteButton: {
    backgroundColor: "#FEE2E2", // Red 100
  },
  deleteButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.error,
  },
  cancelButton: {
    backgroundColor: colors.muted,
  },
  cancelButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.secondary,
  },
  saveButton: {
    backgroundColor: colors.accent,
  },
  saveButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
