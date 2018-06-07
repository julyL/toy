<template>
    <div class="wrapper wp-json">
        <div class="title">格式化JSON</div>
        <div class="panel-body mod-json">
            <div class="row panel-txt">
                <textarea class="form-control mod-textarea" id="jsonSource" placeholder="在这里粘贴您需要进行格式化的JSON代码"></textarea>
                <div>
                    <button id=btnFormat class="btn btn-primary ui-mt-10">格式化</button>
                    <span id=errorMsg></span>
                </div>
            </div>
            <div class="row rst-item" id=modJsonResult>
                <div id=formattingMsg>
                    <svg id=spinner width=16 height=16 viewBox="0 0 300 300" xmlns=http://www.w3.org/2000/svg version=1.1>
                        <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"></path>
                    </svg>加载中...</div>
                <div id=jfCallbackName_start class=callback-name></div>
                <div id=jfContent>
                    <div class=x-placeholder>
                        <img src="../assets/image/json-demo.jpg" alt="json-placeholder">
                    </div>
                </div>
                <pre id="jfContent_pre"></pre>
                <div id=jfCallbackName_end class=callback-name></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/jsonformat/js/jsonformat.js").default;
            }, "");
        }
    }
</script>


<style scoped>
    @import "../assets/js/jsonformat/css/index.css";
</style>