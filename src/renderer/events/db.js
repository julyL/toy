    import emitter from "../../main/emitter";
    const fs = require("fs");
    const path = require("path");
    const lowdb = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');

    let db_path = path.resolve(__static, './db/db.json');
    if (!fs.existsSync(db_path)) {
        fs.writeFileSync(db_path, "")
    }


    const adapter = new FileSync(db_path);
    const db = lowdb(adapter);

    db.defaults({
        startApp: []
    }).write()


    emitter.on("db", (data) => {
        let result;
        switch (data.action) {
            case "setStartAppList":
                db.set("startApp", data.data).write();
                break;
            case "getStartAppList":
                result = db.get("startApp").value();
            default:
                break;
        }
        data.cb && data.cb(result);
    })