import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu
} from 'electron'
const path = require("path");
import emitter from '../util/emitter';
import setShortcut from './setShortcut';
import {
  setTray
} from './setTray';
import setLoading from './setLoading.js';
import openWin from './openWin.js';
import '../util/db.js';

// static变量对应static文件夹
// global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
const logger = require('../util/logger.js');
logger.log("main __static", __static)
let mainWindow, loadingScreen;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`;


var tray = null;

function createWindow() {
  /**
   * Initial window options
   */
  // 因为打包之后的路径和开发时路径是不一致的,而大图片是不会打包到js中,不采用__static打包时会报错
  let iconPath = path.join(__static, "./image/icons/app-icon.png");
  mainWindow = new BrowserWindow({
    icon: iconPath,
    width: 700,
    height: 47,
    frame: false,
    resizable: false,
    show: false,
    backgroundColor: "#292828"
  })

  tray = new Tray(iconPath);
  setTray(mainWindow, tray)

  // mainWindow.webContents.openDevTools({
  //   mode: "detach"
  // });

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
  emitter.emit("getAppSetting", (data) => {
    let shortKeys = data.shortcut.reduce((prev, next) => {
      prev[next.feature] = next;
      return prev;
    }, {});
    setShortcut({ // 注册切换快捷键
      hotkey: shortKeys.switchVisible.hotkey,
      cb: () => {
        emitter.emit("switchVisible");
      }
    });
  })
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
  data.cb || (data.cb = () => emitter.emit("switchVisible"));
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