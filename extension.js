// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const wordCountBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.fileWordCount",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const text = vscode.window.activeTextEditor.document.getText();
      const length = text.split(" ").length;

      wordCountBar.text = `Words: ${length}`;
      wordCountBar.show();

      vscode.workspace.onDidChangeTextDocument(l => {
        const newText = l.document.getText();
        const newLength = newText.split(" ").length;

        wordCountBar.text = `Words: ${newLength}`;
      });
    }
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
