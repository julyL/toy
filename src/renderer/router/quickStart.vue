<template>
    <div class="upload-wrap">
        <el-upload class="upload" action="" :http-request="handleUpload" drag>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将可执行文件拖到此处</div>
        </el-upload>
        <el-table :data="tableData" class="el-table" border max-height="600">
            <el-table-column label="名称" width="150px" align="center">
                <template slot-scope="scope">
                    <el-input v-model="inputName" v-if="inputName&&activeColumn===scope.$index" size="small"></el-input>
                    <span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="启动路径" width="450px" align="center">
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
    const path = require("path");
    const dayjs = require("dayjs");
    import emitter from "../../main/emitter";

    export default {
        created() {
            this.getTabaleData();
        },
        mounted() {
            var $upload = $(".upload");
            $upload.on("drop", e => {
                for (let f of e.originalEvent.dataTransfer.files) {
                    this.insertTableData(f.path);
                }
            })
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
                    emitter.emit("db", {
                        action: "setStartApp",
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
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1);
                console.log(index, row);
            },
            getTabaleData() {
                emitter.emit("db", {
                    action: "getStartApp",
                    cb: (data) => {
                        console.log(111, data);
                        this.tableData = data;
                    }
                })
            }
        },
        components: {


        }
    }
</script>

<style>
</style>

<style scoped>
    .upload-wrap {
        padding: 40px;
        text-align: center;
    }

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
</style>