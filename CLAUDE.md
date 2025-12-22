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

# Start for all platforms
bunx expo start

# Install Expo-compatible packages (always use this)
bunx expo install <package-name>
```

## Project Structure

```
/app
  /(tabs)/
    _layout.tsx          # Tab navigator
    capture.tsx          # Stack view (swipe cards)
    retrieve.tsx         # Chat view (phase 2, disabled)
    grid.tsx             # Grid view

/components
  /cards                 # SwipeCard, CardStack
  /capture               # BottomDrawer, VoiceRecorder
  /ui                    # Button, Drawer, ModeToggle

/lib
  supabase.ts           # Supabase client
  store.ts              # Zustand store

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
- **Colors**: Muted background, bold accent

## Gesture System (Capture Mode)

| Gesture | Action |
|---------|--------|
| Swipe Right | Scroll to next card |
| Swipe Left | Archive |
| Swipe Up/Down | Edit |
| Bottom edge swipe up | New capture |

## Current Phase

**Phase 1 — MVP**: Capture mode, swipe cards, voice/text input, archive, Supabase sync

## Key Constraints

- Web-first development (no Android Studio/iOS Simulator required)
- Serverless architecture (Supabase only)
- Native-feeling gestures are critical
- AI services should be modular (easy to swap providers)
