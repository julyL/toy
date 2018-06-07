const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

function getFileList(fpath, url) {
    var filepath = decodeURI(path.resolve(fpath, url || './'));
    var fileList = [];
    var stat = fs.statSync(filepath),
        isDir = stat.isDirectory();
    if (isDir) {
        var fileDir = fs.readdirSync(filepath);
        fileDir.forEach(file => {
            if (isIgnore(file)) {
                return;
            }
            let _stat = fs.statSync(path.resolve(filepath, file));
            var isdir = _stat.isDirectory();
            fileList.push({
                name: decodeURI(file),
                path: decodeURI((url ? ('/' + url) : '') + '/' + file),
                size: calcSize(_stat.size, isdir),
                dir: isdir,
                mtime: dayjs(_stat.mtime).format('YYYY-MM-DD hh:mm:ss')
            })
        })
    }
    var arr1 = fileList.filter(v => {
        return v.dir
    }).sort((a, b) => {
        return a.name > b.name;
    });
    var arr2 = fileList.filter(v => {
        return !v.dir
    }).sort((a, b) => {
        return a.name > b.name;
    });
    return arr1.concat(arr2);
}

function isIgnore(file) {
    return /^\..*/.test(file);
}

function calcSize(size, isdir) {
    if (isdir) {
        return '';
    } else if (size < 1024) {
        return size + "B";
    } else if (size < 1024 * 1024) {
        return parseInt(size / 1024) + "KB"
    } else if (size < 1024 * 1024 * 1024) {
        return parseInt(size / 1024 / 1024) + "MB"
    } else {
        return parseInt(size / 1024 / 1024 / 1024) + "GB"
    }
}


export default getFileList;