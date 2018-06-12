<template>
    <div class="wrapper  page-jsonformat">
        <div class="wp-json">
            <div class="page-title">格式化JSON</div>
            <div class="panel-body mod-json">
                <div class="row panel-txt">
                    <textarea class="form-control mod-textarea" id="jsonSource" placeholder="在这里粘贴您需要进行格式化的JSON代码"></textarea>
                    <div>
                        <button id=btnFormat class="btn btn-primary ui-mt-10">格式化</button>
                        <span id=errorMsg></span>
                    </div>
                </div>
                <div class="row rst-item" id="modJsonResult">
                    <div id="jfCallbackName_start" class="callback-name"></div>
                    <div id="jfContent">
                        <div class="x-placeholder">
                            <img src="../assets/image/json-demo.jpg" alt="json-placeholder">
                        </div>
                    </div>
                    <pre id="jfContent_pre"></pre>
                    <div id=jfCallbackName_end class="callback-name"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/jsonformat/jsonformat.js").default;
            }, "");
        }
    }
</script>


<style lang='scss'>
    .page-jsonformat {
        .mod-json {
            position: absolute;
            top: 60px;
            bottom: 0;
            right: 0;
            left: 20px;
            height: 80vh;
            padding: 15px;
        }
        .wp-json .mod-json .panel-txt {
            position: absolute;
            width: 500px;
            top: 15px;
            bottom: 0;
        }
        .row {
            margin-right: -15px;
            margin-left: -15px;
        }
        #jsonSource {
            height: calc(100% - 50px);
            font-size: 14px;
            color: #222;
        }
        #btnFormat {
            width: 100px;
            text-align: center;
            margin-top: 10px;
            color: #fff;
            background-color: #3071a9;
            border-color: #285e8e;
        }
        #errorMsg {
            color: #f00;
            margin-left: 10px;
            float: right;
            margin-top: 10px;
        }
        #modJsonResult {
            margin-left: 500px;
            position: relative;
            overflow-y: auto;
            padding-top: 0;
            padding-bottom: 20px;
            height: calc(100% - 50px);
            overflow: auto;
        }
        .x-placeholder {
            padding-top: 50px;
            text-align: center;
        }
        .x-placeholder img {
            width: 400px;
            opacity: .15;
        }
        .mod-json .callback-name {
            font-weight: bolder;
            color: #a00;
        }
        .kvov {
            display: block;
            padding-left: 20px;
            margin-left: -20px;
            position: relative;
            padding-top: 2px;
        }
        .e {
            width: 20px;
            height: 18px;
            display: block;
            position: absolute;
            left: -2px;
            top: 1px;
            z-index: 5;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYGBgOADE/3Hgw0DM4IRHgSsDFOzFInmMAQnY49ONzZRjDFiADT7dMLALiE8y4AGW6LoBAgwAuIkf//B7O9sAAAAASUVORK5CYII=);
            background-repeat: no-repeat;
            background-position: center center;
            display: block;
            opacity: .15
        }
        .collapsed>.e {
            -webkit-transform: rotate(-90deg);
            width: 18px;
            height: 20px;
            left: 0;
            top: 0
        }
        .e:hover {
            opacity: .35
        }
        .e:active {
            opacity: .5
        }
        .collapsed .kvov .e {
            display: none
        }
        .blockInner {
            display: block;
            padding-left: 24px;
            border-left: 1px dotted #bbb;
            margin-left: 2px
        }
        #formattedJson,
        #jsonpOpener,
        #jsonpCloser {
            color: #333;
            font: 13px/18px monospace
        }
        #formattedJson {
            color: #444;
            padding-left: 28px;
            padding-top: 6px;
        }
        .b {
            font-weight: bold;
        }
        .s {
            color: #0B7500;
            word-wrap: break-word;
        }
        #buttonCollapseAll,
        #buttonFormatted {
            display: none;
            ;
        }
        #optionBar {
            position: fixed;
            top: 42px;
            right: 30px;
        }
        #btnDownload {
            text-align: center;
            padding: 4px 10px;
            text-decoration: none;
            color: #454545;
            margin-right: 10px;
            display: inline-block;
            -webkit-border-radius: 2px;
            -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            -webkit-user-select: none;
            background: -webkit-linear-gradient(#fafafa,
            #f4f4f4 40%, #e5e5e5);
            outline: none;
            border: 1px solid #aaa;
            color: #444;
            font-size: 12px;
            margin-bottom: 0;
            min-width: 4em;
            position: relative;
            z-index: 10;
            display: inline-block;
            text-shadow: 1px 1px rgba(255,
            255, 255, 0.3)
        }
    }
</style>