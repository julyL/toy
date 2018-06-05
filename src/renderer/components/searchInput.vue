<template>
    <div id="wrapper">
        <input type="text" placeholder="Search" @keydown="keydown($event)" id="search" v-model="searchWord" ref="sInput" autofocus>
        <div id="search-list">
            <div class="search-li" v-for="(item,index) in searchResultList" :class="index==activeIndex?'active-li':''" :key="index">
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
            keydown(e) {
                let len = this.searchResultList.length;
                if (e.keyCode == 38) { // up
                    this.fixPointerPosition();
                    this.activeIndex = (this.activeIndex - 1 + len) % len;
                } else if (e.keyCode == 40) { // down
                    this.fixPointerPosition();
                    this.activeIndex = (this.activeIndex + 1) % len;
                } else if (e.keyCode == 13) {
                    this.handleSelect();
                } else {
                    setTimeout(() => {
                        this.getSearchList();
                    }, 0);
                }
            },
            getSearchList() {
                let word = this.searchWord.trim();
                if (word) {
                    let list = [],
                        isMatch = false;
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
                    if (!isMatch) {
                        list = this.startApp.filter(v => {
                            v.app = true;
                            return new RegExp(word, "gi").test(v.name);
                        })
                    }
                    this.searchResultList = list;
                }
            },
            fixPointerPosition() {
                this.$refs.sInput.blur();
                setTimeout(() => {
                    this.$refs.sInput.focus();
                }, 17);
            },
            handleSelect() {
                let act = this.activeSearchItem;

                if (act.router) { // 打开新页面
                    console.log('ipcRenderer send vue-router');
                    ipcRenderer.send("vue-router", {
                        router: act.router
                    })
                } else if (act.app) { // 打开文件
                    spawn(act.path);
                } else if (act.openBrower) { // 打开浏览器搜索
                    let url = act.url + encodeURIComponent(this.searchWord.replace(new RegExp("^" + act.keyword + "\s*"),
                        ""));
                    this.open(url)
                }
            }
        }
    }
</script>

<style>
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
        color: #000;
        background: #ccc;
    }
</style>