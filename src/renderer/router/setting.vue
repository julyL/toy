<template>
    <div id="wrap">
        <div id="container">
            <div class="close" @click="closeWindow"></div>
            <div class="set-item">
                <div class="set-tit">全局快捷键设置</div>
                <div class="set-content">
                    <el-table :data="shortcutList" class="el-table" style="width: 100%">
                        <el-table-column label="命令" width=300>
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="按键绑定(Cmd,Ctrl,Alt,Super,Shift)" width=300>
                            <template slot-scope="scope">
                                <el-input v-model="shortcutHotkey" v-if="activeTypeIndex.shortcut===scope.$index" size="small"></el-input>
                                <span style="margin-left: 10px" v-else>{{ (scope.row.hotkey) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width=300>
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleSave('shortcut',scope.$index, scope.row)" v-if="activeTypeIndex.shortcut===scope.$index">保存</el-button>
                                <el-button size="mini" @click="handleEdit('shortcut',scope.$index, scope.row)" v-else="activeTypeIndex.shortcut===scope.$index">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="set-item">
                <div class="set-tit">快速搜索设置</div>
                <div class="add-btn" @click="addSearch" size="small">添加设置</div>
                <div class="set-content">
                    <el-table :data="searchList" class="el-table" style="width: 100%">
                        <el-table-column label="提示" width=162>
                            <template slot-scope="scope">
                                <el-input v-model="searchName" v-if="activeTypeIndex.search===scope.$index" size="small"></el-input>
                                <span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="路径" width=315>
                            <template slot-scope="scope">
                                <el-input v-model="searchUrl" v-if="activeTypeIndex.search===scope.$index" size="small"></el-input>
                                <span style="margin-left: 10px" v-else>{{ scope.row.url }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="快捷别名 (以,分隔)" width=198>
                            <template slot-scope="scope">
                                <el-input v-model="searchKeywords" v-if="activeTypeIndex.search===scope.$index" size="small"></el-input>
                                <span style="margin-left: 10px" v-else>{{ splitArray(scope.row.keywords) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width=225>
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleSave('search',scope.$index, scope.row)" v-if="activeTypeIndex.search===scope.$index">保存</el-button>
                                <el-button size="mini" @click="handleEdit('search',scope.$index, scope.row)" v-else="activeTypeIndex.search===scope.$index">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(searchList,scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="set-item">
                <div class="set-tit">功能快捷键设置</div>
                <div class="set-content">
                    <el-table :data="featureList" class="el-table" style="width: 100%">
                        <el-table-column label="功能" width=300>
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="快捷别名" width=300>
                            <template slot-scope="scope">
                                <el-input v-model="featureKeywords" v-if="activeTypeIndex.feature===scope.$index" size="small"></el-input>
                                <span style="margin-left: 10px" v-else>{{ splitArray(scope.row.keywords) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width=300>
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleSave('feature',scope.$index, scope.row)" v-if="activeTypeIndex.feature===scope.$index">保存</el-button>
                                <el-button size="mini" @click="handleEdit('feature',scope.$index, scope.row)" v-else="activeFeatureIndex===scope.$index">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const {
        remote,
        ipcRenderer
    } = require('electron');
    import emitter from "_src/util/emitter";

    function filterNull(arr) {
        return arr.filter(v => {
            return v && v.trim();
        })
    }

    export default {
        created() {
            emitter.emit("getAppSetting", (data) => {
                this.shortcutList = data.shortcut;
                this.featureList = data.feature;
                this.searchList = data.search;
            })

            ipcRenderer.on("setShortcut:success", (event, data) => {
                data = Object.assign(this.shortcutList[0], {
                    hotkey: data.hotkey
                })
                emitter.emit("setAppSetting", {
                    type: "shortcut",
                    data: [data]
                })
            })

            ipcRenderer.on("setShortcut:fail", (event, err) => {
                alert(err.msg)
            })

        },
        data() {
            return {
                featureList: [],
                searchList: [],
                shortcutList: [],
                searchName: "",
                searchUrl: "",
                searchKeywords: "",
                featureKeywords: "",
                shortcutHotkey: "",
                activeTypeIndex: {
                    feature: "",
                    search: "",
                    shortcut: ""
                },
            }
        },
        watch: {
            searchList: {
                handler: function (val) {
                    emitter.emit("setAppSetting", {
                        type: "search",
                        data: val
                    })
                },
                deep: true
            },
            featureList: {
                handler: function (val) {
                    emitter.emit("setAppSetting", {
                        type: "feature",
                        data: val
                    })
                },
                deep: true
            }
        },
        methods: {
            addSearch() {
                let defaultData = {
                    name: "搜索提示",
                    url: "http://xxx.com",
                    keywords: ""
                }
                this.searchList.push(defaultData);
                this.activeTypeIndex.search = this.searchList.length - 1;
                this.searchName = defaultData.name;
                this.searchUrl = defaultData.url;
                this.searchKeywords = defaultData.keywords;
            },
            handleSave(type, index, row) {
                let data;
                if (type == 'feature') {
                    data = this.featureList[index];
                    this.activeTypeIndex.feature = '';
                    data.name = this.featureName;
                    data.keywords = filterNull(this.featureKeywords.split(","));
                } else if (type == 'search') {
                    data = this.searchList[index];
                    this.activeTypeIndex.search = '';
                    data.name = this.searchName;
                    data.url = this.searchUrl;
                    data.keywords = filterNull(this.searchKeywords.split(","));
                } else if (type == 'shortcut') {
                    this.activeTypeIndex.shortcut = '';
                    ipcRenderer.send("setShortcut", {
                        hotkey: this.shortcutHotkey
                    })
                }
            },
            handleEdit(type, index, row) {
                if (type == 'feature') {
                    this.activeTypeIndex.feature = index;
                    this.featureName = row.name;
                    this.featureKeywords = this.splitArray(row.keywords);
                } else if (type == 'search') {
                    this.activeTypeIndex.search = index;
                    this.searchName = row.name;
                    this.searchUrl = row.url;
                    this.searchKeywords = this.splitArray(row.keywords);
                } else if (type == 'shortcut') {
                    this.activeTypeIndex.shortcut = index;
                    this.shortcutHotkey = row.hotkey;
                }
            },
            handleDelete(list, index, row) {
                list.splice(index, 1);
            },
            splitArray(arr) {
                if (Array.isArray(arr)) {
                    return filterNull(arr).join(" , ");
                }
                return ""
            },
            closeWindow() {
                var win = remote.getCurrentWindow();
                win.close();
            }
        }
    }
</script>
<style lang='scss'>
    #wrap {
        height: 100%;
        overflow: auto;
        -ms-overflow-style: scrollbar;
    }

    #container {
        position: relative;
        padding: 10px 0 20px;
        /* -webkit-app-region: drag; */
    }

    .close {
        cursor: pointer;
        position: fixed;
        top: 0;
        right: 0;
        text-align: center;
        font-size: 29px;
        width: 40px;
        height: 40px;
        background: #f5f3f3 url(../assets/image/close.png) no-repeat center center / 20px 20px;
    }

    .set-item {
        position: relative;
        width: 900px;
        margin: 0 auto;
    }

    .set-tit {
        font-size: 20px;
        margin: 50px 0 20px;
        text-align: center;
        color: #538e9c;
        font-weight: bold;
    }

    .set-content {}

    .el-table {
        margin: 0 auto;
    }

    /* 去掉多余border */

    .el-table::before {
        height: 0;
    }

    /* fixed 滚动 */

    .el-table__body {
        width: 100% !important;
    }

    .add-btn {
        position: absolute;
        top: 0;
        right: 110px;
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;
        padding: 7px 25px;
        border-radius: 3px;
        cursor: pointer;
    }
</style>