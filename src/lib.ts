import { type QuickPickItem, window } from 'vscode';
import {
	type ConfigType,
	getEditorFontLigaturesMapping,
	getFontConfiguration,
	getFontLigatures,
	getFontList,
	setFontLigatures,
	setFontList,
} from './util';

interface FontMenuItem extends QuickPickItem {
	type: 'font' | 'button';
}

// Show a quick pick menu for selecting font
export async function selectFont(type: ConfigType): Promise<void> {
	const currentFonts = getFontList(type);
	const currentLigatures = getFontLigatures(type);

	// Construct quick pick menu options.
	const menuItems: FontMenuItem[] = [
		...currentFonts.map((font) => <FontMenuItem>{ label: font, type: 'font' }),
		{ alwaysShow: true, label: '$(add) Add Font', type: 'button' },
		{ alwaysShow: true, label: '$(trash) Remove Font', type: 'button' },
	];

	// Show the picker and display the currently selected font
	const selection = await window.showQuickPick(menuItems, {
		placeHolder: `Select ${type} Font`,
		onDidSelectItem: (selection: FontMenuItem) => {
			if (selection.type === 'font') {
				// Set fonts according to user selects
				const newFonts = [
					selection.label,
					...currentFonts.filter((f) => f !== selection.label),
				];
				setFontList(type, newFonts);

				// Set font ligatures by mappings
				const ligaturesMapping = getEditorFontLigaturesMapping();

				if (ligaturesMapping?.[selection.label]) {
					setFontLigatures(type, ligaturesMapping[selection.label]);
				} else {
					// If no ligatures mapping found, restore to original ligatures
					setFontLigatures(type, currentLigatures);
				}
			} else {
				// For buttons, revert to original font
				setFontList(type, currentFonts);
				setFontLigatures(type, currentLigatures);
			}
		},
	});

	// if user cancelled, apply the original settings
	if (!selection) {
		setFontList(type, currentFonts);
		return;
	}

	if (selection.type === 'button') {
		// Reset to default when user selects a button.
		setFontList(type, currentFonts);

		if (selection.label === '$(add) Add Font') {
			await addFont(type, currentFonts);
		} else if (selection.label === '$(trash) Remove Font') {
			await removeFont(type, currentFonts);
		}
	}
}

// Show an input box for font size
export async function setFontSize(target: ConfigType): Promise<void> {
	const targetConfig = getFontConfiguration(target);
	const currentFontSize = targetConfig.get<number>('fontSize');
	const value = await window.showInputBox({
		prompt: `Enter ${target} Font Size`,
		value: currentFontSize ? currentFontSize.toString() : '',
	});

	if (value) {
		const fontSize = Number.parseInt(value, 10);

		if (Number.isNaN(fontSize)) {
			window.showErrorMessage('Invalid font size!');
		} else {
			targetConfig.update('fontSize', fontSize, true);
		}
	}
}

// Add a font to the fontFamily and set it as active.
export async function addFont(
	target: ConfigType,
	fonts: string[],
): Promise<void> {
	const fontName = await window.showInputBox({ placeHolder: 'Font Name' });

	if (!fontName) {
		return;
	}

	const trimmed = fontName.trim();
	if (!trimmed) {
		return;
	}

	// Move existing font to the front, or add a new one at the front.
	const updatedFonts = [trimmed, ...fonts.filter((font) => font !== trimmed)];

	await setFontList(target, updatedFonts);
}

// Removes a font from the fontFamily.
export async function removeFont(
	target: ConfigType,
	fonts: string[],
): Promise<void> {
	const fontName = await window.showQuickPick(fonts, {
		placeHolder: `Remove ${target} Font`,
	});

	if (!fontName) {
		return;
	}

	const trimmed = fontName.trim();
	if (!trimmed) {
		return;
	}

	const updatedFonts = fonts.filter((font) => font !== fontName);

	await setFontList(target, updatedFonts);
}
