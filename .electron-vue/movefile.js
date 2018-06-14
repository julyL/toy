const fs = require("fs");
const path = require("path");

var from = path.resolve(__dirname, '../dist/electron');
var to = path.resolve(__dirname, '../build/mytoy/resources/app/dist/electron');

var moveAll = process.argv[3] == 'main' ? 'main' : 'all';

fs.watchFile(path.resolve(from, './main.js'), function () {
    if (moveAll == 'all') {
        recurCopyFile(from)
    } else {
        fs.copyFileSync(path.resolve(from, './main.js'), path.resolve(to, './main.js'));
    }
})


function recurCopyFile(startPath, dirPath) {
    dirPath = dirPath || '';
    var filepath = path.resolve(startPath, dirPath);
    let dir = path.resolve(to, dirPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    fs.readdir(filepath, function (err, data) {
        data.forEach(file => {
            let fp = path.resolve(filepath, file);
            if (fs.statSync(fp).isDirectory()) {
                recurCopyFile(from, path.join(dirPath, "./", file));
            } else {
                try {
                    fs.copyFileSync(fp, path.resolve(to, dirPath, file))
                } catch (err) {
                    console.log(err);
                }
            }
        })
    })
}