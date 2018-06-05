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

    export default {
        name: 'search',
        mounted() {
            ipcRenderer.on("focusSearchInput", () => {
                this.fixPointerPosition()
            })
        },
        data() {
            return {
                searchWord: "",
                activeIndex: 0,
                searchResultList: []
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
                    this.dealSelect();
                } else {
                    this.getSearchList();
                }
            },
            getSearchList() {
                setTimeout(() => {
                    if (this.searchWord.trim()) {
                        let list = [{
                            name: "添加快速启动",
                            router: "quickStart"
                        }];
                        for (var i = 0; i <= parseInt(Math.random() * 10); i++) {
                            list.push({
                                name: "随机--" + i
                            })
                        }
                        this.searchResultList = list;
                    }
                }, 0);
            },
            fixPointerPosition() {
                this.$refs.sInput.blur();
                setTimeout(() => {
                    this.$refs.sInput.focus();
                }, 17);
            },
            dealSelect() {
                if (this.activeSearchItem.router) {
                    console.log('ipcRenderer send vue-router');
                    ipcRenderer.send("vue-router", {
                        router: this.activeSearchItem.router
                    })
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