/*
    features: 核心自带功能
    pre_actions: 搜索前置符 

*/
module.exports = {
    features: [{
        name: "添加快速启动",
        keywords: ["quickStart", 'qs'],
        router: "quickStart"
    }],
    pre_actions: [{
        name: "search in Baidu",
        keywords: ["b", "bd"],
        url: "https://www.baidu.com/s?wd="
    }, {
        name: "search in Google",
        keywords: ["g", "gg"],
        url: "https://www.google.com/search?q="
    }, {
        name: "search in Stackoverlfow",
        keywords: ["s", "st"],
        url: "https://stackoverflow.com/search?q="
    }, {
        name: "打开百度地图",
        keywords: ["m", "map"],
        url: " https://map.baidu.com/?q="
    }]
};