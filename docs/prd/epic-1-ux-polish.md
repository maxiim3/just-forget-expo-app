# Epic 1: UX Polish

**Status:** In Progress
**Priority:** High
**Phase:** Immediate
**Estimated Stories:** 3

---

## Overview

Enhance the existing MVP user experience to production quality. Focus on completing CRUD operations, refining gesture interactions, and introducing a **unified command input** that replaces the separate Retrieve view with an always-visible, NLP-powered input bar.

## Business Value

- **User Retention:** Smooth, consistent UX reduces friction and increases daily usage
- **Unified Interaction:** Single input point for all actions (add, search, filter, archive)
- **Brand Experience:** Gesture quality + command input creates "Just Forget" identity

## Current State (Post 1.1 & 1.3)

| View | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Swipe (Capture) | ✅ | ✅ | ✅ | ✅ |
| Grid | ✅ | ✅ | ✅ | ✅ |

**Gesture Rating:** 9/10 (tuned with centralized config)
**Navigation:** 3 tabs (Capture, Retrieve placeholder, Grid)

## Target State

| View | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Swipe | ✅ | ✅ | ✅ | ✅ |
| Grid | ✅ | ✅ | ✅ | ✅ |
| **Command Input** | ✅ | ✅ (search) | ✅ (filter) | ✅ (action) |

**Navigation:** 2 views (Swipe, Grid) + floating Command Input
**Gesture Rating:** 9/10 (delightful, snappy, intuitive)

## Stories

### Story 1.1: CRUD in Grid View ✅
- Enable tap on Grid cards to open edit modal
- Add long-press for quick archive/delete actions
- Visual press feedback (opacity + scale)
- **Status:** Done

### Story 1.2: Unified Command Input 🔄
- Floating input bar fixed at bottom of screen
- NLP keyword detection (add, search, find, filter, archive, delete)
- Highlighted keywords + command chip display
- Tag detection (#tag) and natural dates (tomorrow, monday)
- Replaces Retrieve view and BottomDrawer
- **Status:** In Progress

### Story 1.3: Gesture Polish ✅
- Centralized gesture config in theme.ts
- Tuned spring animation (damping: 20, stiffness: 200)
- Reduced rotation (6° vs 8°), tighter direction lock
- **Status:** Done

## Dependencies

- None (builds on existing MVP components)

## Technical Notes

- Reuse existing `EditModal` component ✅
- Grid cards have `Pressable` with onPress/onLongPress handlers ✅
- Gesture config centralized in `constants/theme.ts` ✅
- **New:** Command Input uses overlay technique for text highlighting
- **New:** NLP parser with regex tokenization (no external library)
- **New:** Tab bar hidden, navigation via swipe gesture or command

## Acceptance Criteria

- [x] Grid cards are tappable with edit capability
- [x] Grid supports long-press for archive/delete
- [x] Gesture feel rated 9/10 (centralized config, tuned parameters)
- [ ] Command Input visible on all views (floating bottom)
- [ ] Keywords highlighted in input with colors
- [ ] Command chip shows detected action
- [ ] Search/filter updates views in real-time
- [ ] Retrieve tab removed, navigation is 2 views only
- [ ] No regression in existing Swipe view functionality

## Risks

| Risk | Mitigation |
|------|------------|
| ~~Gesture tuning is subjective~~ | ✅ Defined specific metrics in gestureConfig |
| TextInput highlighting complexity | Use overlay technique (transparent input + colored overlay) |
| Command parsing edge cases | Start with explicit keywords, expand iteratively |

---

*Epic created by Sarah (Product Owner) - 2026-01-08*
*Updated: 2026-01-12 - Stories 1.1 & 1.3 Done, Story 1.2 redefined as Command Input*
