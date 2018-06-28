import emitter from "./emitter";
import setStaticPath from './setStaticPath';
const fs = require("fs");
const path = require("path");
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const appSetting = setStaticPath('./config.json');
const defaultSetting = require("../main/config.json");
if (!fs.existsSync(appSetting)) {
    fs.writeFileSync(appSetting, JSON.stringify(defaultSetting));
}
const adapter = new FileSync(appSetting);
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