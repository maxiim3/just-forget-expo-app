# Epic 1: UX Polish

**Status:** Draft
**Priority:** High
**Phase:** Immediate
**Estimated Stories:** 2-3

---

## Overview

Enhance the existing MVP user experience to production quality. Focus on completing CRUD operations across all views and refining gesture interactions from 7/10 to 9/10 satisfaction.

## Business Value

- **User Retention:** Smooth, consistent UX reduces friction and increases daily usage
- **Feature Parity:** Users expect edit/delete actions available wherever they see content
- **Brand Experience:** Gesture quality directly impacts "Just Forget" brand perception

## Current State

| View | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Capture (Swipe) | ✅ | ✅ | ✅ | ✅ |
| Grid | ❌ | ✅ | ❌ | ❌ |
| Retrieve | ❌ | ❌ | ❌ | ❌ |

**Gesture Rating:** 7/10 (needs polish on snap, timing, bounce, sensitivity)

## Target State

| View | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Capture (Swipe) | ✅ | ✅ | ✅ | ✅ |
| Grid | ✅ | ✅ | ✅ | ✅ |
| Retrieve | ✅ | ✅ | ✅ | ✅ |

**Gesture Rating:** 9/10 (delightful, snappy, intuitive)

## Stories

### Story 1.1: CRUD in Grid View
- Enable tap on Grid cards to open edit modal
- Add long-press for quick archive/delete actions
- Maintain existing grid layout and visual style

### Story 1.2: CRUD in Retrieve View
- Add entry display capability to Retrieve view
- Enable edit/archive/delete from Retrieve results
- Consistent action patterns with Grid view

### Story 1.3: Gesture Polish
- Tune swipe snap feel and timing
- Adjust bounce and sensitivity parameters
- Test on real devices (iOS, Android, Web)
- Document final gesture configuration

## Dependencies

- None (builds on existing MVP components)

## Technical Notes

- Reuse existing `EditModal` component
- Grid cards already have `Pressable` wrapper (needs onPress handler)
- Retrieve view needs entry list component

## Acceptance Criteria

- [ ] Grid cards are tappable with edit capability
- [ ] Grid supports long-press for archive/delete
- [ ] Retrieve view displays and allows CRUD on entries
- [ ] Gesture feel rated 9/10 by product owner
- [ ] All CRUD actions work consistently across views
- [ ] No regression in existing Capture view functionality

## Risks

| Risk | Mitigation |
|------|------------|
| Gesture tuning is subjective | Define specific metrics (snap distance, timing ms) |
| Cross-platform gesture differences | Test on all platforms before finalizing |

---

*Epic created by Sarah (Product Owner) - 2026-01-08*
