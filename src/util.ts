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

export function getFontLigatures(type: ConfigType) {
	return type === 'Editor'
		? workspace.getConfiguration('editor').get<string>('fontLigatures')
		: workspace
				.getConfiguration('terminal.integrated.fontLigatures')
				.get<string>('featureSettings');
}

export function setFontLigatures(
	type: ConfigType,
	ligatures: string | boolean | undefined,
) {
	if (type === 'Editor') {
		workspace
			.getConfiguration('editor')
			.update('fontLigatures', ligatures, true);
	} else {
		if (typeof ligatures === 'boolean') {
			workspace
				.getConfiguration('terminal.integrated.fontLigatures')
				.update('enabled', ligatures, true);
		} else if (typeof ligatures === 'string') {
			workspace
				.getConfiguration('terminal.integrated.fontLigatures')
				.update('enabled', true, true);
			workspace
				.getConfiguration('terminal.integrated.fontLigatures')
				.update('featureSettings', ligatures, true);
		}
	}
}

export function getEditorFontLigaturesMapping() {
	return workspace
		.getConfiguration('switch-your-font')
		.get<Record<string, boolean | string>>('ligaturesMapping');
}
