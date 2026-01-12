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

## Current State (Post Epic 1)

- **Unified Command Input** exists with NLP parsing (Epic 1.2)
- Command Input supports: add, search, find, filter, archive, delete, #tags
- Basic text-based search/filter implemented
- No AI integration yet
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
- **Integrate with Command Input** search/find commands
- Combine semantic + keyword search (hybrid)
- Display relevance-ranked results in current view
- **Note:** Uses Command Input's existing search infrastructure

### Story 4.4: Chat Retrieval (Talk to DB)
- **Extend existing Command Input** with AI-powered responses
- Natural language query processing via Command Input
- Context-aware responses displayed as result cards
- Conversation history in session (optional expansion)
- **Note:** Builds on Command Input infrastructure from Epic 1.2

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
*Updated: 2026-01-12 - Adjusted Stories 4.3 & 4.4 to integrate with Command Input from Epic 1.2*
