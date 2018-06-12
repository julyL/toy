<template>
    <div class="page-encode wrapper">
        <div class="page-title">字符串编码</div>
        <div class="panel-body mod-endecode">
            <div class="row">
                <textarea class="form-control mod-textarea " id="srcText" placeholder="粘贴需要进行编码转换的字符串"></textarea>
            </div>
            <div class="radio-w">
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="uniEncode" checked=checked>Unicode编码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="uniDecode">Unicode解码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="utf8Encode">UTF8(URL)编码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="utf8Decode">UTF8(URL)解码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="base64Encode">base64编码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="base64Decode">base64解码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="md5Encode">md5编码</label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="codeType" id="html2js">html2js</label>
                </div>
                <div class="ovh">
                    <input id="btnCodeClear" class="btn btn-warning fr" type="button" value="清空">
                    <input id="btnCodeChange" class="btn btn-success fr" type="button" value="转换">
                </div>
            </div>
            <div id="rst" class="row" style="margin-top:20px;">
                <textarea class="form-control mod-textarea" id="rstCode"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/encode/encode.js").default;
            }, "");
        }
    }
</script>

<style scoped lang='scss'>
    .page-encode {
        .mod-textarea {
            height: 110px;
        }
        .radio-w {
            padding: 10px;
        }
        .radio {
            margin: 5px;
            display: inline-block;
            width: 130px;
        }
        input[type="radio"] {
            margin-right: 7px;
            position: relative;
            top: 2px;
        }
        #btnCodeChange {
            margin-right: 10px;
        }
        .btn {
            margin-top: 10px;
            width: 80px;
        }
    }
</style>