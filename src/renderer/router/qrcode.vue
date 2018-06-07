<template>
    <div class=wrapper>
        <div class="title">二维码生成器</div>
        <div class="panel-body mod-json">
            <div class=row>
                <textarea class="form-control mod-textarea" id="codeSource" placeholder="在这里填写需要生成二维码的任意内容"></textarea>
            </div>
            <div class="row ui-mt-10">
                <div class="ui-d-ib x-sizes">
                    <label for="opt_width">设置二维码尺寸
                        <input name="opt_width" class="form-control" type="text" id="opt_width" value="200" maxlength="3" style="margin-top:7px;">
                    </label>
                </div>
                <a id="download_button" title="保存到本地" target="_blank" download="qrcode.jpg" class="btn btn-success ui-fl-r">下载二维码</a>
                <button id="confirm_button" class="btn btn-success ui-fl-r">生成QR图</button>
            </div>
            <div class="row ui-mt-20">
                <h4>结果</h4>
                <hr class="x-hr">
                <div id="preview"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../assets/js/qrcode/js/jquery.colorpicker.js";
    import "../assets/js/qrcode/js/jquery.qrcode.min.js";
    
    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/qrcode/js/qrcode.js").default;
            }, "");
        }
    }
</script>


<style scoped>
    @import "../assets/js/qrcode/css/index.css";
</style>