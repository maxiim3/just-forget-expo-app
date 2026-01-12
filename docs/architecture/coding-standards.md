# Coding Standards

This document defines the coding conventions and patterns used in the Forget app. Dev agents must follow these standards for consistency.

---

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SwipeCard.tsx`, `EditModal.tsx` |
| Screens (routes) | kebab-case | `capture.tsx`, `grid.tsx` |
| Utilities/libs | camelCase | `store.ts`, `mockData.ts` |
| Constants | camelCase | `theme.ts` |
| Types | PascalCase | `Entry`, `Label` |

---

## Component Structure

### Functional Components Only

All components use functional components with hooks. No class components.

```typescript
// Good
export function SwipeCard({ entry, isSelected }: SwipeCardProps) {
  return <View>...</View>;
}

// Also good (for default exports in routes)
export default function CaptureScreen() {
  return <SafeAreaView>...</SafeAreaView>;
}
```

### Component File Structure

```typescript
// 1. Imports
import { View, Text } from "react-native";
import { useAppStore } from "@/lib/store";

// 2. Constants (if needed)
const SOME_CONSTANT = 50;

// 3. Helper functions (if needed)
const formatDate = (date: string): string => { ... };

// 4. Type definitions
interface ComponentProps {
  prop1: string;
  prop2?: boolean;
}

// 5. Component
export function Component({ prop1, prop2 = false }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState(false);
  const storeValue = useAppStore((s) => s.value);

  // Handlers
  const handlePress = useCallback(() => { ... }, []);

  // Render
  return <View>...</View>;
}
```

---

## TypeScript

### Type Definitions

- Define interfaces for component props
- Use types from `lib/supabase.ts` for data models
- Prefer `interface` for object shapes, `type` for unions/aliases

```typescript
// Props interface
interface SwipeCardProps {
  entry: Entry;
  isSelected?: boolean;
}

// Type alias for union
type ContentType = "link" | "list" | "note";
```

### Import Paths

Use the `@/` alias for absolute imports:

```typescript
// Good
import { useAppStore } from "@/lib/store";
import { Entry } from "@/lib/supabase";
import { cardDimensions } from "@/constants/theme";

// Avoid relative paths for cross-directory imports
import { useAppStore } from "../../lib/store"; // Don't do this
```

---

## Styling with NativeWind

### Use className for All Styling

```typescript
// Good - NativeWind classes
<View className="flex-1 bg-background px-6">
  <Text className="font-marker text-2xl text-primary">Title</Text>
</View>

// Avoid inline styles except for dynamic values
<View style={{ width: dynamicWidth }}>
```

### Common Class Patterns

```typescript
// Containers
"flex-1 bg-background"                    // Full screen container
"px-6 py-4"                               // Standard padding

// Cards
"bg-surface border-4 border-primary rounded-sketch p-6"  // Standard card
"border-4 border-accent"                  // Selected state

// Text
"font-marker text-2xl text-primary"       // Header
"font-caveat text-xl text-primary"        // Body
"font-caveat text-lg text-secondary"      // Muted text

// Buttons
"py-3 bg-primary border-2 border-primary rounded-sketch items-center"  // Primary
"py-3 border-2 border-muted rounded-sketch items-center"               // Secondary

// Layout
"flex-row gap-3"                          // Horizontal with gap
"items-center justify-center"             // Centered content
```

### Dynamic Classes

Use template literals for conditional classes:

```typescript
<View className={`border-4 ${isSelected ? "border-accent" : "border-primary"}`}>

<Text className={`font-marker text-base ${focused ? "text-primary" : "text-secondary"}`}>
```

---

## State Management

### Zustand Selectors

**ALWAYS** use selectors when accessing store:

```typescript
// Good - Selective subscription
const entries = useAppStore((state) => state.entries);
const addEntry = useAppStore((state) => state.addEntry);

// Bad - Subscribes to entire store (causes unnecessary re-renders)
const store = useAppStore();
```

### Store Actions

Actions are defined in the store and accessed via selectors:

```typescript
// In component
const archiveEntry = useAppStore((state) => state.archiveEntry);

// Usage
archiveEntry(entryId);
```

---

## Animations

### Shared Values

```typescript
const translateY = useSharedValue(0);
const opacity = useSharedValue(1);
```

### Animated Styles

```typescript
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
  opacity: opacity.value,
}));
```

### Spring Configurations

Standard spring config for snappy feel:

```typescript
withSpring(targetValue, { damping: 15, stiffness: 150 })
```

Softer spring for drawers:

```typescript
withSpring(targetValue, { damping: 20 })
```

---

## Gestures

### Pan Gesture Pattern

```typescript
const panGesture = Gesture.Pan()
  .enabled(isActive)  // Conditional enable
  .onUpdate((event) => {
    // Update shared values
    translateX.value = event.translationX;
  })
  .onEnd((event) => {
    // Determine action based on thresholds
    if (event.translationX > THRESHOLD) {
      runOnJS(handleSwipeRight)();
    }
    // Spring back
    translateX.value = withSpring(0);
  });
```

### Threshold Constants

```typescript
const SWIPE_THRESHOLD = 50;      // Distance threshold
const VELOCITY_THRESHOLD = 300;  // Speed threshold
```

---

## Component Exports

### Barrel Exports

Each component folder has an `index.ts` for clean imports:

```typescript
// components/cards/index.ts
export { SwipeCard } from "./SwipeCard";
export { CardStack } from "./CardStack";
export { EditModal } from "./EditModal";
```

### Import Pattern

```typescript
// Good - From barrel
import { CardStack, EditModal, SwipeCard } from "@/components/cards";

// Avoid - Direct file imports
import { CardStack } from "@/components/cards/CardStack";
```

---

## Screen Structure

### Tab Screens

```typescript
export default function ScreenName() {
  // Store hooks
  const entries = useAppStore((state) => state.entries);

  // Local state
  const [isOpen, setIsOpen] = useState(false);

  // Effects
  useEffect(() => { ... }, []);

  // Handlers
  const handleAction = useCallback(() => { ... }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Content */}
    </SafeAreaView>
  );
}
```

### SafeAreaView

Always wrap screen content in `SafeAreaView` with appropriate edges:

```typescript
<SafeAreaView className="flex-1 bg-background" edges={["top"]}>
```

---

## Error Handling

### User Input Validation

```typescript
const handleSubmit = useCallback(() => {
  if (!text.trim()) return;  // Guard clause

  // Process valid input
  addEntry({ ... });
}, [text, addEntry]);
```

### Optional Chaining

```typescript
const entry = entries.find((e) => e.id === id);
if (entry) {
  setEditingEntry(entry);
}
```

---

## Comments

### When to Comment

- Complex algorithms or non-obvious logic
- Workarounds or temporary solutions
- TODO items for future work

```typescript
// Detect content type for styling hints
const getContentType = (content: string): ContentType => {
  if (content.startsWith("http://")) return "link";
  // ...
};

// TODO: Replace with Supabase query
const mockEntries = [ ... ];
```

### Avoid Obvious Comments

```typescript
// Bad - States the obvious
// Set the state to true
setIsOpen(true);
```

---

## Testing (Future)

When tests are added:
- Test files: `__tests__/ComponentName.test.tsx`
- Use React Native Testing Library patterns
- Test user interactions, not implementation details

---

*Last updated: 2026-01-08*
