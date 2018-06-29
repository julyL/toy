var path = require("path");
var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: path.resolve(__dirname, '../build/mytoy-win32-x64/'),
    // Specify the existing folder where 
    outputDirectory: path.resolve(__dirname, '../build/installer'),
    // The name of the Author of the app (the name of your company)
    authors: 'julyL',
    // The name of the executable of your built
    exe: './mytoy.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});