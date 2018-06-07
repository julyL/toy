<template>
    <div>
        <header>
            <div id="title">图片压缩裁剪工具</div>
        </header>
        <main class='mingify-container'>
            <div id="upload" align="center">
                <div id="btn_outer">
                    <div class="q_outer">
                        <span class="q_title">输出图像质量:</span>
                        <span id="quality">75%</span>
                        <input type="range" max="99" min="1" value="75" id="q_value">
                    </div>
                    <span role="button" id="upload_btn">
                        <span id="single_spinner">
                            <span id="spinner"></span>
                            <span id="pgs_percent"></span>
                        </span>
                        <span id="up_txt">选择你的图片</span>
                        <input type="file" id="input" multiple accept=".jpg, .jpeg">
                    </span>
                </div>
                <span id="btn-cropper" data-type="btn">裁剪图片</span>
                <div id='btn-w'>
                    <span id="uploadimg" data-type="btn">上传图片</span>
                    <span id="dld" data-type="btn">下载文件</span>
                </div>
                <ul class="compress_info" id="compress_info">
                    <li>压缩耗时:
                        <span id="duration"></span>
                    </li>
                    <li>原始文件大小:
                        <span id="pre_filesize"></span>
                    </li>
                    <li>压缩后文件大小:
                        <span id="aft_filesize"></span>
                    </li>
                    <li>压缩百分比:
                        <span id="reduction_percent"></span>
                    </li>
                </ul>
            </div>
            <div id="compare">
                <div class="compare_wrapper">
                    <div id="separator">
                        <span class="left-arr"></span>
                        <span class="right-arr"></span>
                    </div>
                    <div class="img_original" id="img_original">
                        <span class="compare_title_right" id="o_title">原始: 789kb</span>
                        <img src="../assets/image/bg.jpg" alt="woman taking a photo" id="before">
                    </div>
                    <div class="img_compressed" id="img_compressed">
                        <span class="compare_title" id="p_title">Picdiet: 333kb</span>
                        <img src="../assets/image/bg-compressed.jpg" alt="woman taking a photo" id="after">
                    </div>
                </div>
            </div>
            <div id="result">
                <div class="left">
                    <div class="bar">
                        <span class="bar_blue" id="bar_blue"></span>
                        <span class="bar_txt">Picdiet:
                            <span id="bar_after">333kb</span> (
                            <span id="bar_reduction">58%</span>减小体积)</span>
                    </div>
                    <div class="bar">
                        <span class="bar_pink"></span>
                        <span class="bar_txt">原始:
                            <span id="bar_pre">789kb</span>
                        </span>
                    </div>
                </div>
            </div>
            <span class="clear"></span>
        </main>
        <footer>
            <input id="recompress" type="hidden" value="继续压缩图像">
        </footer>
        <div id="cropper-box">
            <div id="cropper-box-in">
                <div class="croppper-img-wrap">
                    <img src="" alt="" class="croppper-img">
                </div>
                <div class="btn-fixed">
                    <a class="download-cropper btn-cropper" download="cropper.jpg">下载裁剪图片</a>
                    <div class="finish-cropper btn-cropper">进行裁剪</div>
                    <div class="close-btn btn-cropper">关闭</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    const jQuery = require("jquery");
    window.jQuery = jQuery;
    
    export default {
        mounted() {
            require.ensure([], (require) => {
                require("../assets/js/minifyimg/js/cropper.js");
                require("../assets/js/minifyimg/js/index.js");
            }, "");

            var imgurl,
                $compressImage = $("#after"),
                $image = $(".croppper-img"),
                $box = $("#cropper-box"),
                $cropperImgWrap = $("#croppper-img-wrap"),
                $finishCropper = $(".finish-cropper"),
                $downloadCropper = $(".download-cropper");

            $("#btn-cropper").on("click", function () {
                $image.attr("src", $compressImage.attr("src"));
                $cropperImgWrap.css({
                    height: $compressImage.height(),
                    width: $compressImage.width()
                })
                $box.show();

                $image.cropper("destroy");
                $image.cropper({
                    aspectRatio: 16 / 9
                });

                $downloadCropper.hide();
            })


            $(".close-btn").on("click", function () {
                $box.hide();
            })

            $finishCropper.on("click", function () {
                var action = $(this).attr("data-action");
                var canvas = $image.cropper("getCroppedCanvas", {
                    imageSmoothingQuality: "high"
                });
                $finishCropper.html("正在裁剪中...")
                canvas.toBlob((blob) => {
                    $finishCropper.html("进行裁剪");
                    $downloadCropper.attr('href', URL.createObjectURL(blob)).css("display",
                        "inline-block");
                })
            });

            $("#uploadimg").on("click", function () {
                $("#input").trigger("click");
            })
        },
        data() {
            return {


            }
        },
        methods: {


        },
        components: {


        }
    }
</script>


<style scoped>
    @import '../assets/js/minifyimg/css/index.css';
    @import '../assets/js/minifyimg/css/cropper.min.css';
</style>