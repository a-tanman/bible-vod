import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { parseVodString } from '../../extension';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
    

    test('parseVodString', () => {

        var content = "<p><span>Hello World!</span></p>";
        var reference = "Book 1:1-2";

        assert.strictEqual(parseVodString(content, reference),
        "VOTD: Hello World! (Book 1:1-2)"
        );

    });
});
