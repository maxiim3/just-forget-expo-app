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

## Phase 2: Core UI

- [ ] Create Card component (title, body, actions)
- [ ] Create CardStack component with swipe gestures
- [ ] Implement swipe right (scroll to next)
- [ ] Implement swipe left (archive)
- [ ] Implement swipe up/down (edit)
- [ ] Create bottom capture zone (drag up to create)
- [ ] Create Settings drawer
- [ ] Apply hand-drawn aesthetic (borders, fonts, colors)

## Phase 3: Capture Flow

- [ ] Create text input capture modal
- [ ] Implement voice recording (MediaRecorder for web)
- [ ] Save entries to Supabase
- [ ] Display entries in card stack

## Phase 4: Data & Sync

- [ ] Create Supabase schema (entries, labels, entry_labels)
- [ ] Implement CRUD operations
- [ ] Implement archive functionality
- [ ] Add sort options (A-Z, modified date)
- [x] Setup Zustand store for local state

## Phase 5: Polish

- [ ] Add Grid view toggle
- [ ] Persist settings to storage
- [ ] Add loading states
- [ ] Add error handling
- [ ] Empty state ("Nothing here. Go live.")
