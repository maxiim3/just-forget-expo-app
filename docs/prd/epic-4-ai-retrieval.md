# Epic 4: AI Retrieval

**Status:** Draft
**Priority:** Medium
**Phase:** Phase 2-3
**Estimated Stories:** 4-5

---

## Overview

Implement the AI layer that powers intelligent retrieval, auto-tagging, and natural language search. This transforms Forget from a simple inbox to an intelligent "talk to your notes" experience.

## Business Value

- **Zero Organization:** AI auto-tags so users never categorize manually
- **Natural Retrieval:** "What did I need to remember today?" instead of searching
- **Differentiation:** Key feature that separates Forget from note apps
- **Sticky Product:** AI-powered search creates unique value

## Current State

- Retrieve view exists but is empty placeholder
- No AI integration
- No tagging system (labels table exists but unused)
- No semantic search

## Target State

- Chat-based retrieval ("Talk to DB")
- Auto-tagging on entry creation
- Semantic search with vector embeddings
- Smart recall based on context/time

## AI Architecture (from Brainstorming)

```
┌──────────────────────────────────────────────┐
│                 FORGET APP                    │
└─────────────────────┬────────────────────────┘
                      │
       ┌──────────────┼──────────────┐
       │              │              │
   on input     explicit query    browse
       │              │              │
       ▼              ▼              ▼
┌──────────────────────────┐   ┌───────────┐
│        AI LAYER          │   │   Direct  │
│  • auto-tag              │   │   CRUD    │
│  • embeddings            │   └─────┬─────┘
│  • smart search          │         │
│  • chat to DB            │         │
└────────────┬─────────────┘         │
             │                       │
             └───────────┬───────────┘
                         │
                   ┌─────┴─────┐
                   │  DATABASE │
                   └───────────┘
```

## Stories

### Story 4.1: Auto-Tagging on Input
- Create AI service for tag extraction
- Generate tags when entry is created
- Store tags in labels/entry_labels tables
- Display tags on entry cards (optional)

### Story 4.2: Vector Embeddings
- Generate embeddings for all entries
- Store embeddings (Supabase pgvector or separate service)
- Create embedding on entry create/update
- Batch embed existing entries

### Story 4.3: Semantic Search
- Implement vector similarity search
- Search UI in Retrieve view
- Combine semantic + keyword search
- Display relevance-ranked results

### Story 4.4: Chat Retrieval (Talk to DB)
- Build chat interface in Retrieve view
- Natural language query processing
- Context-aware responses
- Display relevant entries in chat

### Story 4.5: Smart Recall
- Time-based retrieval triggers
- "What did I need to remember today?"
- Location-aware recall (future)
- Proactive notifications for relevant entries

## Dependencies

- Epic 2 (Data Persistence) - need real data
- Epic 3 (Input Expansion) - voice transcriptions to embed
- AI service provider decision

## Technical Notes

- **Embeddings:** OpenAI, Cohere, or open-source models
- **Vector Storage:** Supabase pgvector extension
- **Chat:** OpenAI GPT-4 or Claude API
- **Architecture:** Consider MCP-like middleware pattern

## Acceptance Criteria

- [ ] Entries auto-tagged on creation
- [ ] Semantic search returns relevant results
- [ ] Chat interface processes natural language queries
- [ ] "Smart recall" surfaces contextually relevant entries
- [ ] AI features work with voice transcriptions
- [ ] Graceful fallback if AI service unavailable

## Risks

| Risk | Mitigation |
|------|------------|
| AI service costs | Usage limits, caching, batch processing |
| Latency | Async processing, optimistic UI |
| AI unavailable | Fallback to keyword search |
| Embedding storage costs | Compression, cleanup old embeddings |

## Open Questions (from Brainstorming)

- AI service provider (OpenAI, Anthropic, open-source)?
- Embedding model selection?
- How does AI fallback work if layer is down?
- REST vs GraphQL for AI layer?

## Future Expansion

- Browser extension with AI capture
- IoT "F Monokey" hardware integration
- Shared bins with AI-mediated collaboration

---

*Epic created by Sarah (Product Owner) - 2026-01-08*
