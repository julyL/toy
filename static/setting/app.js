/*
    feature: 核心自带功能
    pre_actions: 搜索前置符 
*/
module.exports = {
  staticServer: {
    port: 3456
  },
  quickStartApp: [],
  feature: [{
    name: "书签导入",
    keywords: ['f', 'b', "bm", 'bookmark'],
    router: "",
    view: "uploadBookmark"
  }, {
    name: "添加快速启动",
    keywords: ['f', "quickStart", 'qs'],
    router: "/quickStart"
  }, {
    name: "切换桌面模式",
    keywords: ['f', "d", 'desktop'],
    router: "/desktop"
  }, {
    name: "编码转换",
    keywords: ['f', "encode"],
    router: "/desktop/encode"
  }, {
    name: "json格式化",
    keywords: ['f', 'jsformat'],
    router: "/desktop/jsonformat"
  }, {
    name: "生成二维码",
    keywords: ['f', "qrcode"],
    router: "/desktop/qrcode"
  }, {
    name: "图片压缩处理",
    keywords: ['f', "img"],
    router: "/desktop/minifyimg"
  }, {
    name: "静态服务器",
    keywords: ['f', "static", 'server'],
    router: "/desktop/staticServer"
  }],
  search: [{
    name: "Search in GitHub",
    keywords: ["g", "gi", "github"],
    url: "https://github.com/search?q="
  }, {
    name: "Search in Baidu",
    keywords: ["b", "bd", "baidu"],
    url: "https://www.baidu.com/s?wd="
  }, {
    name: "Search in Google",
    keywords: ["g", "go", "google"],
    url: "https://www.google.com/search?q="
  }, {
    name: "Search in Stackoverflow",
    keywords: ["s", "st", 'stackoverflow'],
    url: "https://stackoverflow.com/search?q="
  }, {
    name: "打开百度地图",
    keywords: ["m", "map"],
    url: "http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D"
  }],
  shortcut: [{
    name: "全局切换显示隐藏",
    hotkey: "Alt+d"
  }]
};