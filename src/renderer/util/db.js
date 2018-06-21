    import emitter from "../../util/emitter";
    const fs = require("fs");
    const path = require("path");
    const lowdb = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');

    let appSetting = path.resolve(__static, './setting/app.js');
    let db_path = path.resolve(__static, './db/db.json');
    if (!fs.existsSync(db_path)) {
        fs.writeFileSync(db_path, "")
    }

    const adapter = new FileSync(db_path);
    const db = lowdb(adapter);

    db.defaults({
        startApp: []
    }).write()


    emitter.on("quickStartApp", (data) => {
        let result;
        switch (data.action) { 
            case "set":
                db.set("quickStartApp", data.data).write();
                break;
            case "get":
                result = db.get("quickStartApp").value();
            default:
                break;
        }
        data.cb && data.cb(result);
    });

    emitter.on("search", (data) => {
        let result;
        switch (data.action) {
            case "set":
                db.set("search", data.data).write();
                break;
            case "get":
                result = db.get("search").value();
            default:
                break;
        }
        data.cb && data.cb(result);
    });


    // emitter.on("search", (data) => {
    //     let result;
    //     switch (data.action) {
    //         case "set":
    //             db.set("search", data.data).write();
    //             break;
    //         case "get":
    //             result = db.get("search").value();
    //         default:
    //             break;
    //     }
    //     data.cb && data.cb(result);
    // })