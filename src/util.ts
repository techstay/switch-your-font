import { workspace } from 'vscode';

export type ConfigType = 'Editor' | 'Terminal';

// Parse a font string into an array.
export function parseFontString(fontString: string): string[] {
	return fontString.split(',').map((font) => font.trim());
}

export function getFontConfiguration(type: ConfigType) {
	return type === 'Editor'
		? workspace.getConfiguration('editor')
		: workspace.getConfiguration('terminal.integrated');
}

export function getFontList(type: ConfigType): string[] {
	const config = getFontConfiguration(type);
	return parseFontString(config.get<string>('fontFamily') || '');
}

export function setFontList(
	target: ConfigType,
	fonts: string[],
): Thenable<void> {
	const config = getFontConfiguration(target);
	return config.update('fontFamily', fonts.join(', '), true);
}
