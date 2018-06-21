import {
    BrowserWindow
} from 'electron';
const path = require("path");

export default function setLoading() {
    let loadingScreen = new BrowserWindow({
        width: 150,
        height: 100,
        resizable: false,
        frame: false,
        transparent: true
    });
    loadingScreen.loadURL(path.resolve(__static, './pages/loading.html'));
    loadingScreen.on('closed', () => loadingScreen = null);
    loadingScreen.webContents.on('did-finish-load', () => {
        loadingScreen.show();
    });
    return loadingScreen;
}