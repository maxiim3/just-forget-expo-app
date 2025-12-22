# Forget App - Development Journal

## 2025-12-22 - Enhanced StackUI (Issue #3)

### Session Summary
Implemented enhanced card stack visualization with better depth perception and navigation.

### What Was Built

**Stack Visualization:**
- Extended visible cards from 4 to 10
- Smooth exponential opacity fade (`0.88^position`) instead of linear cutoff
- Cards remain visible further back in the stack

**PassedCardsStack Component:**
- Shows the last swiped card at the bottom of the screen
- Only the "head" (60px) visible at rest
- Full card reveals when dragging up
- Swipe up gesture to navigate back to previous card
- Positioned in front of main stack (z-index: 50) when dragging

**Gesture Changes:**
- Disabled swipe up on main card (now handled by bottom card)
- Removed "prev" hint from top of screen

### Files Created/Modified
```
/constants/theme.ts                    (updated - new constants)
/components/cards/CardStack.tsx        (updated - 10 cards, PassedCardsStack)
/components/cards/GestureCard.tsx      (updated - opacity curve, no up overlay)
/components/cards/PassedCardsStack.tsx (new)
/components/cards/index.ts             (updated - export)
```

### Technical Decisions
- Used `bottom: -HIDDEN_PORTION` positioning instead of `overflow: hidden` clip
- Full card rendered but positioned off-screen for smooth drag reveal
- Immediate navigation on swipe (no exit animation) for snappy UX

---

## 2025-12-22 - Phase 1 MVP Complete

### Session Summary
Built the complete Phase 1 MVP for the Forget mental inbox app.

### What Was Built

**Core UI Components:**
- `SwipeCard.tsx` - Individual card with sketch aesthetic, content type badges, relative timestamps
- `CardStack.tsx` - Swipeable stack using rn-swiper-list with all 4 gesture directions
- `EditModal.tsx` - Modal for editing entries on swipe up/down
- `BottomDrawer.tsx` - Slide-up drawer for text capture

**Screens:**
- `capture.tsx` - Main swipe card view with FAB and bottom edge gesture
- `grid.tsx` - Grid view showing all entries (active + archived sections)

**State Management:**
- Updated Zustand store with `editingEntry` state
- Mock data with 12 varied entries (notes, links, ideas, reminders)

**PWA Support:**
- `manifest.json` - App manifest for installability
- `sw.js` - Service worker for offline caching
- Dynamic manifest/meta injection in `_layout.tsx`

### Gesture System
| Gesture | Action |
|---------|--------|
| Swipe Right | Keep / next card |
| Swipe Left | Archive |
| Swipe Up/Down | Edit entry |
| Bottom edge swipe up | New capture |

### Technical Decisions
- Used `rn-swiper-list` for card physics (works well on web)
- PWA manifest injected dynamically (Expo SDK 52 limitation)
- Bottom edge gesture zone is 60px tall
- Kept FAB as accessibility fallback for drawer

### Files Created/Modified
```
/components/cards/SwipeCard.tsx      (new)
/components/cards/CardStack.tsx      (new)
/components/cards/EditModal.tsx      (new)
/components/cards/index.ts           (new)
/components/capture/BottomDrawer.tsx (new)
/components/capture/index.ts         (new)
/lib/mockData.ts                     (new)
/lib/store.ts                        (updated)
/app/(tabs)/capture.tsx              (updated)
/app/(tabs)/grid.tsx                 (updated)
/app/_layout.tsx                     (updated)
/app.json                            (updated)
/public/manifest.json                (new)
/public/sw.js                        (new)
/public/icon-192.png                 (new)
/public/icon-512.png                 (new)
/CLAUDE.md                           (updated)
```
