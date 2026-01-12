# Source Tree

This document describes the file structure and module organization of the Forget app. Dev agents should reference this when creating or modifying files.

---

## Project Root

```
forget/
├── app/                    # Expo Router screens and navigation
├── components/             # Reusable UI components
├── constants/              # App constants and design tokens
├── lib/                    # Core utilities and state
├── public/                 # Static web assets (PWA)
├── docs/                   # Project documentation
│   ├── architecture/       # Architecture docs (this folder)
│   ├── prd/                # Epics and PRD shards
│   └── stories/            # User stories for dev agents
├── .bmad-core/             # BMAD methodology config
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind/NativeWind config
├── tsconfig.json           # TypeScript config
├── global.css              # Global styles
└── CLAUDE.md               # AI assistant instructions
```

---

## `/app` — Screens & Navigation

Expo Router file-based routing. Each file becomes a route.

```
app/
├── _layout.tsx             # Root layout (fonts, gesture handler, PWA setup)
├── index.tsx               # Entry redirect (redirects to /capture)
└── (tabs)/                 # Tab navigator group
    ├── _layout.tsx         # Tab bar configuration
    ├── capture.tsx         # Main swipe cards view
    ├── retrieve.tsx        # Search/chat view (placeholder)
    └── grid.tsx            # Grid overview of all entries
```

### Route Mapping

| File | Route | Purpose |
|------|-------|---------|
| `app/index.tsx` | `/` | Redirects to `/capture` |
| `app/(tabs)/capture.tsx` | `/capture` | Swipe card stack + capture |
| `app/(tabs)/retrieve.tsx` | `/retrieve` | Search/retrieve entries |
| `app/(tabs)/grid.tsx` | `/grid` | Grid view of all entries |

### Adding New Routes

1. **New tab**: Add file in `app/(tabs)/` and register in `_layout.tsx`
2. **New screen**: Add file in `app/` for stack navigation
3. **Nested routes**: Create folder with `_layout.tsx` and child routes

---

## `/components` — UI Components

Organized by feature domain with barrel exports.

```
components/
├── cards/                  # Swipe card components
│   ├── index.ts            # Barrel export
│   ├── CardStack.tsx       # Main card stack orchestrator
│   ├── GestureCard.tsx     # Gesture handling wrapper
│   ├── SwipeCard.tsx       # Card visual presentation
│   ├── EditModal.tsx       # Full-screen edit modal
│   ├── SideEditDrawer.tsx  # Side panel for quick edit
│   ├── SelectionActionBar.tsx  # Multi-select action bar
│   └── PassedCardsStack.tsx    # Bottom stack of passed cards
│
└── capture/                # Input/capture components
    ├── index.ts            # Barrel export
    └── BottomDrawer.tsx    # Slide-up text input drawer
```

### Component Responsibilities

| Component | File | Purpose |
|-----------|------|---------|
| **CardStack** | `cards/CardStack.tsx` | Manages card array, handles swipe callbacks, renders stack |
| **GestureCard** | `cards/GestureCard.tsx` | Pan gesture detection, animation, direction callbacks |
| **SwipeCard** | `cards/SwipeCard.tsx` | Visual card UI, content display, selection state |
| **EditModal** | `cards/EditModal.tsx` | Modal for editing entry content |
| **SideEditDrawer** | `cards/SideEditDrawer.tsx` | Slide-in drawer with Edit/Archive/Delete actions |
| **SelectionActionBar** | `cards/SelectionActionBar.tsx` | Bottom bar for multi-select actions |
| **PassedCardsStack** | `cards/PassedCardsStack.tsx` | Visual stack of previously viewed cards |
| **BottomDrawer** | `capture/BottomDrawer.tsx` | Slide-up drawer for new entry input |

### Adding New Components

1. Create component file in appropriate folder
2. Add export to folder's `index.ts`
3. Import from barrel: `import { Component } from "@/components/folder"`

---

## `/lib` — Core Utilities

Application logic, state management, and data.

```
lib/
├── store.ts                # Zustand state store
├── supabase.ts             # Supabase client + types
└── mockData.ts             # Development mock data
```

### File Details

| File | Purpose | Exports |
|------|---------|---------|
| `store.ts` | Global state management | `useAppStore` hook |
| `supabase.ts` | Database client + types | `supabase`, `Entry`, `Label`, `EntryLabel` |
| `mockData.ts` | 12 test entries for development | `mockEntries` |

### Store Structure (`store.ts`)

```typescript
interface AppState {
  // Data
  entries: Entry[];
  setEntries, addEntry, updateEntry, archiveEntry, deleteEntry

  // Multi-select
  selectedEntryIds: Set<string>;
  toggleSelectedEntry, clearSelection, archiveSelected, deleteSelected

  // View settings
  viewMode: "stack" | "grid";
  sortMode: "modified" | "alphabetical";

  // UI state
  isCapturing: boolean;
  currentCardIndex: number;
  editingEntry: Entry | null;      // For EditModal
  editDrawerEntry: Entry | null;   // For SideEditDrawer
}
```

---

## `/constants` — Design Tokens

Centralized design values.

```
constants/
└── theme.ts                # Colors, fonts, spacing, dimensions
```

### Theme Exports

```typescript
// Colors
export const colors = {
  background, surface, primary, secondary, accent, muted, error, success
};

// Fonts
export const fonts = {
  caveat, caveatMedium, caveatSemiBold, caveatBold, marker
};

// Spacing
export const spacing = { xs, sm, md, lg, xl, xxl };

// Border radius
export const borderRadius = { sm, md, sketch, sketchLg };

// Border width
export const borderWidth = { sm, sketch, sketchLg };

// Card dimensions
export const cardDimensions = {
  width: 320,
  height: 420,
  stackOffset: 16,
  stackScale: 0.97,
  maxVisibleCards: 10,
  opacityBase: 0.88,
  passedCardHeadHeight: 60,
  passedCardSpacing: 12,
  passedCardMaxVisible: 5,
};
```

---

## `/public` — Web Assets

Static files served for web/PWA.

```
public/
├── manifest.json           # PWA manifest (app name, icons, theme)
└── sw.js                   # Service worker for offline support
```

---

## `/docs` — Documentation

Project documentation for humans and AI agents.

```
docs/
├── architecture/           # Technical architecture docs
│   ├── tech-stack.md       # Technology decisions
│   ├── coding-standards.md # Code conventions
│   └── source-tree.md      # This file
│
├── prd/                    # Product requirements (epics)
│   ├── epic-1-ux-polish.md
│   ├── epic-2-data-persistence.md
│   ├── epic-3-input-expansion.md
│   └── epic-4-ai-retrieval.md
│
└── stories/                # User stories for dev agents
    ├── 1.1.crud-grid-view.md
    ├── 1.2.crud-retrieve-view.md
    └── 1.3.gesture-polish.md
```

---

## Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Usage

```typescript
import { useAppStore } from "@/lib/store";
import { Entry } from "@/lib/supabase";
import { CardStack } from "@/components/cards";
import { colors } from "@/constants/theme";
```

---

## File Creation Guidelines

### New Screen

1. Create `app/(tabs)/screenname.tsx` or `app/screenname.tsx`
2. Export default function component
3. Wrap in `SafeAreaView` with `edges={["top"]}`
4. Add to tab layout if needed

### New Component

1. Create `components/domain/ComponentName.tsx`
2. Define props interface
3. Export named function
4. Add to `components/domain/index.ts`

### New Utility

1. Add to `lib/` folder
2. Export functions/constants
3. Import with `@/lib/filename`

### New Type

1. Add to `lib/supabase.ts` for data types
2. Or create `lib/types.ts` for app-specific types

---

## Naming Conventions Summary

| Item | Convention | Example |
|------|------------|---------|
| Component files | PascalCase | `SwipeCard.tsx` |
| Route files | lowercase | `capture.tsx` |
| Lib/util files | camelCase | `store.ts` |
| Component exports | Named | `export function SwipeCard` |
| Route exports | Default | `export default function Screen` |
| Type/Interface | PascalCase | `interface SwipeCardProps` |
| Constants | camelCase | `export const colors` |
| Folders | lowercase | `components/cards/` |

---

*Last updated: 2026-01-08*
