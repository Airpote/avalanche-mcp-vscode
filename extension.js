const vscode = require('vscode');

/**
 * Avalanche MCP Server Extension
 * 
 * This extension provides the official Avalanche (AVAX) MCP Server integration
 * for VS Code, enabling AI assistants to access Avalanche blockchain documentation
 * and development resources.
 * 
 * Endpoints:
 * - MCP Server: https://build.avax.network/api/mcp (JSON-RPC 2.0)
 * - llms.txt: https://build.avax.network/llms.txt (documentation index)
 * - Full docs: https://build.avax.network/llms-full.txt (complete documentation)
 * 
 * Available MCP Tools:
 * - avalanche_docs_search: Search documentation by query with optional source filter
 * - avalanche_docs_fetch: Get a specific page by URL path
 * - avalanche_docs_list_sections: List all sections with page counts
 * 
 * Source: https://github.com/Airpote/avalanche-mcp-vscode
 * @see https://build.avax.network/docs/tooling/ai-llm
 */

let serverDefinitionProvider;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Avalanche MCP Server extension is now active');

    // Create the MCP server definition with http transport
    // Using 'uri' property as expected by VS Code MCP API
    const avalancheMcpServer = {
        name: 'avalanche-docs',
        label: 'Avalanche Documentation',
        version: '1.0.0',
        transport: {
            type: 'http',
            uri: 'https://build.avax.network/api/mcp'
        }
    };

    // Event emitter for server definition changes
    const onDidChangeMcpServerDefinitions = new vscode.EventEmitter();

    // Register the MCP server definition provider
    serverDefinitionProvider = vscode.lm.registerMcpServerDefinitionProvider(
        'avalanche-mcp',
        {
            onDidChangeMcpServerDefinitions: onDidChangeMcpServerDefinitions.event,
            
            provideMcpServerDefinitions: async () => {
                return [avalancheMcpServer];
            },
            
            resolveMcpServerDefinition: async (serverDefinition) => {
                // No additional resolution needed for HTTP transport
                return serverDefinition;
            }
        }
    );

    context.subscriptions.push(serverDefinitionProvider);
    context.subscriptions.push(onDidChangeMcpServerDefinitions);

    // Register a command to show information about the Avalanche MCP server
    const infoCommand = vscode.commands.registerCommand('avalanche-mcp.showInfo', () => {
        vscode.window.showInformationMessage(
            'Avalanche MCP Server provides access to Avalanche blockchain documentation. ' +
            'Use it in Copilot agent mode to search docs, fetch pages, and explore Avalanche development resources.',
            'Open Documentation'
        ).then(selection => {
            if (selection === 'Open Documentation') {
                vscode.env.openExternal(vscode.Uri.parse('https://build.avax.network/docs/tooling/ai-llm'));
            }
        });
    });

    context.subscriptions.push(infoCommand);

    // Show welcome message on first activation
    const hasShownWelcome = context.globalState.get('avalanche-mcp.welcomeShown');
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            'Avalanche MCP Server installed! Enable it in Copilot agent mode to access Avalanche documentation.',
            'Learn More'
        ).then(selection => {
            if (selection === 'Learn More') {
                vscode.env.openExternal(vscode.Uri.parse('https://build.avax.network/docs/tooling/ai-llm'));
            }
        });
        context.globalState.update('avalanche-mcp.welcomeShown', true);
    }
}

function deactivate() {
    if (serverDefinitionProvider) {
        serverDefinitionProvider.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
