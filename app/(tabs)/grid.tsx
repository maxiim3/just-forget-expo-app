import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GridScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-marker text-4xl text-primary mb-4">Grid</Text>
        <Text className="font-caveat text-2xl text-secondary text-center">
          All your thoughts in a grid
        </Text>
      </View>
    </SafeAreaView>
  );
}
