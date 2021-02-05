// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios, { AxiosResponse } from 'axios';

// Get JSON of vod from below URL
async function getVod(): Promise<void> {

  const url: string = 'https://www.biblegateway.com/votd/get/';

  try {
    const res = await axios.get(url, {
      params: {
        format: 'json',
        version: 'ESV' // Make customizable in future
      }
    });

    vscode.window.showInformationMessage(parseVodString(res.data.votd.content, res.data.votd.reference),
    'Show Full Chapter').then(selection => {
      if (selection === 'Show Full Chapter') {

        let reference = res.data.votd.reference;
        let chapter = reference.split(":", 1);
        let chapterUri = 'https://www.biblegateway.com/passage/?search=' + chapter[0] + '&version=ESV';
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(chapterUri));
      } 
    });
  } catch (err) {
    console.log(err);
  }
}

// Parse JSON response
export function parseVodString(content: string, reference: string): string {
    return 'VOTD: ' + content.replace(/<[^>]+>/g, '') + ' (' + reference + ')';
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bible-vod" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bible-vod.showVod', () => {
  
    // The code you place here will be executed every time your command is executed
    getVod();
  
  });
  
  let startupMessage = vscode.commands.registerCommand('onStartupFinished', () => {
    getVod();
  });

  context.subscriptions.push(disposable);
  vscode.commands.executeCommand('onStartupFinished');
}

// this method is called when your extension is deactivated
export function deactivate() {}
