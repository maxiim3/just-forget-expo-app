import { Tabs } from "expo-router";
import { Text, View } from "react-native";

type TabIconProps = {
  label: string;
  focused: boolean;
};

function TabIcon({ label, focused }: TabIconProps) {
  return (
    <View className="items-center justify-center py-2">
      <Text
        className={`font-marker text-base ${
          focused ? "text-primary" : "text-secondary"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FAF8F5",
          borderTopWidth: 4,
          borderTopColor: "#2D2D2D",
          height: 70,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="capture"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Capture" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="retrieve"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Retrieve" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="grid"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Grid" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
