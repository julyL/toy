var electronInstaller = require('electron-winstaller');
var path = require("path");

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: path.resolve(__dirname, '../build/mytoy/'),
    outputDirectory: path.resolve(__dirname, '../build/installer'),
    authors: 'julyL',
    exe: 'my-toy.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));