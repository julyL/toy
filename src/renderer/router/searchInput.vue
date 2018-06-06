<template>
    <div id="wrapper">
        <input type="text" placeholder="Search" @keydown="handleKeydown($event)" id="search" v-model="searchWord" ref="sInput" autofocus>
        <div id="search-list">
            <div class="search-li" v-for="(item,index) in searchResultList" :class="index==activeIndex?'active-li':''" :key="index" @click="handleSelect(index)">
                <div class="s-word">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    let {
        remote,
        ipcRenderer
    } = require('electron');
    const {
        spawn
    } = require("child_process");
    import emitter from "../../main/emitter";
    import appConfig from '../../config/app';

    export default {
        name: 'search',
        created() {
            emitter.emit("db", {
                action: "getStartApp",
                cb: (data) => {
                    this.startApp = data;
                }
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
                        width: $("#wrapper").width(),
                        height: $("#wrapper").height(),
                    })
                })
            }
        },
        computed: {
            activeSearchItem() {
                return this.searchResultList[this.activeIndex];
            }
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link)
            },
            handleKeydown(e) {
                let len = this.searchResultList.length;
                if (e.keyCode == 38) { // up
                    this.fixPointerPosition();
                    this.activeIndex = (this.activeIndex - 1 + len) % len;
                } else if (e.keyCode == 40) { // down
                    this.fixPointerPosition();
                    this.activeIndex = (this.activeIndex + 1) % len;
                } else if (e.keyCode == 13) { // enter
                    this.handleSelect();
                } else if (e.keyCode == 46) { // delete
                    this.searchWord = "";
                } else {
                    this.$nextTick(() => {
                        this.getSearchList();
                    });
                }
            },
            getSearchList() {
                let word = this.searchWord.trim();
                console.log(22,word);
                if (!word) {
                    this.list = this.getListByMatchKeywords(word);
                    return;
                }

                let list = [],
                    isMatch = false;

                // 判断是否匹配前置字符
                appConfig.pre_actions.forEach(item => {
                    if (isMatch) {
                        return;
                    }
                    item.keywords.forEach(keyword => {
                        if (!isMatch && new RegExp("^" + keyword + " ").test(this.searchWord)) {
                            isMatch = true;
                            list.push({
                                name: item.name,
                                url: item.url,
                                openBrower: true,
                                keyword
                            })
                            this.activeIndex = 0;
                        }
                    })
                })

                //  判断是否匹配快速启动
                if (!isMatch) {
                    list = this.startApp.filter(v => {
                        v.app = true;
                        return new RegExp(word, "gi").test(v.name);
                    })
                }
                let filterList = this.getListByMatchKeywords(word);
                list = filterList.concat(list);

                this.searchResultList = list;

            },
            getListByMatchKeywords(keyword) {
                let list = [];
                appConfig.features.forEach(item => {
                    let isMatch = false;
                    item.keywords.forEach(v => {
                        if (new RegExp("^" + v, 'gi').test(keyword) && !isMatch) {
                            list.push({
                                name: item.name,
                                router: item.router
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
                this.activeIndex = index;
                let act = this.activeSearchItem || {};
                console.log(act);
                if (act.router) { // 打开新页面
                    console.log('ipcRenderer send vue-router');
                    ipcRenderer.send("vue-router", {
                        router: act.router
                    })
                } else if (act.app) { // 打开文件
                    let appProcess = spawn(act.path);
                    appProcess.on("error", function (err) {
                        alert("无法执行" + act.path)
                    })
                } else if (act.openBrower) { // 打开浏览器搜索
                    let query = this.searchWord.replace(new RegExp("^" + act.keyword + "\\s*"), "")
                    let url = act.url + encodeURIComponent(query);
                    this.open(url)
                }
            }
        }
    }
</script>

<style scoped>
    #wrapper {
        width: 100%;
    }

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
        max-height: 315px;
        overflow: auto;
    }

    .search-li {
        cursor: pointer;
        overflow: hidden;
        line-height: 47px;
        background: rgb(41, 40, 40);
        padding: 0 7px;
        color: #fff;
        font-size: 17px;
    }

    .s-word {
        float: left;
    }

    .active-li {
        background: #bf7777;
    }

    .active-li .s-word {
        color: #fff;
    }
</style>