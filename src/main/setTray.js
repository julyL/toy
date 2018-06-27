import {
    app,
    Menu,
    shell,
    BrowserWindow
} from 'electron';
import emitter from '../util/emitter';

export function setTray(mainWindow, tray) {
    var trayMenuTemplate = [{
            label: '设置',
            click: function () {
                emitter.emit('openWin', {
                    router: "setting",
                    resizable: false,
                    frame: false
                });
            }
        }, {
            label: '帮助',
            click: function () {
                shell.openExternal("https://github.com/julyL/toy/blob/master/README.md")
            }
        },
        {
            label: '退出',
            click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ];
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setToolTip('create by julyL (๑• . •๑)');
    tray.setContextMenu(contextMenu);
}