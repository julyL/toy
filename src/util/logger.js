const log4js = require("log4js");
const path = require("path");
log4js.configure({
    appenders: {
        //logtoConsole, logtoFile仅用于表示appenders的名称
        logtoConsole: {
            type: "console" // 输出到控制台
        },
        logtoFile: {
            type: "file", // 输出到文件
            filename: path.resolve(__static, "./log/error.log") // 输出文件路径
        }
    },
    categories: {
        default: {
            // default为category的默认输出显示
            appenders: ["logtoFile", "logtoConsole"], // 采用appenders中对应的输出方式进行日志输出
            level: "debug" // 控制日志输出级别,必须 [大于等于debug] 级别
        }
    }
});
const logger = log4js.getLogger();
process.on('uncaughtException', err => {
    logger.error(err)
})
module.exports = logger;