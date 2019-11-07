const vscode = require("vscode");
const wordCount = require("./lib/wordCount");

function activate(context) {
  const wordCountBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  const updateToTextCount = text => {
    const totalWords = wordCount(text);
    wordCountBar.text = `Words: ${totalWords}`;
    wordCountBar.show();
  };

  const updateToDocumentTotalTextCount = () => {
    const text = vscode.window.activeTextEditor.document.getText();
    updateToTextCount(text);
  };

  let disposable = vscode.commands.registerCommand(
    "extension.fileWordCount",
    () => {
      vscode.workspace.onDidChangeTextDocument(() => {
        updateToDocumentTotalTextCount();
      });

      vscode.window.onDidChangeTextEditorSelection(e => {
        if (e.selections[0].isEmpty) {
          updateToDocumentTotalTextCount();
          return;
        }
        const selectedWords = e.selections
          .map(s => vscode.window.activeTextEditor.document.getText(s))
          .join(" "); //ensure separation of selections

        updateToTextCount(selectedWords);
      });

      updateToDocumentTotalTextCount();
    }
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
