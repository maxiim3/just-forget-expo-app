# Epic 2: Data Persistence

**Status:** Draft
**Priority:** High
**Phase:** Phase 2
**Estimated Stories:** 3-4

---

## Overview

Replace mock data with real persistence using Supabase. Implement user authentication to enable personal data isolation and cross-device sync.

## Business Value

- **Data Durability:** User thoughts persist beyond app sessions
- **Cross-Device:** Access entries from any device
- **Foundation:** Required for all future features (AI, sharing, etc.)

## Current State

- Mock data with 12 hardcoded entries (`lib/mockData.ts`)
- Zustand store for in-memory state (`lib/store.ts`)
- Supabase client configured but unused (`lib/supabase.ts`)
- No authentication

## Target State

- All entries stored in Supabase `entries` table
- User authentication (email/social)
- Real-time sync across devices
- Offline-first with sync when online

## Data Model (from CLAUDE.md)

```sql
-- entries
id, user_id, content, raw_audio_url, created_at, updated_at, metadata (JSONB), archived

-- labels
id, user_id, name, type (space/tag/location/date), metadata

-- entry_labels
entry_id, label_id (join table)
```

## Stories

### Story 2.1: Supabase Database Setup
- Create tables in Supabase (entries, labels, entry_labels)
- Set up Row Level Security (RLS) policies
- Configure database types for TypeScript

### Story 2.2: User Authentication
- Implement email/password auth
- Add social auth (Google, Apple)
- Create auth UI (login, signup, forgot password)
- Handle auth state in Zustand store

### Story 2.3: Entry CRUD with Supabase
- Replace mock data with Supabase queries
- Implement create, read, update, delete operations
- Handle loading and error states
- Maintain optimistic updates for responsiveness

### Story 2.4: Offline Support & Sync
- Implement offline queue for actions
- Sync when connectivity restored
- Handle conflict resolution
- Show sync status to user

## Dependencies

- Epic 1 (UX Polish) should be completed first for consistent CRUD patterns

## Technical Notes

- Supabase client already exists at `lib/supabase.ts`
- Consider using Supabase Realtime for live sync
- Expo SecureStore for token persistence

## Acceptance Criteria

- [ ] Users can sign up and log in
- [ ] Entries persist across app restarts
- [ ] Entries sync across devices
- [ ] App works offline with sync on reconnect
- [ ] Mock data removed, all data from Supabase
- [ ] RLS ensures users only see their own data

## Risks

| Risk | Mitigation |
|------|------------|
| Auth complexity | Start with email, add social later |
| Offline sync conflicts | Last-write-wins initially, improve later |
| Migration from mock data | Provide "import sample data" for testing |

## Open Questions

- Auth solution without Supabase Auth? (from brainstorming)
- OAuth providers to support initially?

---

*Epic created by Sarah (Product Owner) - 2026-01-08*
