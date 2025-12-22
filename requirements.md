# FORGET — App Specification

> **Version:** 1.0  
> **Date:** 2025-12-22  
> **Status:** MVP Planning

---

## 1. Product Overview

| Field | Value |
|-------|-------|
| **Name** | Forget |
| **Tagline** | What will you forget today? |
| **Hook** | You forget. We remember. |

**Description:**  
Forget is a universal mental inbox — a place to instantly drop thoughts, ideas, links, voice notes, and reminders so you can stop thinking about them, find them later, and send them where they belong.

**Core Flow:**  
`Drop → Forget → Find → Send`

---

## 2. Modes

| Mode | Purpose | UI | Status |
|------|---------|-----|--------|
| **Capture** | Drop thoughts fast | Swipe cards (mobile) / Grab cards (desktop) | ✅ Default |
| **Retrieve** | Find stuff back | AI chat interface | 🚧 Phase 2 (disabled) |

Toggle between modes changes accent color / theme feel.

---

## 3. Gestures — Capture Mode

| Gesture | Mobile | Desktop | Action |
|---------|--------|---------|--------|
| Swipe Right | → | Click + drag right | **Scroll** (next card) |
| Swipe Left | ← | Click + drag left | **Archive** |
| Swipe Up | ↑ | Click + drag up | **Edit** |
| Swipe Down | ↓ | Click + drag down | **Edit** |
| Bottom → Up | Swipe from edge | Hover bottom zone + drag | **New capture** |

**Note:** Left/Right can be inverted in settings.

---

## 4. Settings Drawer

| Setting | Options | Default |
|---------|---------|---------|
| Invert L/R gestures | On / Off | Off |
| Sort order | A-Z / Modified asc / Modified desc | Modified desc |
| Default view | Capture / Retrieve | Capture |
| Retrieve mode | Enabled / Disabled | Disabled |

---

## 5. Views

| View | Description | Access |
|------|-------------|--------|
| **Stack** | Default. Tinder-style pile. | Main screen |
| **Grid** | All entries. Sortable. Searchable. | Button toggle |
| **Chat** | Retrieve mode. AI conversational search. | Phase 2 |

---

## 6. UI Direction

### Card Stack Layout

```
┌─────────────────────────────────────┐
│  FORGET                    ⚙️  ☰   │
├─────────────────────────────────────┤
│                                     │
│        ┌─────────────────┐          │
│       ┌┴────────────────┐│          │
│      ┌┴────────────────┐││          │
│      │                 │┘│          │
│      │  Title          │ │          │
│      │                 │ │          │
│      │  Description... │ │          │
│      │                 │ │          │
│      │                 │ │          │
│      │                 │ │          │
│      │  🗑️         [Archive]│          │
│      └─────────────────┘─┘          │
│                                     │
│                              ◢      │
│                         ↑ capture   │
└─────────────────────────────────────┘
```

### Card Anatomy

```
╭─────────────────────────────────────╮
│                                     │
│  **Title**                          │
│                                     │
│  Body text / description...         │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│  🗑️                      [Archive]  │
│                                     │
╰─────────────────────────────────────╯
```

| Element | Position | Action |
|---------|----------|--------|
| Title | Top | Bold, entry name or first line |
| Body | Middle | Truncated content preview |
| Trash icon | Bottom-left | Delete entry |
| Archive button | Bottom-right | Archive entry |

### Stack Behavior

- 3-4 cards visible behind (stacked, slight offset at top)
- Front card is interactive
- Swipe right → card tilts/rotates, scrolls to next
- Swipe left → archive animation
- Swipe up/down → edit mode
- Corner indicator (bottom-right) → swipe up to create new

### Style Guidelines

| Element | Specification |
|---------|---------------|
| Aesthetic | Marker / hand-drawn / street / sketch |
| Borders | Large (4-6px) |
| Corners | Rounded (16-24px) |
| Fonts | Handwritten feel (Caveat, Permanent Marker) |
| Colors | Muted background, bold accent |
| Mode toggle | Changes accent / theme colors |

---

## 7. Brand Voice

| Context | Copy |
|---------|------|
| Empty state | "Nothing here. Go live." |
| Archive | "Forgotten." |
| New capture | "Drop it." |
| Tagline | "You forget. We remember." |
| Micro-copy | "just f it" / "forget about that" |

---

## 8. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Expo SDK 52+** |
| Router | **Expo Router** |
| Swipe | **rn-swiper-list** |
| Animations | **react-native-reanimated** |
| Gestures | **react-native-gesture-handler** |
| Voice | **expo-av** |
| Backend | **Supabase** |
| State | **Zustand** |
| Styling | **NativeWind** (Tailwind) |
| Fonts | **Caveat** or **Permanent Marker** |

---

## 9. Project Structure

```
/app
  /(tabs)/
    _layout.tsx          # Tab navigator
    capture.tsx          # Stack view (swipe cards)
    retrieve.tsx         # Chat view (phase 2)
    grid.tsx             # Grid view
  
/components
  /cards
    SwipeCard.tsx
    CardStack.tsx
  /capture
    BottomDrawer.tsx     # New entry input
    VoiceRecorder.tsx
  /ui
    Button.tsx
    Drawer.tsx           # Settings
    ModeToggle.tsx       # Capture/Retrieve switch
  
/lib
  supabase.ts
  store.ts               # Zustand

/constants
  theme.ts               # Colors, fonts, spacing
```

---

## 10. Data Model (Supabase)

### Table: `entries`

| Column | Type | Description |
|--------|------|-------------|
| id | UUID, PK | Primary key |
| user_id | UUID, FK | User reference |
| content | TEXT | Transcript or text input |
| raw_audio_url | TEXT | Optional audio file |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last modified |
| metadata | JSONB | AI context, embeddings |
| archived | BOOLEAN | Archive status |

### Table: `labels`

| Column | Type | Description |
|--------|------|-------------|
| id | UUID, PK | Primary key |
| user_id | UUID, FK | User reference |
| name | TEXT | Label name |
| type | ENUM | space, tag, location, date |
| metadata | JSONB | Extra AI info |

### Table: `entry_labels` (join)

| Column | Type | Description |
|--------|------|-------------|
| entry_id | UUID, FK | Entry reference |
| label_id | UUID, FK | Label reference |
| created_at | TIMESTAMP | Link creation |

---

## 11. Development Phases

| Phase | Scope | Status |
|-------|-------|--------|
| **1 — MVP** | Capture mode, swipe cards, voice/text input, archive, Supabase sync | 🎯 Current |
| **2 — Retrieve** | AI chat interface, semantic search | 🚧 Next |
| **3 — Polish** | Grid view, settings, desktop optimization | 📋 Planned |

---

## 12. MCP Servers (Safe & Official)

### Expo MCP Server (Official)

**Purpose:** AI-assisted Expo/React Native development

```json
{
  "mcpServers": {
    "expo": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/claude-code"],
      "env": {}
    }
  }
}
```

**Capabilities:**
- Fetch latest Expo documentation
- Install compatible package versions
- Screenshot and interact with simulators (SDK 54+)
- Run diagnostics and health checks

**Links:**
- Docs: https://docs.expo.dev/eas/ai/mcp/
- Setup: `npx expo install expo-mcp --dev`

---

### Supabase MCP Server (Official)

**Purpose:** AI-assisted Supabase database management

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp?project_ref=<YOUR_PROJECT_REF>"
    }
  }
}
```

**Capabilities:**
- Create and manage tables
- Execute SQL queries
- Generate migrations
- Manage branches and configurations
- Retrieve logs for debugging

**Links:**
- Docs: https://supabase.com/docs/guides/getting-started/mcp
- GitHub: https://github.com/supabase-community/supabase-mcp
- Features: https://supabase.com/features/mcp-server

**Security Notes:**
- ⚠️ Don't connect to production data
- Use development branches
- Scope to specific project with `project_ref`

---

## 13. Documentation Links

### Expo / React Native

| Resource | URL |
|----------|-----|
| Expo Docs | https://docs.expo.dev/ |
| Expo Router | https://docs.expo.dev/router/introduction/ |
| React Native Reanimated | https://docs.swmansion.com/react-native-reanimated/ |
| React Native Gesture Handler | https://docs.swmansion.com/react-native-gesture-handler/ |
| Expo AV (Audio) | https://docs.expo.dev/versions/latest/sdk/av/ |
| NativeWind | https://www.nativewind.dev/v4/overview |

### Swipe Libraries

| Resource | URL |
|----------|-----|
| rn-swiper-list | https://github.com/AdarshNandanwar/rn-swiper-list |
| rn-swiper-list (Skipperlla) | https://github.com/Skipperlla/rn-swiper-list |

### Backend

| Resource | URL |
|----------|-----|
| Supabase Docs | https://supabase.com/docs |
| Supabase Auth | https://supabase.com/docs/guides/auth |
| Supabase Storage | https://supabase.com/docs/guides/storage |
| Supabase Edge Functions | https://supabase.com/docs/guides/functions |
| pgvector | https://supabase.com/docs/guides/database/extensions/pgvector |

### AI Services

| Resource | URL |
|----------|-----|
| OpenAI Whisper API | https://platform.openai.com/docs/guides/speech-to-text |
| OpenAI Embeddings | https://platform.openai.com/docs/guides/embeddings |
| GPT-4o-mini | https://platform.openai.com/docs/models |

### State & Tooling

| Resource | URL |
|----------|-----|
| Zustand | https://docs.pmnd.rs/zustand/getting-started/introduction |
| Drizzle ORM | https://orm.drizzle.team/docs/overview |

---

## 14. Business Model

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 50 entries/month, 1 min audio, basic search |
| **Pro** | $5/mo or $50/yr | Unlimited entries, 5 min audio, AI search, integrations |
| **Team** | $15/user/mo | Shared bins, admin tools, API access |

**Break-even:** ~13 paying users at $5/mo

---

## 15. Constraints & Priorities

| Priority | Constraint |
|----------|------------|
| 🔴 High | Native-feeling swipe gestures |
| 🔴 High | Low cost (free tiers until traction) |
| 🟡 Medium | Serverless-first (no dedicated backend) |
| 🟡 Medium | AI modularity (easy to swap providers) |
| 🟢 Low | Schema flexibility (labels decoupled from entries) |

---

## 16. Future Roadmap

- [ ] Chrome extension for desktop quick capture
- [ ] iOS/Android native wrappers for app stores
- [ ] Calendar/to-do integrations
- [ ] Proactive AI suggestions
- [ ] Offline AI processing for privacy
- [ ] Shared spaces (Team tier)

---

## 17. Setup Task List (Linux — Web First)

### Prerequisites

- [ ] Bun (`bun -v`)
- [ ] Git (`git -v`)

### Phase 0 — Environment

```bash
# Install Bun if missing
curl -fsSL https://bun.sh/install | bash
```

### Phase 1 — Project Init

- [ ] Create Expo project with web template
- [ ] Configure for web-first (no native dependencies)
- [ ] Install core dependencies (Zustand, NativeWind)
- [ ] Setup Supabase client
- [ ] Configure fonts (Caveat / Permanent Marker)

### Phase 2 — Core UI

- [ ] Card component (title, body, actions)
- [ ] Card stack with swipe gestures (web: mouse drag)
- [ ] Bottom capture zone (hover reveal on desktop)
- [ ] Settings drawer

### Phase 3 — Capture Flow

- [ ] Text input capture
- [ ] Voice recording (browser MediaRecorder API)
- [ ] Save to Supabase

### Phase 4 — Data & Sync

- [ ] Supabase schema setup (entries, labels)
- [ ] CRUD operations
- [ ] Archive functionality
- [ ] Sort options (A-Z, modified date)

### Phase 5 — Polish

- [ ] Grid view toggle
- [ ] Settings persistence
- [ ] Offline support (IndexedDB)
- [ ] PWA manifest

---

### Quick Start Commands

```bash
# 1. Create project
bunx create-expo-app@latest forget --template blank-typescript

# 2. Navigate
cd forget

# 3. Install web dependencies
bunx expo install react-dom react-native-web @expo/metro-runtime

# 4. Install gesture/animation (web-compatible)
bunx expo install react-native-gesture-handler react-native-reanimated

# 5. Install styling
bun add nativewind tailwindcss

# 6. Install state
bun add zustand

# 7. Install Supabase
bun add @supabase/supabase-js

# 8. Run web
bunx expo start --web
```

---

### Notes for Web-Only Dev

| Consideration | Solution |
|---------------|----------|
| No Android Studio | Use `--web` flag only |
| No iOS Simulator | Web browser is your testbed |
| Gesture Handler | Works on web with mouse events |
| Reanimated | Web-compatible, uses CSS transforms |
| Voice recording | Use browser `MediaRecorder` API directly |
| PWA later | Add `@vite-pwa/sveltekit` or Expo PWA config |

---

*Last updated: 2025-12-22*
