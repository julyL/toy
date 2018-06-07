import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

import config from '../config/ui.js';

import emitter from './emitter';
import setShortCut from './setShortCut';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: config.WIN_WIDTH,
    height: config.WIN_HEIGHT,
    frame: false,
    // resizable: false
    // useContentSize: true,
  })

  if (config.DEBUG) {
    mainWindow.webContents.openDevTools({
      detach: true
    });
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', function () {
  createWindow(); // 初始化窗口
  setShortCut(); // 设置快捷键

  //测试代码
  // linkRouter(null, {   
  //   router: "desktop/staticServer"
  // });

})

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
  data.router = data.router.replace(/^\//,"");
  const modalPath = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080/#/${data.router}` :
    `file://${__dirname}/index.html#${data.router}`
  let win = new BrowserWindow({
    width: data.width || 1000,
    height: data.height || 900,
    webPreferences: {
      webSecurity: false
    }
  })
  // win.webContents.openDevTools({
  //   mode: "right"
  // });
  if (!data.show) {
    emitter.emit("switchVisible");
  }
  win.on('close', function () {
    win = null
  })
  win.loadURL(modalPath)
}