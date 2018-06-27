import emitter from "./emitter";
const fs = require("fs");
const path = require("path");
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const appSetting = path.resolve(__static, './db/db.json');
const adapter = new FileSync(path.resolve(__dirname, '../../static/db/db.json'));
const db = lowdb(adapter);

db.defaults({
    quickStartApp: appSetting.quickStartApp,
    feature: appSetting.feature,
    search: appSetting.search,
    shortcut: appSetting.shortcut,
}).write()

emitter.on("getAppSetting", (cb) => {
    cb && cb(db.value());
})

emitter.on("setAppSetting", (data) => {
    db.set(data.type, data.data).write();
})