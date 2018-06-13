import {
    Menu,
    BrowserWindow
} from 'electron';

var trayMenuTemplate = [{
    label: "切换开发者工具",
    accelerator: (function () {
        if (process.platform === "darwin") {
            return "Alt+Command+I";
        } else {
            return "Ctrl+Shift+I";
        }
    })(),
    click: function (item, focusedWindow) {
        if (focusedWindow) {
            focusedWindow.toggleDevTools();
        }
    }
}, {
    label: "刷新",
    accelerator: "CmdOrCtrl+R",
    click: function (item, focusedWindow) {
        if (focusedWindow) {
            // 重载之后, 刷新并关闭所有的次要窗体
            if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach(function (win) {
                    if (win.id > 1) {
                        win.close();
                    }
                });
            }
            focusedWindow.reload();
        }
    }
}, {
    label: '退出',
    click: function () {
        app.quit();
    }
}];

export function getTrayMenu() {
    return Menu.buildFromTemplate(trayMenuTemplate);
}