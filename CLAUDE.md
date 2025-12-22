# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Forget** is a universal mental inbox app — a place to instantly drop thoughts, ideas, links, voice notes, and reminders. Core flow: `Drop → Forget → Find → Send`

## Tech Stack

- **Framework**: Expo SDK 52+ with Expo Router
- **Styling**: NativeWind (Tailwind for React Native)
- **State**: Zustand
- **Backend**: Supabase (auth, database, storage)
- **Animations**: react-native-reanimated
- **Gestures**: react-native-gesture-handler
- **Swipe**: rn-swiper-list
- **Voice**: expo-av (native) / MediaRecorder API (web)

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (web-first)
bunx expo start --web

# Start for all platforms (scan QR with Expo Go)
bunx expo start

# Install Expo-compatible packages (always use this)
bunx expo install <package-name>

# Build Android APK
bunx eas build -p android --profile preview
```

## Project Structure

```
/app
  /(tabs)/
    _layout.tsx          # Tab navigator
    capture.tsx          # Stack view (swipe cards + drawer)
    retrieve.tsx         # Chat view (Phase 2)
    grid.tsx             # Grid view of all entries

/components
  /cards
    SwipeCard.tsx        # Individual card component
    CardStack.tsx        # Swipeable card stack
    EditModal.tsx        # Edit entry modal
  /capture
    BottomDrawer.tsx     # Slide-up text capture

/lib
  supabase.ts           # Supabase client + types
  store.ts              # Zustand store
  mockData.ts           # 12 mock entries for testing

/public
  manifest.json         # PWA manifest
  sw.js                 # Service worker for offline

/constants
  theme.ts              # Colors, fonts, spacing
```

## Data Model (Supabase)

- **entries**: id, user_id, content, raw_audio_url, created_at, updated_at, metadata (JSONB), archived
- **labels**: id, user_id, name, type (space/tag/location/date), metadata
- **entry_labels**: entry_id, label_id (join table)

## Design Guidelines

- **Aesthetic**: Marker/hand-drawn/sketch style
- **Borders**: Large (4-6px)
- **Corners**: Rounded (16-24px)
- **Fonts**: Handwritten feel (Caveat, Permanent Marker)
- **Colors**: Muted background (#FAF8F5), bold accent (#FF6B6B)

## Gesture System (Capture Mode)

| Gesture | Action |
|---------|--------|
| Swipe Right | Keep / next card |
| Swipe Left | Archive |
| Swipe Up/Down | Edit entry |
| Bottom edge swipe up | New capture |
| FAB (+) button | New capture (fallback) |

## Current Status

### Phase 1 — MVP (COMPLETED)
- [x] Swipe card stack with rn-swiper-list
- [x] All gesture directions working (left/right/up/down)
- [x] Archive functionality
- [x] Edit modal for entries
- [x] Bottom drawer for text capture
- [x] Grid view with active/archived sections
- [x] 12 mock entries for testing
- [x] PWA support (installable, offline-capable)
- [x] Android support via Expo Go

### Phase 2 — Next Steps
- [ ] Voice recorder (expo-av + MediaRecorder)
- [ ] Supabase database integration
- [ ] User authentication
- [ ] Retrieve/Chat view with AI search
- [ ] Vector embeddings for semantic search

## Key Constraints

- Web-first development (no Android Studio/iOS Simulator required)
- Serverless architecture (Supabase only)
- Native-feeling gestures are critical
- AI services should be modular (easy to swap providers)


# TODO

- refactor pm
- add issues
- add stories
- add guidelines
- add design-system
