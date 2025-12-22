# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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
