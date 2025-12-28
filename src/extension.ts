import type * as vscode from 'vscode';
import { commands } from 'vscode';
import { selectFont, setFontSize } from './lib';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('switch-your-font.switchFont', () =>
			selectFont('Editor'),
		),
		commands.registerCommand('switch-your-font.setFontSize', () =>
			setFontSize('Editor'),
		),
		commands.registerCommand('switch-your-font.switchTerminalFont', () =>
			selectFont('Terminal'),
		),
		commands.registerCommand('switch-your-font.setTerminalFontSize', () =>
			setFontSize('Terminal'),
		),
	);
}

export function deactivate() {}
