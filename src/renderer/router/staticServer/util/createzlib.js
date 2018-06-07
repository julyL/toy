const zlib = require('zlib');
const path = require('path');
const gzip = zlib.createGzip();
const fs = require('fs');
const tar = require('tar');

export default async function (filepath) {
    try {
        await tar.create({
            gzip: true,
            file: path.resolve(filepath, '../' + path.basename(filepath) + '.tgz'),
            cwd: filepath
        }, [''])
    } catch (e) {
        console.error("gzip error:" + e);
    }
}