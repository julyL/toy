    import emitter from "../../main/emitter";
    const path = require("path");
    const lowdb = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');
    const adapter = new FileSync(path.resolve(__dirname, '../../config/db.json'));
    const db = lowdb(adapter);

    db.defaults({
        startApp: []
    }).write()


    emitter.on("db", (data) => {
        let result;
        switch (data.action) {
            case "setStartApp":
                db.set("startApp", data.data).write();
                break;
            case "getStartApp":
                result = db.get("startApp").value();
            default:
                break;
        }
        data.cb && data.cb(result);
    })