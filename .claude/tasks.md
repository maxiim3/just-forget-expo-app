# Tasks — Phase 1 MVP

## Phase 0: Environment

- [x] Verify Bun installed (`bun -v`)
- [x] Verify Git installed (`git -v`)

## Phase 1: Project Init ✅

- [x] Create Expo project with TypeScript template
- [x] Configure for web-first development
- [x] Install core dependencies (Zustand, NativeWind)
- [x] Setup Supabase client
- [x] Configure fonts (Caveat / Permanent Marker)
- [x] Setup Expo Router file structure

## Phase 2: Core UI ✅

- [x] Create Card component (SwipeCard.tsx)
- [x] Create CardStack component with swipe gestures
- [x] Implement swipe right (keep/next)
- [x] Implement swipe left (archive)
- [x] Implement swipe up/down (edit modal)
- [x] Create bottom capture zone (BottomDrawer + edge gesture)
- [x] Apply hand-drawn aesthetic (borders, fonts, colors)
- [x] Create Grid view
- [x] 12 mock entries for testing
- [x] PWA support (manifest + service worker)
- [ ] Create Settings drawer

## Phase 3: Capture Flow

- [x] Create text input capture modal (BottomDrawer)
- [ ] Implement voice recording (MediaRecorder for web)
- [ ] Save entries to Supabase
- [x] Display entries in card stack

## Phase 4: Data & Sync

- [ ] Create Supabase schema (entries, labels, entry_labels)
- [ ] Implement CRUD operations
- [x] Implement archive functionality
- [ ] Add sort options (A-Z, modified date)
- [x] Setup Zustand store for local state

## Phase 5: Polish

- [x] Add Grid view toggle
- [ ] Persist settings to storage
- [ ] Add loading states
- [ ] Add error handling
- [x] Empty state ("All clear!")
