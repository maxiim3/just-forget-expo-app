# Epic 3: Input Expansion

**Status:** Draft
**Priority:** Medium
**Phase:** Phase 2
**Estimated Stories:** 3-4

---

## Overview

Expand input methods beyond text to include voice recording. Implement auto-archive system to prevent inbox clutter and maintain the "processing inbox" philosophy.

## Business Value

- **Zero Friction:** Voice is the fastest input method for capturing thoughts
- **Inbox Zero:** Auto-archive prevents clutter, maintains app philosophy
- **Use Cases:** Walking, driving, hands-busy scenarios

## Current State

- Text input via BottomDrawer ✅
- No voice recording capability
- No auto-archive/expiration system
- Manual archive only (swipe left)

## Target State

- Voice recording with transcription
- Auto-archive after configurable time period
- Expiration reminders/notifications
- Multiple input channels ready for future expansion

## Input Channels (from Brainstorming)

| Channel | Status | Priority |
|---------|--------|----------|
| Text | ✅ Done | - |
| Voice | ❌ Needed | This Epic |
| Image | ❌ Future | Epic 5+ |
| Link | ❌ Future | Epic 5+ |
| Share-to-app | ❌ Future | Epic 5+ |

## Stories

### Story 3.1: Voice Recording (Native)
- Implement voice recording using expo-av
- Create voice recording UI in BottomDrawer
- Store audio files in Supabase Storage
- Link audio URL to entry record

### Story 3.2: Voice Recording (Web)
- Implement MediaRecorder API for web platform
- Unified UI across native and web
- Handle browser permissions gracefully
- Fallback messaging for unsupported browsers

### Story 3.3: Voice Transcription
- Integrate speech-to-text service
- Auto-transcribe voice recordings
- Store both audio and transcription
- Allow manual transcription editing

### Story 3.4: Auto-Archive System
- Create expiration settings (default: 7 days)
- Background job to check and archive expired entries
- Notification before auto-archive (1 day warning)
- User settings to configure or disable

## Dependencies

- Epic 2 (Data Persistence) - need Supabase for audio storage
- Supabase Storage bucket for audio files

## Technical Notes

- **Native:** expo-av for recording
- **Web:** MediaRecorder API
- **Storage:** Supabase Storage for audio files
- **Transcription:** Consider Whisper API, Google Speech-to-Text, or AssemblyAI

## Acceptance Criteria

- [ ] Users can record voice notes on mobile
- [ ] Users can record voice notes on web
- [ ] Voice recordings are stored and playable
- [ ] Transcription is available for voice entries
- [ ] Entries auto-archive after configured period
- [ ] Users receive notification before auto-archive
- [ ] Auto-archive settings are configurable

## Risks

| Risk | Mitigation |
|------|------------|
| Audio storage costs | Set recording length limits |
| Transcription accuracy | Allow manual editing of transcripts |
| Web browser support | Graceful fallback to text-only |
| Background job reliability | Use Supabase Edge Functions |

## Open Questions

- Which transcription service to use?
- Default auto-archive period (7 days? 14 days?)
- Audio format (webm, mp3, m4a)?

---

*Epic created by Sarah (Product Owner) - 2026-01-08*
