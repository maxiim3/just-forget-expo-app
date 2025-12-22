# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Enhanced StackUI** (Issue #3): Improved card stack visualization
  - Extended visible cards from 4 to 10 with smooth exponential fade
  - Added `PassedCardsStack` component showing the last swiped card at bottom
  - Swipe up on bottom card to navigate back (previous)
  - Full card reveals when dragging up from bottom
  - New theme constants: `maxVisibleCards`, `opacityBase`, `passedCardHeadHeight`

- **GestureCard Component**: New gesture-based card interaction system
  - Long-press to select cards for batch operations
  - Selection action bar with archive/delete actions
  - Visual selection state with checkmark indicator

- **SelectionActionBar Component**: Action bar for multi-card selection
  - Archive and delete actions for selected cards
  - Selection count display

- **PWA Maskable Icons**: Added complete set of maskable icons for better PWA experience
  - Added icons in sizes: 48px, 72px, 96px, 128px, 192px, 384px, 512px
  - Updated manifest.json with maskable icon definitions

- **Store Enhancements**: Extended Zustand store for selection management
  - Added `selectedIds` state for tracking selected entries
  - Added `toggleSelection`, `clearSelection`, `archiveSelected`, `deleteSelected` actions

### Changed

- **CardStack Component**: Refactored gesture handling and improved card transitions
- **SwipeCard Component**: Enhanced visual feedback and gesture responsiveness

- **Capture Screen**: Implemented swipe card stack with gesture-based interactions
  - CardStack component for browsing entries via swipe gestures
  - SwipeCard component with swipe-right (next), swipe-left (archive), swipe-up/down (edit) actions
  - Bottom edge swipe gesture to open capture drawer
  - FAB button (+) to quickly open new capture drawer
  - EditModal for editing entry content
  - BottomDrawer for creating new text entries

- **Grid Screen**: Implemented masonry-style grid view for all entries
  - Two-column responsive grid layout
  - Separate sections for active and archived entries
  - Relative time formatting (Today, Yesterday, Xd ago)
  - Empty state when no entries exist

- **State Management**: Extended Zustand store
  - Added `editingEntry` state for tracking entry being edited
  - Added `setEditingEntry` action

- **Mock Data**: Added sample entries for development (`lib/mockData.ts`)

- **PWA Support**: Progressive Web App configuration for web builds
  - Added manifest.json with app metadata
  - Added service worker (sw.js) for offline caching
  - Added PWA icons (192px, 512px)
  - Configured theme color and background color
  - Auto-registers service worker on web platform
