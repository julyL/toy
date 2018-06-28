const path = require("path");
export default function (resolvePath) {
    if (process.env.NODE_ENV === 'production') {
        return path.resolve(__dirname, resolvePath);
    } else {
        return path.resolve(__static, resolvePath);
    }
};