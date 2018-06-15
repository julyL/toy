import {
    app,
    Menu,
    shell,
    BrowserWindow
} from 'electron';

export function setTray(mainWindow, tray) {
    var trayMenuTemplate = [{
            label: '显示',
            click: function () {
                mainWindow.show();
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