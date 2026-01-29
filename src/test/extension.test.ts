import * as assert from 'assert';
import * as vscode from 'vscode';
import { parseFontString } from '../util';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Font String Parsing', () => {
		const fontString = 'Consolas, Hack,Ubuntu Mono,   Jetbrains Mono';
		const fonts = parseFontString(fontString);

		assert.strictEqual('Consolas', fonts[0]);
		assert.strictEqual('Hack', fonts[1]);
		assert.strictEqual('Ubuntu Mono', fonts[2]);
		assert.strictEqual('Jetbrains Mono', fonts[3]);
		assert.strictEqual(4, fonts.length);
	});
});
