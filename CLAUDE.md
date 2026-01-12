# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Forget** is a universal mental inbox app — a place to instantly drop thoughts, ideas, links, voice notes, and reminders. Core flow: `Drop → Forget → Find → Send`

## Development Commands

```bash
bun install                        # Install dependencies
bunx expo start --web              # Web-first development (primary)
bunx expo start                    # All platforms (scan QR with Expo Go)
bunx expo install <package-name>   # Install Expo-compatible packages (always use this!)
bunx eas build -p android --profile preview  # Build Android APK
```

## Architecture

### Stack
- **Expo SDK 52+** with Expo Router (file-based routing)
- **NativeWind v4** (Tailwind for React Native) + custom sketch design system
- **Zustand** for state management
- **Supabase** for backend (not yet integrated)
- **react-native-reanimated** + **react-native-gesture-handler** for animations/gestures

### App Structure
```
app/_layout.tsx        → Root: GestureHandlerRootView, fonts, PWA setup
app/(tabs)/_layout.tsx → Tab navigator (capture, retrieve, grid)
app/(tabs)/capture.tsx → Main view: CardStack + BottomDrawer + EditDrawer
```

### Component Architecture

**Card System** (`components/cards/`):
- `CardStack.tsx` — Manages visible cards (up to 10), handles swipe callbacks
- `GestureCard.tsx` — Pan gesture wrapper using react-native-gesture-handler/Reanimated
- `SwipeCard.tsx` — Visual card component (sketch style)
- `PassedCardsStack.tsx` — Shows previously viewed cards at bottom
- `SideEditDrawer.tsx` — Slide-in editor triggered by swipe right

**Capture System** (`components/capture/`):
- `BottomDrawer.tsx` — Slide-up text input for new entries

### State Management (`lib/store.ts`)

Single Zustand store with:
- **entries[]** — All entries (use `entries.filter(e => !e.archived)` for active)
- **selectedEntryIds: Set** — Multi-select for batch operations
- **currentCardIndex** — Current position in card stack
- **editDrawerEntry** — Entry being edited in side drawer
- **viewMode** — "stack" | "grid"

### Styling System

Uses NativeWind with custom theme in `tailwind.config.js`:
- Colors: `background`, `surface`, `primary`, `secondary`, `accent`, `muted`
- Fonts: `font-caveat`, `font-marker` (loaded in root layout)
- Border utilities: `border-sketch` (4px), `rounded-sketch` (16px)
- Card dimensions defined in `constants/theme.ts`

## Gesture Mapping

| Gesture | Action | Handler |
|---------|--------|---------|
| Swipe Down | Next card | `setCurrentCardIndex(index + 1)` |
| Swipe Up | Previous (via PassedCardsStack) | |
| Swipe Left | Toggle selection | `toggleSelectedEntry(id)` |
| Swipe Right | Open edit drawer | `setEditDrawerEntry(entry)` |

## Key Constraints

- **Web-first**: No Android Studio/iOS Simulator required
- **Cross-platform**: Same codebase for web, iOS, Android
- **Gesture-driven**: Native-feeling swipe interactions are critical
- **Sketch aesthetic**: Hand-drawn look with Caveat/Permanent Marker fonts

## Environment Variables

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```
- on utilise bun seulement dans le proje