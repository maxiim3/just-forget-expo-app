# MCP Servers

## Expo MCP Server (Official)

AI-assisted Expo/React Native development.

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

**Setup:**
```bash
npx expo install expo-mcp --dev
```

**Docs:** https://docs.expo.dev/eas/ai/mcp/

---

## Supabase MCP Server (Official)

AI-assisted Supabase database management.

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

**Docs:** https://supabase.com/docs/guides/getting-started/mcp

**GitHub:** https://github.com/supabase-community/supabase-mcp

---

## Security Notes

- Don't connect to production data
- Use development branches
- Scope to specific project with `project_ref`
