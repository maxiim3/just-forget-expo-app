import { View, Text, Pressable } from "react-native";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

/**
 * Sketch-styled inline error state.
 * For displaying errors within content areas (not full-screen).
 */
export function ErrorState({
  title = "Whoops!",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="items-center justify-center p-6">
      <Text className="font-marker text-2xl text-accent mb-2">{title}</Text>
      <Text className="font-caveat text-lg text-secondary text-center mb-6 max-w-xs">
        {message}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="bg-primary border-2 border-primary px-6 py-3 rounded-sketch active:opacity-80"
        >
          <Text className="font-caveat text-xl text-surface">Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}
