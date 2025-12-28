import { type WorkspaceConfiguration, workspace } from 'vscode';

export type Target = 'Editor' | 'Terminal';

// Parse a font string into an array.
export function parseFontString(fontString: string): string[] {
	return fontString.split(',').map((font) => font.trim());
}

// Get appropriate vscode config based on the Target.
export function getConfig(target: Target): WorkspaceConfiguration {
	if (target === 'Editor') {
		return workspace.getConfiguration('editor');
	} else {
		return workspace.getConfiguration('terminal.integrated');
	}
}
