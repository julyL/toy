const Koa = require("koa");
const Static = require("koa-static");
const Router = require("koa-router");
const render = require('koa-ejs');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const Notify = require('./notify');
const util = require('../util').default;
const notifier = require('node-notifier');

const app = new Koa();
const router = new Router();
var isListen = false,
    beforeServer,
    beforeFilepath,
    startpath;

export default function (config) {
    return new Promise((resolve, reject) => {
        startpath = config.filepath;
        if (!fs.statSync(startpath).isDirectory()) {
            reject("请拖入文件夹");
            return;
        }
        if (isListen) {
            if (beforeFilepath == config.filepath) {
                return;
            } else {
                beforeServer.close();
            }
        }
        isListen = true;
        beforeFilepath = config.filepath;
        config.port = config.port || 3000;

        app.use(Static(config.filepath, {
            index: false
        }));
        app.use(Static(path.resolve(__dirname, './'), {
            index: false
        }));

        render(app, {
            root: path.join(__dirname, './view'),
            layout: 'template',
            viewExt: 'html',
            cache: false,
            // debug: true
        });

        router.get('/__recode__for__download__', function (ctx) {
            var arr = ctx.req.url.split("?");
            var params = querystring.parse(arr[1]);
            console.log('download', ctx.req, params);
            ctx.body = {
                code: 0
            }
            if (Notify.can) {
                notifier.notify({
                    title: '有人在下载',
                    message: params.filepath && params.filepath.split("?")[0] || ''
                });
            }
        })

        router.get("*", async function (ctx) {
            var url = decodeURI(ctx.req.url.slice(1));
            if (url == 'favicon.ico' || url == '__recode__for__download__') {
                return
            } else if (ctx.query && ctx.query.download == 1) { // ?download=1 则返回直接返回压缩后的文件
                let filepath = path.resolve(startpath, url.split("?")[0].slice(0, -4)),
                    tgzfile = path.resolve(filepath, '../' + path.basename(filepath) + '.tgz');
                try {
                    await util.createzlib(filepath);
                    ctx.body = fs.createReadStream(tgzfile);
                    fs.unlink(tgzfile);
                } catch (err) {
                    console.log(err);
                }
            } else {
                let filepath = path.resolve(startpath, url);
                let stat = fs.statSync(filepath);
                if (stat.isDirectory()) {
                    var fileList = util.getFileList(startpath, url);
                    await ctx.render('index', {
                        path: url,
                        pathList: util.splitPath(decodeURI(ctx.req.url)),
                        fileList: fileList
                    });
                } else {
                    ctx.body = fs.createReadStream(filepath);
                }
            }
        });

        app.use(router.routes());
        beforeServer = app.listen(config.port, function () {
            console.log(`open localhost:${config.port}`);
            resolve();
        })
    })
}