import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu
} from 'electron'
const path = require("path");
import config from '../config/ui.js';
import emitter from '../util/emitter';
import setShortcut from './setShortcut';
import {
  setTray
} from './setTray';
import setLoading from './setLoading.js';
import openWin from './openWin.js';
import '../util/db.js';

// static变量对应static文件夹
global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
const logger = require('../util/logger.js');

let mainWindow, loadingScreen;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`;


var tray = null;

function createWindow() {
  /**
   * Initial window options
   */
  let iconPath = path.resolve(__static, "./image/icons/app-icon.png");
  mainWindow = new BrowserWindow({
    icon: iconPath,
    width: config.WIN_WIDTH,
    height: config.WIN_HEIGHT,
    frame: false,
    resizable: false,
    show: false,
    backgroundColor: "#292828"
  })

  tray = new Tray(iconPath);
  setTray(mainWindow, tray)

  if (config.DEBUG) {
    mainWindow.webContents.openDevTools({
      mode: "detach"
    });
  }

  mainWindow.once('ready-to-show', () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  mainWindow.loadURL(winURL)
}

app.on('ready', function () {
  loadingScreen = setLoading(); // 加载动画
  createWindow(); // 初始化窗口
  setShortcut(); // 设置快捷键
})

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
})
if (isSecondInstance) {
  app.quit();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain通信事件
ipcMain.on('openWin', openWin);

ipcMain.on("resize", function (event, size) {
  mainWindow.setSize(size.width, size.height)
});

ipcMain.on("setShortcut", function (event, data) {
  setShortcut(data).then(() => {
    event.sender.send("setShortcut:success", data)
  }, (err) => {
    event.sender.send("setShortcut:fail", {
      msg: err
    })
  })
})

// event绑定事件
emitter.on("openWin", openWin);

emitter.on("switchVisible", function (visible) {
  if (visible === false || mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.webContents.send("focusSearchInput");
  }
})