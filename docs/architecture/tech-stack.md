# Tech Stack

This document describes the technology stack used in the Forget app. Dev agents should reference this when making technology decisions or understanding dependencies.

---

## Runtime & Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Expo SDK** | 52+ | Cross-platform React Native framework |
| **Expo Router** | 4.0 | File-based routing |
| **React** | 18.3.1 | UI library |
| **React Native** | 0.76.9 | Native runtime |
| **React Native Web** | 0.19.13 | Web platform support |
| **TypeScript** | 5.3.3 | Type safety |

### When to Use

- **Always use Expo-compatible packages**: Install with `bunx expo install <package>`
- **Web-first development**: Primary dev target is web (`bunx expo start --web`)
- **File-based routing**: All routes go in `/app` directory

---

## Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **NativeWind** | 4.x | Tailwind CSS for React Native |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |

### Configuration

- Config file: `tailwind.config.js`
- Global CSS: `global.css`
- NativeWind preset: `nativewind/preset`

### Custom Design Tokens

```javascript
// Colors (sketch/hand-drawn aesthetic)
colors: {
  background: "#FAF8F5",  // Muted paper background
  surface: "#FFFFFF",     // Card background
  primary: "#2D2D2D",     // Dark text/borders
  secondary: "#6B6B6B",   // Muted text
  accent: "#FF6B6B",      // Bold red accent
  muted: "#E8E4DF",       // Subtle borders/backgrounds
}

// Border radius
borderRadius: {
  sketch: "16px",         // Standard rounded corners
  "sketch-lg": "24px",    // Large rounded corners
}

// Border width
borderWidth: {
  sketch: "4px",          // Standard thick border
  "sketch-lg": "6px",     // Extra thick border
}
```

### Fonts

| Font | Class | Usage |
|------|-------|-------|
| **Caveat** | `font-caveat` | Body text, inputs, labels |
| **Caveat Medium** | `font-caveat-medium` | Emphasized body text |
| **Caveat SemiBold** | `font-caveat-semibold` | Strong emphasis |
| **Caveat Bold** | `font-caveat-bold` | Bold text |
| **Permanent Marker** | `font-marker` | Headers, titles, tab labels |

---

## State Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Zustand** | 5.x | Lightweight state management |

### Store Location

- File: `lib/store.ts`
- Pattern: Single store with selectors

### Usage Pattern

```typescript
// Import
import { useAppStore } from "@/lib/store";

// Use with selector (ALWAYS use selectors, never subscribe to whole store)
const entries = useAppStore((state) => state.entries);
const addEntry = useAppStore((state) => state.addEntry);
```

---

## Animations & Gestures

| Technology | Version | Purpose |
|------------|---------|---------|
| **react-native-reanimated** | 3.16.1 | Performant animations |
| **react-native-gesture-handler** | 2.20.2 | Native gesture handling |

### Animation Pattern

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

// Shared values for animation state
const translateY = useSharedValue(0);

// Animated styles
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));

// Spring animation
translateY.value = withSpring(targetValue, { damping: 15, stiffness: 150 });
```

### Gesture Pattern

```typescript
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const panGesture = Gesture.Pan()
  .onUpdate((event) => { /* handle drag */ })
  .onEnd((event) => { /* handle release */ });

// Wrap component
<GestureDetector gesture={panGesture}>
  <Animated.View style={animatedStyle}>
    {children}
  </Animated.View>
</GestureDetector>
```

### Root Setup Required

The app must be wrapped in `GestureHandlerRootView` (done in `app/_layout.tsx`).

---

## Backend (Planned)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.89+ | Auth, Database, Storage |

### Configuration

- Client: `lib/supabase.ts`
- Environment variables:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Current State

- Client configured but **not actively used**
- Mock data in `lib/mockData.ts` for development
- Types defined in `lib/supabase.ts`

---

## Development Tools

| Tool | Command | Purpose |
|------|---------|---------|
| **Bun** | `bun install` | Package manager |
| **Expo CLI** | `bunx expo start` | Development server |
| **EAS Build** | `bunx eas build` | Production builds |

### Key Commands

```bash
# Install dependencies
bun install

# Start dev server (web)
bunx expo start --web

# Start dev server (all platforms)
bunx expo start

# Install Expo-compatible package
bunx expo install <package-name>

# Build Android APK
bunx eas build -p android --profile preview
```

---

## PWA Support

| Feature | File |
|---------|------|
| Manifest | `public/manifest.json` |
| Service Worker | `public/sw.js` |

PWA setup is handled in `app/_layout.tsx` for web platform.

---

## Dependencies Summary

### Production

```json
{
  "@expo-google-fonts/caveat": "^0.4.2",
  "@expo-google-fonts/permanent-marker": "^0.4.0",
  "@supabase/supabase-js": "^2.89.0",
  "expo": "~52.0.0",
  "expo-av": "~15.0.2",
  "expo-router": "~4.0.0",
  "nativewind": "^4",
  "react-native-gesture-handler": "~2.20.2",
  "react-native-reanimated": "~3.16.1",
  "react-native-safe-area-context": "4.12.0",
  "zustand": "^5.0.9"
}
```

### Development

```json
{
  "@babel/core": "^7.25.2",
  "@types/react": "~18.3.12",
  "typescript": "~5.3.3"
}
```

---

## Version Constraints

- **Always use `bunx expo install`** for adding packages to ensure Expo compatibility
- **Pin to Expo SDK version ranges** (e.g., `~52.0.0`) for stability
- **Check Expo compatibility** before adding new native modules

---

*Last updated: 2026-01-08*
