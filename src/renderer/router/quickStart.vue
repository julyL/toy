<template>
    <div class="page-quickStart wrapper">
        <div class="close" @click="closeWindow"></div>
        <el-upload class="upload" action="" :http-request="handleUpload" drag>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将可执行文件拖到此处</div>
        </el-upload>
        <el-table :data="tableData" class="el-table" border max-height="500">
            <el-table-column label="启动关键字" width="150px" align="center">
                <template slot-scope="scope">
                    <el-input v-model="inputName" v-if="activeColumn===scope.$index" size="small"></el-input>
                    <span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="本地路径" width="450px" align="center">
                <template slot-scope="scope">
                    <el-input v-model="inputPath" v-if="inputPath&&activeColumn===scope.$index" size="small"></el-input>
                    <span style="margin-left: 10px" v-else>{{ scope.row.path }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleSave(scope.$index, scope.row)" v-if="activeColumn===scope.$index">保存</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-else="activeColumn===scope.$index">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    const {
        remote
    } = require('electron');
    const path = require("path");
    const dayjs = require("dayjs");
    import emitter from "_src/util/emitter";

    export default {
        created() {
            this.getTabaleData();
        },
        data() {
            return {
                tableData: [],
                inputName: "",
                inputPath: "",
                activeColumn: ""
            }
        },
        watch: {
            tableData: {
                handler: function (val) {
                    emitter.emit("setAppSetting", {
                        type: "quickStartApp",
                        data: val
                    })
                },
                deep: true
            }
        },
        methods: {
            insertTableData(fpath) {
                let name = path.basename(fpath, path.extname(fpath)),
                    date = dayjs(new Date()).format("YYYY-MM-DD HH:MM:ss");
                console.log(name, fpath);
                this.tableData.unshift({
                    date,
                    name,
                    path: fpath
                })
            },
            handleUpload(e) {
                this.insertTableData(e.file.path);
            },
            handleSave(index, row) {
                let rowTableData = this.tableData[index];
                this.activeColumn = '';
                row.name = this.inputName;
                row.path = this.inputPath;
                rowTableData.name = row.name;
                rowTableData.path = row.path;
            },
            handleEdit(index, row) {
                this.activeColumn = index;
                this.inputName = row.name;
                this.inputPath = row.path;
            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1);
            },
            getTabaleData() {
                emitter.emit("getAppSetting", (data) => {
                    this.tableData = data.quickStartApp;
                })
            },
            closeWindow() {
                var win = remote.getCurrentWindow();
                win.close();
            }
        }
    }
</script>

<style>
</style>

<style lang='scss'>
    .page-quickStart {
        padding: 40px;
        text-align: center;
        .upload {
            padding: 40px;
        }
        .el-table {
            margin: 0 auto;
            width: 800px;
        }
        .el-upload {
            margin: 0 auto;
        }
        .el-upload__input {
            display: none !important;
        }
    }

    .el-table__body-wrapper {
        overflow-x: hidden !important;
    }

    .el-table {
        overflow-y: hidden;
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
</style>