<template>
    <div class="page-search">
        <input type="text" placeholder="Search" @keydown="handleKeydown($event)" id="search" v-model="searchWord" ref="sInput" autofocus>
        <div id="search-list">
            <compontent :is="getComponent(data.type)" v-for="(data,index) in searchResultList" :class="index==activeIndex?'active-li':''"
                :key="index" @clickHandle="handleSelect(index)" :data="data" :index="index"></compontent>
        </div>
    </div>
</template>

<script>
    let {
        shell,
        remote,
        ipcRenderer
    } = require('electron');
    import emitter from "../../main/emitter";
    import appConfig from '../../config/app';
    import searchLi from '../components/searchLi.vue';
    import fileLi from '../components/fileLi.vue';
    import defaultLi from '../components/defaultLi.vue';
    const path = require("path");
    const fs = require("fs");

    function isMatchKeyword(word, matchKeyword) {
        if (word.length > matchKeyword.length) {
            return new RegExp('^' + matchKeyword, 'gi').test(word)
        } else {
            return new RegExp('^' + word, 'gi').test(matchKeyword)
        }
    }

    export default {
        name: 'search',
        created() {
            let self = this,
                dbpath = path.resolve(__static, './db/db.json');
            emitter.emit("db", {
                action: "getStartApp",
                cb: (data) => {
                    self.startApp = data;
                }
            })
            fs.watchFile(dbpath, () => {
                console.log('get');
                emitter.emit("db", {
                    action: "getStartApp",
                    cb: (data) => {
                        console.log(data);
                        self.startApp = data;
                    }
                })
            })
        },
        mounted() {
            ipcRenderer.on("focusSearchInput", () => {
                this.fixPointerPosition()
            })
        },
        data() {
            return {
                searchWord: "",
                activeIndex: 0,
                searchResultList: [],
                action: "",
                startApp: []
            }
        },
        watch: {
            searchResultList(val) {
                this.activeIndex = 0;
                this.$nextTick(v => {
                    ipcRenderer.send("resize", {
                        width: $('.page-search').width(),
                        height: $('.page-search').height(),
                    })
                })
            }
        },
        computed: {
            activeSearchItem() {
                return this.searchResultList[this.activeIndex];
            }
        },
        components: {
            searchLi,
            fileLi,
            defaultLi
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link)
            },
            handleKeydown(e) {
                console.log(e.keyCode);
                let len = this.searchResultList.length;

                switch (e.keyCode) {
                    case 38: // up
                        this.fixPointerPosition();
                        this.activeIndex = (this.activeIndex - 1 + len) % len;
                        break;

                    case 40: // down
                        this.fixPointerPosition();
                        this.activeIndex = (this.activeIndex + 1) % len;
                        break;

                    case 46: // delete
                        this.activeIndex = (this.activeIndex - 1 + len) % len;
                        break;

                    case 13: // enter                      
                        this.fixPointerPosition();
                        this.handleSelect();
                        break;

                    default:
                        this.$nextTick(() => {
                            this.getListByKeywords();
                        });
                        break;
                }
            },
            getListByKeywords() {
                let word = this.searchWord.trim();
                console.log('word', word);
                if (!word) {
                    this.list = this.getFeatureList(word);
                    return;
                }

                let list = [],
                    searchList = [],
                    startList = [];

                // 判断是否匹配搜索的前置字符
                appConfig.searchs.forEach(item => {
                    let isMatch = false;
                    item.keywords.forEach(keyword => {
                        if (!isMatch && new RegExp('^' + keyword + "\\s+", 'gi').test(this.searchWord)) {
                            isMatch = true;
                            searchList.push({
                                name: item.name,
                                url: item.url,
                                type: "search",
                                query: this.searchWord.replace(new RegExp("^" + keyword +
                                    "\\s*"), ""),
                                keyword
                            })
                            this.activeIndex = 0;
                        }
                    })
                })

                //  判断是否匹配已经添加的路径
                startList = this.startApp.filter(v => {
                    v.type = "file";
                    v.query = this.searchWord;
                    return new RegExp(word, "gi").test(v.name);
                });
                list = [].concat(searchList, startList);
                let filterList = this.getFeatureList(word);
                list = list.concat(filterList);

                this.searchResultList = list;

            },
            getFeatureList(keyword) {
                let list = [];
                appConfig.features.forEach(item => {
                    let isMatch = false;
                    item.keywords.forEach(v => {
                        if (!isMatch && isMatchKeyword(v, keyword)) {
                            list.push({
                                name: item.name,
                                router: item.router,
                                type: "feature"
                            })
                            isMatch = true;
                        }
                    })
                })
                return list;
            },
            fixPointerPosition() {
                this.$refs.sInput.blur();
                setTimeout(() => {
                    this.$refs.sInput.focus();
                }, 17);
            },
            handleSelect(index) {
                if (index !== undefined) {
                    this.activeIndex = index;
                }
                let act = this.activeSearchItem || {};
                if (act.type == "feature") { // 打开新页面
                    ipcRenderer.send("vue-router", {
                        router: act.router
                    })
                } else if (act.type == "file") { // 打开文件
                    let appProcess = shell.openItem(act.path, function (err) {
                        alert("无法执行" + act.path)
                    });
                } else if (act.type == "search") { // 打开浏览器搜索
                    let query = this.searchWord.replace(new RegExp("^" + act.keyword + "\\s*"), "")
                    let url = act.url + encodeURIComponent(query);
                    this.open(url)
                }
            },
            getComponent(type) {
                if (type == 'search') {
                    return 'searchLi';
                } else if (type == 'file') {
                    return 'fileLi';
                } else {
                    return 'defaultLi';
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .page-search {
        width: 100%;
        #search {
            border: none;
            outline: none;
            width: 100%;
            height: 47px;
            line-height: 47px;
            font-size: 22px;
            padding: 0 7px;
            color: #4ff2f8;
            background: rgb(45, 45, 45);
        }
        #search-list {
            max-height: 329px;
            overflow: auto;
        }
    }
</style>