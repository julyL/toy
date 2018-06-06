/*
    features: 核心自带功能
    pre_actions: 搜索前置符 

*/
module.exports = {
    features: [{
        name: "添加快速启动",
        keywords: ["quickStart", 'qs'],
        router: "/quickStart"
    }, {
        name: "切换桌面模式",
        keywords: ["d", 'desktop'],
        router: "/desktop"
    }, {
        name: "编码转换",
        keywords: ["encode"],
        router: "/desktop/encode"
    }, {
        name: "json格式化",
        keywords: ['jsformat'],
        router: "/desktop/jsonformat"
    }, {
        name: "生成二维码",
        keywords: ["qrcode"],
        router: "/desktop/qrcode"
    }],
    pre_actions: [{
        name: "Search in Baidu",
        keywords: ["b", "bd"],
        url: "https://www.baidu.com/s?wd="
    }, {
        name: "Search in Google",
        keywords: ["g", "gg"],
        url: "https://www.google.com/search?q="
    }, {
        name: "Search in Stackoverflow",
        keywords: ["s", "st"],
        url: "https://stackoverflow.com/search?q="
    }, {
        name: "打开百度地图",
        keywords: ["m", "map"],
        url: "https://map.baidu.com/?q="
    }]
};