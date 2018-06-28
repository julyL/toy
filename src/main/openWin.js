import {
    BrowserWindow
} from 'electron';
import emitter from '../util/emitter';
import setLoading from './setLoading.js';

export default function openWin(data) {
    data = arguments[1] || data;
    data.router = data.router.replace(/^\//, "");
    const modalPath = process.env.NODE_ENV === 'development' ?
        `http://localhost:9080/#/${data.router}` :
        `file://${__dirname}/index.html#${data.router}`;

    let options = {
        width: 1000,
        height: 900,
        webPreferences: {
            webSecurity: false
        },
        show: false,
        alwaysOnTop: true
    }

    let win = new BrowserWindow(Object.assign(options, data))

    let loadingScreen = setLoading();

    win.once('ready-to-show', () => {
        if (loadingScreen) {
            loadingScreen.close();
        }
        win.show()
    })
    //   win.webContents.openDevTools({
    //     mode: "detach"
    //   });

    emitter.emit("switchVisible", false)

    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
}