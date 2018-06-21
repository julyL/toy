<template>
    <div class="page-staticServer">
        <div class="el-upload-dragger" id="holder">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖入文件夹</div>
        </div>
        <div class="preview" v-show="qrcode">
            <img :src="qrcode" class="qrcode" />预览地址:
            <span class='link' title="点击跳转到预览地址" @click="open(openUrl)">{{openUrl}}</span>
        </div>
    </div>
</template>
<script>
    import createServer from './server/createServer.js';
    const open = require("open");
    const ip = require('ip');
    const $ = require('jquery');
    const qrcode = require('qrcode');
    const path = require("path");
    const PORT = 3456;

    var myip = ip.address(),
        openUrl = `http://${myip}:${PORT}/`;

    export default {
        mounted() {
            const holder = document.getElementById('holder');
            holder.ondragover = () => {
                return false;
            };
            holder.ondragleave = holder.ondragend = () => {
                return false;
            };
            holder.ondrop = (e) => {
                e.preventDefault();
                for (let f of e.dataTransfer.files) {
                    console.log('File(s) you dragged here: ', f.path);
                    let stopOpen = false;
                    createServer({
                        port: PORT,
                        filepath: f.path
                    }).catch((err) => {
                        stopOpen = true;
                        alert(err);
                    })
                    setTimeout(async () => {
                        if (!stopOpen) {
                            open(openUrl);
                            this.qrcode = await qrcode.toDataURL(openUrl);
                            this.openUrl = openUrl;
                        }
                    }, 100);
                }
                return false;
            };
        },
        data() {
            return {
                qrcode: "",
                openUrl: ""
            }
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link)
            },
            handleUpload() {

            }
        },
        components: {


        }
    }
</script>


<style scoped lang='scss'>
    .page-staticServer {
        #holder {
            margin: 50px auto 20px;
            min-width: 360px;
            width: 70%;
            padding-top: 35px;
            height: 241px;
        }
        .preview {
            text-align: center;
            color: #6c6f73;
        }
        .qrcode {
            width: 350px;
            display: block;
            margin: 0 auto 20px;
        }
        .link {
            cursor: pointer;
            color: #428bca;
            text-decoration: underline;
            font-size: 20px;
            margin-left: 7px;
        }
    }
</style>