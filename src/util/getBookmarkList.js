const fs = require('fs'),
    path = require('path');

var parse = require("bookmarks-parser");
var bookmark_path = path.resolve(__dirname, '../../static/bookmark.html');

function parseBookmark() {
    return new Promise((re, rj) => {
        if (!fs.existsSync(bookmark_path)) {
            rj("书签文件不存在");
        }
        fs.readFile(bookmark_path, 'utf-8', function (err, data) {
            if (err) {
                rj(err);
            }
            parse(data, function (err, res) {
                if (err) {
                    rj(err);
                }
                re(res);
            })
        })
    })
}

function getChildList(list) {
    return list.reduce(function (pre, item) {
        if (item.type == 'bookmark') {
            pre.push(item);
        } else if (item.children && item.children.length > 0) {
            pre = pre.concat(getChildList(item.children))
        }
        return pre;
    }, [])
}

//  返回一个Promsie,resove的值为书签列表
function getBookmarkList(searchKeyword) {
    return parseBookmark().then(data => {
        return getChildList(data.bookmarks[0].children);
    })
}
export default getBookmarkList;