import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu
} from 'electron'
const path = require("path");
import config from '../config/ui.js';
import emitter from './emitter';
import setShortCut from './setShortCut';
import {
  getTrayMenu
} from './setMenu';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
// if (process.env.NODE_ENV !== 'development') {
global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// }
const logger = require('../util/logger.js');

let mainWindow, loadingScreen;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`;


function createLoadingScreen() {
  loadingScreen = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    frame: false,
    parent: mainWindow,
    transparent: true
  });
  loadingScreen.loadURL(path.resolve(__static, './loading.html'));
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

function createWindow() {
  /**
   * Initial window options
   */
  let iconPath = path.resolve(__static, "./icons/app-icon.png");
  mainWindow = new BrowserWindow({
    icon: iconPath,
    width: config.WIN_WIDTH,
    height: config.WIN_HEIGHT,
    frame: false,
    resizable: false,
    show: false,
    backgroundColor: "#292828"
  })

  let appIcon = new Tray(iconPath);
  const contextMenu = getTrayMenu();
  appIcon.setToolTip('create by julyL!');
  appIcon.setContextMenu(contextMenu);

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

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', function () {
  createLoadingScreen(); // 加载动画
  createWindow(); // 初始化窗口
  setShortCut(); // 设置快捷键
})

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
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

emitter.on("switchVisible", function () {
  if (mainWindow.isVisible()) {
    mainWindow.webContents.send("focusSearchInput")
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
})

ipcMain.on("resize", function (event, size) {
  mainWindow.setSize(size.width, size.height)
})

ipcMain.on('vue-router', linkRouter)

function linkRouter(event, data) {
  data.router = data.router.replace(/^\//, "");
  const modalPath = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080/#/${data.router}` :
    `file://${__dirname}/index.html#${data.router}`;

  let win = new BrowserWindow({
    width: data.width || 1000,
    height: data.height || 900,
    webPreferences: {
      webSecurity: false
    },
    parent: mainWindow,
    show: false,
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  if (config.DEBUG) {
    win.webContents.openDevTools({
      mode: "right"
    });
  }

  if (!data.show) {
    emitter.emit("switchVisible");
  }

  win.on('close', function () {
    win = null
  })
  win.loadURL(modalPath)
}