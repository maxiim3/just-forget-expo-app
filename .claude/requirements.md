# Requirements

## Product

| Field | Value |
|-------|-------|
| Name | Forget |
| Tagline | What will you forget today? |
| Hook | You forget. We remember. |

**Description**: Universal mental inbox — drop thoughts, ideas, links, voice notes instantly.

**Core Flow**: `Drop → Forget → Find → Send`

## Modes

| Mode | Purpose | Status |
|------|---------|--------|
| Capture | Drop thoughts fast (swipe cards) | Default |
| Retrieve | Find stuff back (AI chat) | Phase 2 |

## Gestures (Capture Mode)

| Gesture | Action |
|---------|--------|
| Swipe Right | Scroll (next card) |
| Swipe Left | Archive |
| Swipe Up/Down | Edit |
| Bottom → Up | New capture |

## Views

| View | Description |
|------|-------------|
| Stack | Default. Tinder-style pile. |
| Grid | All entries. Sortable. Searchable. |
| Chat | Retrieve mode. AI search. (Phase 2) |

## Settings

| Setting | Options | Default |
|---------|---------|---------|
| Invert L/R gestures | On/Off | Off |
| Sort order | A-Z / Modified asc/desc | Modified desc |
| Default view | Capture/Retrieve | Capture |
| Retrieve mode | Enabled/Disabled | Disabled |

## Data Model

### entries
- id (UUID, PK)
- user_id (UUID, FK)
- content (TEXT)
- raw_audio_url (TEXT)
- created_at, updated_at (TIMESTAMP)
- metadata (JSONB)
- archived (BOOLEAN)

### labels
- id (UUID, PK)
- user_id (UUID, FK)
- name (TEXT)
- type (ENUM: space, tag, location, date)
- metadata (JSONB)

### entry_labels
- entry_id, label_id (FK join)

## Constraints

| Priority | Constraint |
|----------|------------|
| High | Native-feeling swipe gestures |
| High | Low cost (free tiers until traction) |
| Medium | Serverless-first |
| Medium | AI modularity (swap providers easily) |
| Low | Schema flexibility |

## Brand Voice

| Context | Copy |
|---------|------|
| Empty state | "Nothing here. Go live." |
| Archive | "Forgotten." |
| New capture | "Drop it." |
| Micro-copy | "just f it" / "forget about that" |
