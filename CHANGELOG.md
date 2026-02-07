# Changelog

All notable changes to the Avalanche MCP Server extension will be documented in this file.

## [1.0.7] - 2026-02-07

### Fixed
- Updated changelog with full version history

## [1.0.6] - 2026-02-07

### Added
- `mcpServers` contribution in package.json for native VS Code MCP support
- "Avalanche MCP: Configure Server" command for manual setup
- "Copy URL" option in info command

### Changed
- Simplified extension activation
- Improved welcome message with configure option

## [1.0.5] - 2026-02-07

### Fixed
- Transport type changed to `http` with `uri` property
- Updated minimum VS Code version to 1.96.0

## [1.0.4] - 2026-02-07

### Fixed
- Transport type changed to `streamable-http` for MCP resources

## [1.0.3] - 2026-02-05

### Added
- GitHub repository link in extension description
- Documented all endpoints (MCP, llms.txt, llms-full.txt)

## [1.0.2] - 2026-02-05

### Changed
- Publisher changed to `amichain`
- Improved AVAX search visibility
- Updated description for better discoverability

## [1.0.1] - 2026-02-05

### Added
- Keywords for better search (avalanche, avax, blockchain, mcp, etc.)
- Categories metadata

## [1.0.0] - 2026-02-05

### Added
- Initial release of Avalanche MCP Server for VS Code
- Integration with Avalanche documentation MCP endpoint (`https://build.avax.network/api/mcp`)
- Support for `avalanche_docs_search` tool
- Support for `avalanche_docs_fetch` tool
- Support for `avalanche_docs_list_sections` tool
- HTTP transport support
- Welcome message on first installation
- Information command to learn more about the extension

### MCP Server Features
- Search Avalanche documentation, academy, integrations, and blog
- Fetch specific documentation pages
- List all available sections with page counts
