 import getBookmarkList from './getBookmarkList';
 import emitter from "_src/util/emitter";
 const fs = require("fs");
 const path = require("path");
 const configPath = setStaticPath('./config.json');
 var appConfig = JSON.parse(fs.readFileSync(configPath));
 console.log(appConfig);

 fs.watchFile(configPath, () => {
     appConfig = JSON.parse(fs.readFileSync(configPath));
 });

 function isMatchKeyword(word, matchKeyword, preReg, nextReg) {
     preReg = preReg || '';
     nextReg = nextReg || '';
     if (!word || !matchKeyword) {
         return;
     }
     if (word.length > matchKeyword.length) {
         return new RegExp(preReg + matchKeyword + nextReg, 'gi').test(word)
     } else {
         return new RegExp(preReg + word + nextReg, 'gi').test(matchKeyword)
     }
 }

 // 匹配config/app.js中的feature里的keywords字段
 export function getFeatureListByword(searchKeyword) {
     let list = [];
     appConfig.feature.forEach(item => {
         let isMatch = false;
         item.keywords.forEach(v => {
             if (!isMatch && isMatchKeyword(v, searchKeyword, '^')) {
                 list.push(Object.assign(item, {
                     type: "feature",
                 }))
                 isMatch = true;
             }
         })
     })
     return list;
 }

 // 匹配搜索的前置字符(打开浏览器)
 export function getWebSearchListByword(searchKeyword) {
     let list = [];
     appConfig.search.forEach(item => {
         let isMatch = false;
         item.keywords.forEach(keyword => {
             if (!isMatch && new RegExp('^' + keyword + "\\s+", 'gi').test(searchKeyword)) {
                 isMatch = true;
                 list.push(Object.assign(item, {
                     type: "search",
                     query: searchKeyword.replace(new RegExp("^" + keyword +
                         "\\s*"), ""),
                     keyword
                 }))
             }
         })
     })
     return list;
 }

 // 匹配快速启动的列表
 export function getQuickStartListByword(searchKeyword) {
     return appConfig.quickStartApp.filter(v => {
         v.type = "file";
         v.query = searchKeyword;
         return new RegExp(searchKeyword.trim(), "gi").test(v.name);
     });
 }

 //  匹配书签列表
 export function getBookmarkListByword(searchKeyword) {
     return getBookmarkList().then(data => {
         return data.map(v => {
             let isMatchUrl,
                 isMatchTitle;

             if (new RegExp(searchKeyword, 'gi').test(v.url)) {
                 isMatchUrl = true;
             }
             if (isMatchKeyword(v.title, searchKeyword)) {
                 isMatchTitle = true;
             }
             return Object.assign(v, {
                 type: "bookmark",
                 isMatchUrl: isMatchUrl,
                 isMatchTitle: isMatchTitle,
                 matchWord: searchKeyword
             })
         }).filter(v => {
             return v.isMatchUrl || v.isMatchTitle;
         })
     }, () => {
         return []
     })
 };