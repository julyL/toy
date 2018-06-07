<template>
    <div class=wrapper>
        <div class="title">字符串编码</div>
        <div class="panel-body mod-endecode">
            <div class=row>
                <textarea class="form-control mod-textarea ui-mb-10" id="srcText" placeholder="粘贴需要进行编码转换的字符串"></textarea>
            </div>
            <div class=row>
                <div class="radio ui-d-ib">
                    <label>
                        <input type=radio name=codeType id=uniEncode checked=checked>Unicode编码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=uniDecode>Unicode解码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=utf8Encode>UTF8(URL)编码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=utf8Decode>UTF8(URL)解码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=base64Encode>base64编码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=base64Decode>base64解码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=md5Encode>md5编码</label>
                </div>
                <div class="radio ui-d-ib ui-ml-05">
                    <label>
                        <input type=radio name=codeType id=html2js>html2js</label>
                </div>
                <input id=btnCodeClear class="btn btn-warning ui-fl-r ui-ml-10" type=button value="清空">
                <input id=btnCodeChange class="btn btn-success ui-fl-r" type=button value="转换">
            </div>
            <div id=rst class="row ui-d-n" style="margin-top:20px;">
                <textarea class="form-control mod-textarea" id="rstCode" cols="" rows=""></textarea>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/encode/js/encode.js").default;
            }, "");
        }
    }
</script>

<style scoped>
    @import "../assets/js/encode/css/index.css";
</style>