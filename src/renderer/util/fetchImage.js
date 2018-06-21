const request = require("request");
const cheerio = require("cheerio");
const Q = require("jquery");
const store = require("_src/util/store").default;
const PageUrl = "https://alpha.wallhaven.cc/search?q=nature&search_image=&categories=110&purity=110&sorting=favorites&order=desc&page=",
  totalPages = 1600;

var bgImageInfo = store.get("bgImageInfo");

if (typeof bgImageInfo != "object" || bgImageInfo === null) {
  bgImageInfo = {
    page: 1,
    list: []
  };
}


function fetchImageListFromPage(url) {
  return new Promise(function (resolve, reject) {
    let urlList = [];
    request(url, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      let $ = cheerio.load(data.body);
      $(".preview").each((ind, el) => {
        urlList.push($(el).attr("href"));
      });
      resolve(urlList);
    });
  })
}


/** * 从路径中提取出图片*/
function splitIdFromPath(path) {
  var s = path.split("/");
  return s[s.length - 1];
}


/**
 * 抓取图片列表
 * @returns Promise
 */
export function fetchImageList() {
  return new Promise((resolve, reject) => {
    // 抓取过的列表中有数据则直接返回
    if (bgImageInfo.list.length > 1) {
      bgImageInfo.list.shift();
      store.set("bgImageInfo", bgImageInfo);
      resolve(bgImageInfo.list);
    } else {
      let page;
      page = Math.min(bgImageInfo.page + 1, totalPages);
      // 抓取页面数据,获取到图片的id
      var urlForFetch = PageUrl + page;
      fetchImageListFromPage(urlForFetch).then(list => {
        let newList = bgImageInfo.list.concat(list);
        store.set("bgImageInfo", {
          page,
          list: newList
        });
        resolve(newList);
      });
    }
  })
}

export function getOriginImage(url, size) {
  let imgId = splitIdFromPath(url);
  if (size == 'small') {
    return `https://alpha.wallhaven.cc/wallpapers/thumb/small/th-${imgId}.jpg`;
  } else {
    return `https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-${imgId}.jpg`;
  }
}

