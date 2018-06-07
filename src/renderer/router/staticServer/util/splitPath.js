export default function (path) {
    var pathList = [];
    path.split("/").reduce(function (prev, next) {
        var p = prev + '/' + next;
        pathList.push({
            path: p,
            name: next
        });
        return p;
    })
    return pathList;
}