# Avalanche MCP Server for VS Code

![Avalanche Logo](images/icon.png)

**Official Avalanche (AVAX) MCP Server integration for Visual Studio Code**

Access Avalanche blockchain documentation, search tools, and AI assistance directly in VS Code's Copilot agent mode.

## Features

This extension provides the official Avalanche MCP Server integration, enabling AI assistants like GitHub Copilot to:

- 🔍 **Search Documentation** - Find relevant Avalanche docs, guides, and tutorials
- 📄 **Fetch Pages** - Retrieve specific documentation pages for context
- 📚 **Browse Sections** - List all available documentation sections with page counts

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `avalanche_docs_search` | Search docs by query with optional source filter (docs, academy, integrations, blog) |
| `avalanche_docs_fetch` | Get a specific page by URL path |
| `avalanche_docs_list_sections` | List all sections with page counts |

## Usage

1. Install this extension from the VS Code Marketplace
2. Open GitHub Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`)
3. Switch to **Agent Mode** using the mode picker
4. The Avalanche MCP tools will be available for the AI to use

### Example Prompts

- "Search Avalanche docs for how to create an L1"
- "Find documentation about smart contracts on Avalanche"
- "Get the overview page for Avalanche primary network"
- "List all available documentation sections"

## Requirements

- VS Code 1.85.0 or later
- GitHub Copilot extension (for agent mode)

## MCP Server Details

- **Endpoint**: `https://build.avax.network/api/mcp`
- **Transport**: HTTP (Streamable)
- **Protocol**: JSON-RPC 2.0

## Resources

- [Avalanche MCP Documentation](https://build.avax.network/docs/tooling/ai-llm)
- [Avalanche Builder Hub](https://build.avax.network/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## Alternative Setup Methods

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "avalanche-docs": {
      "transport": {
        "type": "http",
        "url": "https://build.avax.network/api/mcp"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add avalanche-docs --transport http https://build.avax.network/api/mcp
```

### Manual VS Code Configuration

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "avalanche-docs": {
      "transport": {
        "type": "http",
        "url": "https://build.avax.network/api/mcp"
      }
    }
  }
}
```

## Rate Limits

- 60 requests per minute per client
- RateLimit headers included in responses

## License

MIT License - see [LICENSE](LICENSE) for details.

## About Avalanche

[Avalanche](https://www.avax.network/) is a high-performance, scalable blockchain platform for decentralized applications, enterprise blockchain deployments, and custom blockchain networks (L1s).

---

Built with ❤️ by the Avalanche community
