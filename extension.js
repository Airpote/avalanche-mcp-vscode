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

const MCP_SERVER_URL = 'https://build.avax.network/api/mcp';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Avalanche MCP Server extension is now active');

    // Register info command
    const infoCommand = vscode.commands.registerCommand('avalanche-mcp.showInfo', () => {
        vscode.window.showInformationMessage(
            `Avalanche MCP Server: ${MCP_SERVER_URL}\n\nUse with GitHub Copilot to access Avalanche documentation.`,
            'Open Docs',
            'Copy URL'
        ).then(selection => {
            if (selection === 'Open Docs') {
                vscode.env.openExternal(vscode.Uri.parse('https://build.avax.network/docs/tooling/ai-llm'));
            } else if (selection === 'Copy URL') {
                vscode.env.clipboard.writeText(MCP_SERVER_URL);
                vscode.window.showInformationMessage('MCP URL copied to clipboard!');
            }
        });
    });

    // Register configure command to add MCP server to settings
    const configureCommand = vscode.commands.registerCommand('avalanche-mcp.configure', async () => {
        const config = vscode.workspace.getConfiguration('mcp');
        const servers = config.get('servers') || {};
        
        if (servers['avalanche-docs']) {
            vscode.window.showInformationMessage('Avalanche MCP server is already configured.');
            return;
        }
        
        servers['avalanche-docs'] = {
            url: MCP_SERVER_URL,
            transport: 'http'
        };
        
        await config.update('servers', servers, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(
            'Avalanche MCP server added to your settings! Reload VS Code to activate.',
            'Reload'
        ).then(selection => {
            if (selection === 'Reload') {
                vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
        });
    });

    context.subscriptions.push(infoCommand);
    context.subscriptions.push(configureCommand);

    // Welcome message on first activation
    const hasShownWelcome = context.globalState.get('avalanche-mcp.welcomeShown');
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            'Avalanche MCP installed! Add the MCP server to your settings to use with GitHub Copilot.',
            'Configure Now',
            'Learn More'
        ).then(selection => {
            if (selection === 'Configure Now') {
                vscode.commands.executeCommand('avalanche-mcp.configure');
            } else if (selection === 'Learn More') {
                vscode.env.openExternal(vscode.Uri.parse('https://build.avax.network/docs/tooling/ai-llm'));
            }
        });
        context.globalState.update('avalanche-mcp.welcomeShown', true);
    }
}

function deactivate() {
    // Nothing to dispose
}

module.exports = {
    activate,
    deactivate
};
