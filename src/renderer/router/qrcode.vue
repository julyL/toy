<template>
    <div class="wrapper page-qrcode">
        <div class="page-title">二维码生成器</div>
        <div class="panel-body">
            <textarea class="form-control " id="codeSource" placeholder="在这里填写需要生成二维码的任意内容"></textarea>
            <div class="ovh">
                <div class="fl">
                    <label for="opt_width">设置二维码尺寸
                        <input name="opt_width" class="form-control" type="text" id="opt_width" value="200" maxlength="3" style="margin-top:7px;">
                    </label>
                </div>
                <div class='btn-w'>
                    <a id="download_button" title="保存到本地" target="_blank" download="qrcode.jpg" class="btn btn-success fr">下载二维码</a>
                    <button id="confirm_button" class="btn btn-success fr">生成QR图</button>
                </div>
            </div>
            <h4 class="result">结果</h4>
            <div id="preview"></div>
        </div>
    </div>
</template>
<script>
    import "../assets/js/qrcode/jquery.colorpicker.js";
    import "../assets/js/qrcode/jquery.qrcode.min.js";

    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/qrcode/qrcode.js").default;
            }, "");
        }
    }
</script>

<style>
    canvas {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 20px auto;
        display: block;
    }
</style>
<style scoped lang='scss'>
    .page-qrcode {
        #codeSource {
            height: 100px;
            margin-bottom: 15px;
        }
        .setwidth {
            display: inline-block;
        }

        #download_button {
            background-color: #f0ad4e;
            border-color: #eea236;
            margin-left: 20px;
            display: inline-block;
        }
        .result {
            border-bottom: 1px solid #ccc;
            padding-bottom: 15px;
            padding-top: 15px;
        }
        .inb {
            display: inline-block;
        }
        .btn-w {
            float: right;
            margin-top: 12px;
        }
    }
</style>