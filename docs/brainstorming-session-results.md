# Brainstorming Session Results

**Session Date:** 2026-01-07
**Facilitator:** Business Analyst Mary
**Participant:** Maxime

---

## Executive Summary

**Topic:** Just Forget — Vision, Features, UX, and Technical Direction

**Session Goals:** Structure product vision, clarify features and UX, resolve technical questions using BMAD methodology

**Techniques Used:** First Principles Thinking, Mind Mapping, Six Thinking Hats

**Total Ideas Generated:** 30+

### Key Themes Identified:
- Zero-friction brain dump with AI-powered retrieval
- Processing inbox (not storage) — goal is to empty it
- "Just Forget" brand has strong viral potential
- Export-focused flow: Input → Process → Export/Archive
- AI as invisible middleware layer

---

## Technique Sessions

### First Principles Thinking

**Description:** Stripped away assumptions to identify core problems and solutions.

**Ideas Generated:**
1. Core identity: Zero-friction brain dump + fast retrieval
2. Friction sources: Too many interactions, categorization, storage decisions, formatting
3. Fastest input: Voice-first, minimal taps (open → input → done)
4. Retrieval methods: Swipe UI (Tinder-like), AI search, Grid overview
5. No user-facing categorization — AI handles it invisibly
6. Swipe serves 3 purposes: Speed, forcing decisions, reducing cognitive load

**Insights Discovered:**
- Forget is NOT a note app — it's a processing inbox
- The goal is "zero inbox" — move things OUT or dismiss them
- Users should never have to organize anything

**Notable Connections:**
- Swipe UX directly supports the "force decisions" principle
- AI invisible tagging enables "no categorization" while still being searchable

---

### Mind Mapping

**Description:** Visual structure of the full Forget vision.

**Core Map Structure:**

```
                              ┌─────────┐
                              │ FORGET  │
                              └─────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
     ┌────┴────┐              ┌────┴────┐              ┌────┴────┐
     │  INPUT  │              │   AI    │              │ RETRIEVE│
     └─────────┘              │  LAYER  │              └─────────┘
          │                   └─────────┘                   │
  ┌───┬───┼───┬───┐               │               ┌────────┼────────┐
  │   │   │   │   │         ┌─────┼─────┐         │        │        │
 🎤  📝  📷  🔗  📤      auto-tag search chat    💬      👆      📊
speak text img link share          │              talk   swipe    grid
                                   │              to DB
                              background
```

**Input Channels (5):**
- 🎤 Speak (voice)
- 📝 Text (type)
- 📷 Image (photo/screenshot)
- 🔗 Link (URL)
- 📤 Share-to-app (from other apps)

**Retrieve Methods (3):**
- 💬 Talk to DB (AI chat with notes)
- 👆 Swipe (card-by-card decisions)
- 📊 Grid (birds-eye overview)

**Key Decision:** CRUD available from ALL views (swipe, grid, retrieve)

---

### Six Thinking Hats

#### ⚪ White Hat — Facts

| Fact | Detail |
|------|--------|
| Target user | Self-first, not defined persona yet |
| Core purpose | Temporary bin → empty it, NOT storage |
| Competition | Todo apps, Google Keep |
| Export (mobile) | Native share sheet |
| Export (desktop) | Google Tasks, Calendar, Notion, Todoist |
| Future exports | User-defined connections |

#### ❤️ Red Hat — Feelings

| Aspect | Gut Feeling |
|--------|-------------|
| Brand "Just Forget" | Strong — "just F it", "Forget about it" |
| Building it | Excited |
| Swipe UX | Simple, pleasant |
| Current POC | 7/10 — solid foundation, room to polish |

#### ⚫ Black Hat — Risks

| Risk Category | Details |
|---------------|---------|
| Adoption | Automated system users won't need it; all-in-one preference |
| Technical | Swipe gesture complexity, AI bindings, React Native learning curve |
| Habit formation | Competing with "text myself" / Apple Notes |
| Inbox clutter | Users may not empty it |
| Gesture UX | May not be pleasant in daily use (needs testing) |

**Mitigations Identified:**
- Auto-archive feature
- Reminders / expiration dates
- Gesture refinement through real-world testing

#### 💛 Yellow Hat — Benefits

**Core Value Proposition:**
> A home for thoughts that aren't todos and aren't permanent notes. Just temporary. Just dump. Just forget.

**Unique Differentiators:**
- Auto-tagging (zero effort to organize)
- Auto-categorizing (AI does the thinking)
- Talk to notes (natural retrieval)
- Input → Process → Export (clear flow)

**1-Year Vision:**
- 💰 Paid tier: Custom AI model, self-hosted option
- 👕 Merch: Print on Demand ("Just F it" brand)
- 📱 Social: Community building

#### 💚 Green Hat — Creative Ideas

**Shared Experience:**
- 🤝 Shared bin with another user
- ⏰ Time-triggered notes with friend notifications
- 🔮 Smart recall: "Find what I had to remember today"

**Input Everywhere:**
- ⌚ Watch (Wear OS / Watch OS)
- 🌐 Browser extension
- 🗣️ Voice assistants (Alexa, Google Home)
- 📺 Smart TV

**Moonshots:**
- ⌨️ "F" monokey (single-button IoT device)
- 🤖 AI synthesis (merge notes → generate content)
- 🪙 NFT/Token for each forgotten note

**Viral Strategy:**
- "Just F it" branding
- Meme culture / trolling on social

**Priority Wild Ideas:**
1. ⭐ Smart recall (context-aware retrieval)
2. ⭐ Browser extension (quick input)
3. ⭐ F monokey (hardware moonshot)
4. ⭐ NFT/token (web3 moonshot)

#### 🔵 Blue Hat — Overview

**What's Clear:**
- Product identity: Processing inbox, not storage
- Core UX: Input → Swipe/Chat/Grid → Export/Archive
- Architecture direction: Turso + AI middleware
- Differentiators: Auto-tag, talk to notes, brand
- Scaling vision: Paid tier, merch, hardware, crypto

**Status:** Ready to move to implementation planning

---

## Idea Categorization

### Immediate Opportunities
*Ideas ready to implement now*

1. **CRUD in all views**
   - Description: Enable edit/archive/delete from Grid and Retrieve views
   - Why immediate: Grid cards already Pressable but no handler
   - Resources needed: Existing components, minor refactor

2. **Gesture polish**
   - Description: Improve swipe feel (snap, timing, bounce, sensitivity)
   - Why immediate: Core UX at 7/10, needs to be 9/10
   - Resources needed: Animation tuning, real device testing

3. **Auto-archive / expiration**
   - Description: Notes auto-archive after X days if not processed
   - Why immediate: Prevents inbox clutter (Black Hat risk)
   - Resources needed: Date logic, settings UI

### Future Innovations
*Ideas requiring development/research*

1. **AI Layer Implementation**
   - Description: MCP-like middleware for auto-tagging, embeddings, smart search
   - Development needed: Turso integration, AI service binding, embedding storage
   - Timeline estimate: Phase 2

2. **Talk to DB (Chat Retrieval)**
   - Description: Natural language queries to notes
   - Development needed: AI integration, semantic search, UI for chat
   - Timeline estimate: Phase 2

3. **Browser Extension**
   - Description: Quick input from any webpage
   - Development needed: Extension architecture, auth sync
   - Timeline estimate: Phase 3

4. **Smart Recall**
   - Description: Context-aware retrieval ("what did I need to remember today")
   - Development needed: Time-based triggers, AI context understanding
   - Timeline estimate: Phase 3

5. **Image Input**
   - Description: Capture photos/screenshots as entries with OCR text extraction
   - Development needed: Camera integration, OCR pipeline (Google Vision or Tesseract)
   - Timeline estimate: Phase 3+
   - Note: Deferred from Full Product PRD to control scope

### Moonshots
*Ambitious, transformative concepts*

1. **F Monokey (IoT Device)**
   - Description: Single-button hardware device to capture thoughts
   - Transformative potential: Physical brand presence, zero-friction input
   - Challenges to overcome: Hardware manufacturing, BLE integration

2. **NFT/Crypto Token**
   - Description: Each forgotten note becomes a collectible artifact
   - Transformative potential: Web3 integration, unique value proposition
   - Challenges to overcome: Blockchain integration, market fit

3. **Shared Bins**
   - Description: Common inbox between users
   - Transformative potential: Social layer, collaborative forgetting
   - Challenges to overcome: Multi-user sync, permissions

### Insights & Learnings
*Key realizations from the session*

- **Processing vs Storage:** Forget is fundamentally different from note apps — it's an inbox to empty
- **Brand is Asset:** "Just Forget" / "Just F it" has viral potential beyond the app
- **AI is Invisible:** Users never organize; AI does it behind the scenes
- **Export is Core:** The value isn't keeping notes, it's moving them to the right place
- **Hardware Potential:** The "F" brand could extend to physical products

---

## Action Planning

### Top 3 Priority Ideas

#### #1 Priority: CRUD in All Views
- Rationale: Foundational UX fix; wherever you see an entry, you should act on it
- Next steps: Add onPress handlers to Grid cards, implement edit/archive from Retrieve
- Resources needed: Existing component patterns
- Timeline: Immediate

#### #2 Priority: Gesture Polish (7/10 → 9/10)
- Rationale: Core UX must be delightful; swipe is the heart of the app
- Next steps: Tune snap feel, timing, bounce, sensitivity; test on real devices
- Resources needed: Animation expertise, user testing
- Timeline: Immediate

#### #3 Priority: Auto-Archive / Expiration System
- Rationale: Prevents the "cluttered inbox" risk identified in Black Hat
- Next steps: Design expiration rules, settings UI, notification system
- Resources needed: Date handling, local notifications
- Timeline: Near-term

---

## Reflection & Follow-up

### What Worked Well
- First Principles clarified the core identity quickly
- Mind Mapping revealed the INPUT/AI/RETRIEVE structure
- Six Thinking Hats surfaced both risks and moonshot opportunities
- Progressive technique flow matched the goal (vision → specifics)

### Areas for Further Exploration
- AI Layer architecture: Need Architect (Winston) deep-dive
- Auth strategy: Turso doesn't include auth — need solution
- File storage: Voice notes and images need a home

### Recommended Follow-up Techniques
- Question Storming: Surface all technical questions for Architect
- Role Playing: Explore from different user personas

### Questions That Emerged
- What makes swipe feel 9/10 vs 7/10?
- How does AI fallback work if the layer is down?
- REST vs GraphQL — which and why?
- Auth solution without Supabase?
- Where do voice notes and images live?

### Next Session Planning
- **Suggested topics:** Technical architecture with Winston, Story creation with John
- **Recommended timeframe:** Immediate
- **Preparation needed:** This brainstorming document as input

---

## Architecture Notes

### Current Stack Decision

```
┌─────────────────────────────────────────────────────────────┐
│                         FORGET APP                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
      on input      explicit query     browse/CRUD
          │                │                │
          ▼                ▼                ▼
   ┌──────────────────────────┐      ┌───────────┐
   │        AI LAYER          │      │  REST /   │
   │  • auto-tag              │      │  GraphQL  │
   │  • embeddings            │      │  (direct) │
   │  • smart search          │      └─────┬─────┘
   │  • chat to DB            │            │
   └────────────┬─────────────┘            │
                │                          │
                └────────────┬─────────────┘
                             │
                      ┌──────┴──────┐
                      │    TURSO    │
                      │  (SQLite)   │
                      └─────────────┘
```

### Open Technical Questions
1. Auth strategy without Supabase?
2. File storage for voice/images?
3. AI fallback strategy if layer is down?
4. REST vs GraphQL decision?

---

## Current Gesture Implementation (from POC analysis)

| Swipe | Current Action |
|-------|----------------|
| ← Left | Toggle multi-selection |
| → Right | Open SideEditDrawer (Edit/Archive/Delete) |
| ↓ Down | Next card |
| ↑ Up | Previous card (from bottom stack) |

**Multi-selection:** Implemented with SelectionActionBar (Archive/Delete/Tags)

**CRUD by View:**
| View | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Capture (Swipe) | ✅ | ✅ | ✅ | ✅ |
| Grid | ❌ | ✅ | ❌ | ❌ |
| Retrieve | ❌ | ❌ | ❌ | ❌ |

---

*Session facilitated using the BMAD-METHOD brainstorming framework*
