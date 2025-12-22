import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RetrieveScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-marker text-4xl text-secondary mb-4">
          Retrieve
        </Text>
        <Text className="font-caveat text-2xl text-secondary text-center">
          Coming in Phase 2
        </Text>
        <View className="mt-4 px-4 py-2 bg-muted rounded-sketch">
          <Text className="font-caveat text-lg text-secondary">
            AI-powered chat search
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
