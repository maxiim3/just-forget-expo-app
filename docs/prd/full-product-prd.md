# Forget — Full Product PRD

**Version:** 1.0
**Status:** Draft
**Created:** 2026-01-08
**Author:** John (PM Agent)

---

## Executive Summary

This PRD covers the full "Just Forget" product vision — transforming the completed MVP into a complete AI-powered processing inbox. The core philosophy is "processing inbox, not storage" — the goal is to empty it.

**Core Flow:** Drop → Forget → Find → Send

---

## Table of Contents

1. [Project Analysis and Context](#1-project-analysis-and-context)
2. [Requirements](#2-requirements)
3. [User Interface Enhancement Goals](#3-user-interface-enhancement-goals)
4. [Technical Constraints](#4-technical-constraints)
5. [Epic Structure](#5-epic-structure)
6. [Epic Details](#6-epic-details)
7. [Feature Backlog](#7-feature-backlog)
8. [Change Log](#8-change-log)

---

## 1. Project Analysis and Context

### 1.1 Analysis Source

- Brainstorming session output (`docs/brainstorming-session-results.md`)
- MVP specification (`requirements.md`)
- IDE-based code analysis
- Architect consultation for database decision

### 1.2 Current Project State

Forget is a universal mental inbox app. The **MVP is complete** with:

| Feature | Status |
|---------|--------|
| Expo SDK 52+ with Expo Router | ✅ |
| Swipe card stack (rn-swiper-list) | ✅ |
| All gesture directions (left/right/up/down) | ✅ |
| Grid view with active/archived sections | ✅ |
| Edit modal and side drawer | ✅ |
| Bottom drawer for text capture | ✅ |
| PWA support (installable, offline-capable) | ✅ |
| Android support via Expo Go | ✅ |
| Zustand state management | ✅ |
| NativeWind styling | ✅ |

**Current UX Rating:** 7/10 (solid foundation, room to polish)

### 1.3 Available Documentation

| Documentation | Status |
|--------------|--------|
| Tech Stack Documentation | Partial (in CLAUDE.md) |
| Source Tree/Architecture | Partial (in CLAUDE.md) |
| Brainstorming Results | Complete |
| Coding Standards | Not documented |
| API Documentation | N/A (no API yet) |

### 1.4 Enhancement Scope

**Enhancement Types:**
- [x] New Feature Addition (Voice, AI, Chat retrieval)
- [x] Major Feature Modification (Database integration)
- [x] Integration with New Systems (AI middleware layer)
- [x] Technology Stack Upgrade (Supabase full integration)

**Impact Assessment:** Major Impact (architectural changes required)

### 1.5 Goals

- Zero-friction brain dump with AI-powered retrieval
- Transform MVP into complete "Just Forget" experience
- Enable voice input (native and web)
- Implement AI auto-tagging (invisible to user)
- Create chat-based retrieval ("Talk to DB")
- Support export-focused flow (Input → Process → Export/Archive)
- Achieve 9/10 UX rating (from current 7/10)

### 1.6 Background Context

The brainstorming session (2026-01-07) clarified that Forget is fundamentally different from note apps — it's a **processing inbox** where the goal is "zero inbox" (move things OUT or dismiss them). Users should never have to organize anything; AI handles categorization invisibly.

**Key Architecture Decision:** Use **Supabase** (PostgreSQL + Auth + Storage + pgvector) as the unified backend platform. This keeps all services under one roof, reducing complexity and accelerating development. The Supabase client is already configured in `lib/supabase.ts`.

---

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement |
|----|-------------|
| **FR1** | Users can record voice notes using native audio (expo-av) on mobile and MediaRecorder API on web |
| **FR2** | Voice notes are automatically transcribed using Whisper API and stored as searchable text |
| **FR3** | Entries are automatically tagged by AI on creation (invisible to user, no manual categorization) |
| **FR4** | Users can retrieve entries via natural language chat interface ("Talk to DB") |
| **FR5** | Users can search entries semantically using vector embeddings (pgvector) |
| **FR6** | CRUD operations (Create, Read, Update, Delete) are available from all views (Capture, Grid, Retrieve) |
| **FR7** | Users can authenticate via magic link or Google OAuth (Supabase Auth) |
| **FR8** | Entries sync across devices in real-time when online (Supabase real-time) |
| **FR9** | App works offline with optimistic updates, syncing when connection restored |
| **FR10** | Opt-in auto-archive: Users can enable automatic archiving after configurable period (disabled by default) |
| **FR11** | Users can export/share entries to external services via native share sheet |

### 2.2 Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| **NFR1** | Gesture interactions must respond in <100ms to maintain fluid UX |
| **NFR2** | AI operations (tagging, search) must complete within 2 seconds |
| **NFR3** | Voice recordings limited to 15 seconds for POC (premium tier unlocks extended recording) |
| **NFR4** | App must work offline for basic CRUD operations |
| **NFR5** | Support web, iOS, and Android from single Expo codebase |
| **NFR6** | PWA must remain installable and offline-capable |

### 2.3 Compatibility Requirements

| ID | Requirement |
|----|-------------|
| **CR1** | Preserve existing gesture system (rn-swiper-list integration) |
| **CR2** | Maintain Zustand store patterns (optimistic updates extend existing store) |
| **CR3** | Entry type must remain compatible with existing `lib/supabase.ts` definitions |
| **CR4** | NativeWind styling must remain consistent with current UI components |
| **CR5** | Grid and Capture views must continue functioning during incremental migration |

---

## 3. User Interface Enhancement Goals

### 3.1 Integration with Existing UI

| Existing Pattern | Extension |
|------------------|-----------|
| `SwipeCard.tsx` | No changes — gesture system preserved |
| `CardStack.tsx` | No changes — rn-swiper-list integration preserved |
| `EditModal.tsx` | Reuse for Grid/Retrieve edit actions |
| `SideEditDrawer.tsx` | Reuse pattern for consistent edit UX |
| `BottomDrawer.tsx` | Extend with voice recording toggle |

### 3.2 Modified/New Screens

| Screen | Type | Changes |
|--------|------|---------|
| `capture.tsx` | Modified | Add voice recording to BottomDrawer |
| `grid.tsx` | Modified | Add onPress handlers for CRUD |
| `retrieve.tsx` | **New** | Build chat interface for "Talk to DB" |
| Settings | **New** | Auth, auto-archive toggle, premium features |

### 3.3 UI Consistency Requirements

- All edit actions use existing `EditModal` pattern
- Selection/multi-select uses existing `SelectionActionBar`
- Voice recording button follows existing FAB (+) styling
- Chat interface uses same card styling as Grid/Capture
- NativeWind classes remain consistent with current design tokens

---

## 4. Technical Constraints

### 4.1 Technology Stack

| Category | Technology |
|----------|------------|
| **Languages** | TypeScript (strict mode) |
| **Framework** | Expo SDK 52+, React Native, Expo Router |
| **Styling** | NativeWind (Tailwind) |
| **State** | Zustand |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth |
| **Storage** | Supabase Storage |
| **Vectors** | pgvector extension |
| **Animations** | react-native-reanimated |
| **Gestures** | react-native-gesture-handler, rn-swiper-list |
| **Voice** | expo-av (native), MediaRecorder API (web) |

### 4.2 Integration Approach

| Area | Strategy |
|------|----------|
| **Database** | Replace mock data with Supabase queries. Extend Zustand store with async actions. |
| **API** | Use Supabase client directly. Edge Functions for AI operations only. |
| **Frontend** | Extend existing components. Add new Retrieve view. Minimal changes to Capture/Grid. |
| **Testing** | Manual testing for POC. Add unit tests for store logic in future. |

### 4.3 Code Organization

| Aspect | Standard |
|--------|----------|
| **File Structure** | `/app` for routes, `/components` for UI, `/lib` for utilities |
| **Naming** | PascalCase components, camelCase functions, kebab-case files |
| **State** | Zustand for global state, local state for component-specific UI |

### 4.4 Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase learning curve | Low | Well-documented, similar patterns |
| Voice recording cross-platform | Medium | expo-av + MediaRecorder polyfill |
| AI service costs | Medium | 15-second limit, cache embeddings |
| Offline sync conflicts | Medium | Last-write-wins (single-user) |
| pgvector performance | Low | Inbox scale (thousands, not millions) |

---

## 5. Epic Structure

### 5.1 Epic Approach

**5 Sequential Epics** that build upon each other, minimizing risk and allowing learning between phases.

```
Epic 1: UX Polish (Immediate)
    ↓
Epic 2: Supabase Integration (Phase 2a)
    ↓
Epic 3: Voice Input (Phase 2b)
    ↓
Epic 4: AI Retrieval (Phase 2c)
    ↓
Epic 5: Export & Sharing (Phase 3)
```

### 5.2 Epic Overview

| # | Epic | Goal | Stories | Phase |
|---|------|------|---------|-------|
| 1 | UX Polish | 7/10 → 9/10 UX, CRUD in all views | 3 | Immediate |
| 2 | Supabase Integration | Replace mock data, add auth, offline sync | 4 | 2a |
| 3 | Voice Input | 15-sec voice recording + transcription | 3 | 2b |
| 4 | AI Retrieval | Auto-tagging, embeddings, chat interface | 4 | 2c |
| 5 | Export & Sharing | Native share sheet, quick export actions | 2 | 3 |

**Total Stories:** 16

---

## 6. Epic Details

### Epic 1: UX Polish

**Goal:** Achieve 9/10 gesture feel and enable CRUD from all views
**Phase:** Immediate
**Risk Level:** Low

---

#### Story 1.1: CRUD in Grid View

> As a **user**,
> I want to **tap a card in Grid view to edit, archive, or delete it**,
> so that **I can manage entries without switching to Capture view**.

**Acceptance Criteria:**
1. Tapping a Grid card opens the existing `EditModal`
2. Long-press shows context menu (Edit / Archive / Delete)
3. Multi-select mode works with existing `SelectionActionBar`
4. Archived entries show in separate "Archived" section

**Integration Verification:**
- IV1: Grid view continues to display entries correctly
- IV2: Archived entries still visible in archived section
- IV3: No impact on Capture view functionality

---

#### Story 1.2: CRUD in Retrieve View

> As a **user**,
> I want to **tap search results in Retrieve view to edit or act on them**,
> so that **I can process entries directly from search results**.

**Acceptance Criteria:**
1. Retrieve view displays entries as tappable cards
2. Tapping opens `EditModal` (reuse existing component)
3. Actions update entry and refresh search results

**Integration Verification:**
- IV1: Retrieve view placeholder replaced with functional list
- IV2: Entry changes reflect in Grid and Capture views
- IV3: No regression in existing functionality

---

#### Story 1.3: Gesture Polish

> As a **user**,
> I want **swipe gestures to feel snappy and satisfying**,
> so that **daily use of the app is pleasant**.

**Acceptance Criteria:**
1. Swipe snap-back timing feels responsive (<200ms)
2. Haptic feedback on successful swipe (mobile only)
3. Visual bounce effect on card return
4. Swipe sensitivity tuned for accidental vs intentional gestures

**Integration Verification:**
- IV1: All four swipe directions still trigger correct actions
- IV2: rn-swiper-list integration unchanged
- IV3: Performance remains smooth (60fps animations)

---

### Epic 2: Supabase Integration

**Goal:** Replace mock data with Supabase, add authentication and offline sync
**Phase:** 2a
**Risk Level:** Medium

---

#### Story 2.1: Supabase Database Setup

> As a **developer**,
> I want to **set up Supabase tables matching the existing Entry type**,
> so that **the app can persist data to a real database**.

**Acceptance Criteria:**
1. Tables created: `entries`, `labels`, `entry_labels`
2. Row Level Security (RLS) enabled on all tables
3. Entry type in `lib/supabase.ts` matches table schema
4. Seed script for test data

**Integration Verification:**
- IV1: Existing Entry type requires no changes
- IV2: App builds without TypeScript errors
- IV3: Supabase dashboard shows tables with RLS policies

---

#### Story 2.2: User Authentication

> As a **user**,
> I want to **sign in with magic link or Google**,
> so that **my entries are private and synced across devices**.

**Acceptance Criteria:**
1. Magic link auth flow works
2. Google OAuth works
3. Session persists across app restarts
4. Unauthenticated users see sign-in screen
5. User ID attached to all entries (RLS enforced)

**Integration Verification:**
- IV1: Existing UI components render correctly after auth
- IV2: Zustand store resets on logout
- IV3: No entry data leaks between users

---

#### Story 2.3: Entry CRUD with Supabase

> As a **user**,
> I want to **create, read, update, and delete entries that persist to the cloud**,
> so that **my data is saved and available across devices**.

**Acceptance Criteria:**
1. Create entry → inserts to Supabase
2. Read entries → fetches from Supabase (with local cache)
3. Update entry → updates in Supabase
4. Delete entry → soft delete or hard delete
5. Real-time subscription updates local state

**Integration Verification:**
- IV1: All existing CRUD operations work
- IV2: Mock data completely removed
- IV3: Zustand store patterns preserved

---

#### Story 2.4: Offline Support & Sync

> As a **user**,
> I want to **create and edit entries while offline**,
> so that **the app works without internet connection**.

**Acceptance Criteria:**
1. Entries cached locally (AsyncStorage / localStorage)
2. Offline creates queued and synced when online
3. Offline edits use optimistic updates
4. Conflict resolution: last-write-wins
5. Visual indicator when offline / syncing

**Integration Verification:**
- IV1: App launches and displays entries when offline
- IV2: Online sync doesn't duplicate entries
- IV3: PWA offline capability preserved

---

### Epic 3: Voice Input

**Goal:** Enable 15-second voice recording with transcription
**Phase:** 2b
**Risk Level:** Medium

---

#### Story 3.1: Voice Recording (Native)

> As a **mobile user**,
> I want to **tap a microphone button and record a voice note**,
> so that **I can capture thoughts without typing**.

**Acceptance Criteria:**
1. Mic button in BottomDrawer
2. Tap to start, tap to stop
3. Recording limited to 15 seconds (auto-stop)
4. Audio saved to Supabase Storage
5. Entry created with `raw_audio_url` populated
6. Visual timer during recording

**Integration Verification:**
- IV1: Text input still works normally
- IV2: BottomDrawer gesture unchanged
- IV3: Entry appears in Capture stack after recording

---

#### Story 3.2: Voice Recording (Web)

> As a **web/PWA user**,
> I want to **record voice notes in the browser**,
> so that **I have feature parity with mobile**.

**Acceptance Criteria:**
1. MediaRecorder API used for web
2. Browser permission prompt for microphone
3. Same 15-second limit as native
4. Audio uploaded to Supabase Storage
5. Fallback message if unsupported

**Integration Verification:**
- IV1: PWA still installable
- IV2: Works in Chrome, Firefox, Safari
- IV3: No impact on native builds

---

#### Story 3.3: Voice Transcription

> As a **user**,
> I want **my voice notes automatically transcribed**,
> so that **I can search and read them later**.

**Acceptance Criteria:**
1. Audio sent to Whisper API after upload
2. Transcription stored in entry `content` field
3. Processing indicator while transcribing
4. Fallback if transcription fails
5. Original audio preserved for playback

**Integration Verification:**
- IV1: Entry displays transcribed text
- IV2: Search includes transcribed content
- IV3: Audio playback available

---

### Epic 4: AI Retrieval

**Goal:** Auto-tagging, semantic search, and chat-based retrieval
**Phase:** 2c
**Risk Level:** Medium-High

---

#### Story 4.1: AI Middleware Setup

> As a **developer**,
> I want to **set up Supabase Edge Functions for AI operations**,
> so that **AI processing happens server-side**.

**Acceptance Criteria:**
1. Edge Function: `generate-embedding`
2. Edge Function: `auto-tag`
3. Edge Function: `semantic-search`
4. OpenAI API key in Supabase secrets
5. Rate limiting / error handling

**Integration Verification:**
- IV1: Edge Functions callable from app
- IV2: Existing CRUD unaffected
- IV3: Graceful fallback if AI unavailable

---

#### Story 4.2: Auto-Tagging on Input

> As a **user**,
> I want **entries automatically tagged when I create them**,
> so that **I never have to organize manually**.

**Acceptance Criteria:**
1. New entries trigger `auto-tag` function
2. Tags stored in `labels` table
3. Tagging is invisible (no manual UI)
4. Tagging runs async (non-blocking)

**Integration Verification:**
- IV1: Entry creation remains fast
- IV2: Tags appear in metadata after processing
- IV3: No UI changes in Capture view

---

#### Story 4.3: Vector Embeddings & Semantic Search

> As a **user**,
> I want to **search entries by meaning, not just keywords**,
> so that **I can find things without exact words**.

**Acceptance Criteria:**
1. `embedding` column added (vector(1536))
2. Embeddings generated for all entries
3. Cosine similarity search
4. Hybrid search: vector + full-text
5. Results ranked by relevance

**Integration Verification:**
- IV1: Keyword search still works
- IV2: Retrieve view shows semantic results
- IV3: Search performance <2 seconds

---

#### Story 4.4: Chat Retrieval ("Talk to DB")

> As a **user**,
> I want to **ask questions in natural language**,
> so that **retrieval feels like talking to my notes**.

**Acceptance Criteria:**
1. Chat input in Retrieve view
2. Query triggers semantic search
3. Results as conversation flow
4. Conversation history in session

**Integration Verification:**
- IV1: Retrieve view fully functional
- IV2: Results link to full entry
- IV3: No impact on other views

---

### Epic 5: Export & Sharing

**Goal:** Move entries OUT to where they belong
**Phase:** 3
**Risk Level:** Low

---

#### Story 5.1: Native Share Sheet

> As a **mobile user**,
> I want to **share an entry via native share sheet**,
> so that **I can send thoughts to any app**.

**Acceptance Criteria:**
1. Share button on entry detail
2. Triggers native share sheet
3. Shares as plain text
4. Web fallback: copy to clipboard

**Integration Verification:**
- IV1: Share works from all views
- IV2: No impact on edit/archive
- IV3: Works on web with fallback

---

#### Story 5.2: Quick Export Actions

> As a **user**,
> I want **preset export actions for common destinations**,
> so that **I can quickly move entries**.

**Acceptance Criteria:**
1. Presets: Calendar, Reminder, Email draft
2. Accessible from context menu
3. Deep links where supported

**Integration Verification:**
- IV1: Existing actions unchanged
- IV2: Export doesn't modify entry
- IV3: Works on web with fallbacks

---

## 7. Feature Backlog

Features deferred from this PRD for future consideration:

| Feature | Reason Deferred | Priority |
|---------|-----------------|----------|
| **Image input** (photo/screenshot) | Scope control for POC; requires OCR pipeline | Medium |
| **Extended voice recording** | Cost management; unlock in premium tier | Medium |
| **Browser extension** | Requires separate codebase | Low |
| **Watch app** | Requires native development | Low |
| **Shared bins** | Multi-user complexity | Low |

---

## 8. Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial draft | 2026-01-08 | 1.0 | Full product PRD from MVP + brainstorming | John (PM) |

---

*Generated with BMAD Method — Brownfield PRD Template v2.0*
