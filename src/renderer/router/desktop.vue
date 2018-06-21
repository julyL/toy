<template>
    <div class="page-desktop">
        <div id="view-main" :style="{backgroundImage:'url('+backgroundImage +')'}" v-show="$route.name=='desktop'">
            <div id="btn-list">
                <linkbtn v-for="link in routerLink" :link="link" :key="link.router"></linkbtn>
            </div>
            <div id="random-bg" title="切换背景图">
                <img src="../assets/image/fengche.png" :class="isFetchingImage?'xuanzhuan':''" id='fengche' @click="chanageBackgroundImage"
                    @mouseover="previewImgShow=true" @mouseleave="previewImgShow=false">
                <i id="random-line"></i>
                <div id="preview-img-w" v-show="previewImgShow">
                    <img :src="previewImg" alt="" class="preview-img">
                </div>
            </div>
        </div>
        <div v-show="$route.name!='desktop'" @click="goback" class="goback">返回上一页</div>
        <router-view></router-view>
    </div>
</template>

<script>
    import linkbtn from '@/components/link-btn.vue';
    import {
        fetchImageList,
        getOriginImage
    } from '@/util/fetchImage';
    import store from '_src/util/store';
    import defaultImg from '../assets/image/index.jpg';

    function loadImg(url) {
        var image = new Image();
        return new Promise((re, rj) => {
            image.onload = () => {
                re(url);
            };
            image.onerror = () => {
                rj();
            };
            image.src = url;
        });
        p
    }

    export default {
        created() {
            let bgImageInfo = store.get("bgImageInfo");
            if (typeof bgImageInfo == 'object' && bgImageInfo !== null) {
                let presentImg = getOriginImage(bgImageInfo.list[0]),
                    nextImg = getOriginImage(bgImageInfo.list[1], 'small');
                loadImg(presentImg).then(_ => {
                    this.backgroundImage = presentImg;
                    this.previewImg = nextImg;
                })
            } else {
                this.backgroundImage = defaultImg;
                fetchImageList().then(list => {
                    this.previewImg = getOriginImage(list[1], 'small');
                })
            }
        },
        mounted() {

        },
        data() {
            return {
                routerLink: [{
                        router: "/desktop/staticServer",
                        word: "静态服务器"
                    },
                    {
                        router: "/desktop/minifyimg",
                        word: "图片处理"
                    },
                    {
                        router: "/desktop/qrcode",
                        word: "生成二维码"
                    },
                    {
                        router: "/desktop/jsonformat",
                        word: "格式化JSON"
                    },
                    {
                        router: "/desktop/encode",
                        word: "字符串编码"
                    }
                ],
                previewImg: "",
                backgroundImage: "",
                isFetchingImage: false,
                previewImgShow: false
            }
        },
        methods: {
            chanageBackgroundImage() {
                this.isFetchingImage = true;
                fetchImageList().then(list => {
                    let present = getOriginImage(list[0]),
                        next = getOriginImage(list[1], 'small');
                    loadImg(present).then(_ => {
                        this.backgroundImage = present;
                        this.previewImg = next;
                        this.isFetchingImage = false;
                    })
                })
            },
            goback() {
                this.$router.push({
                    path: '/desktop'
                })
            }
        },
        components: {
            linkbtn

        }
    }
</script>

<style scoped lang='scss'>
    .page-desktop {
        width: 100%;
        height: 100%;
        #view-main {
            width: 100%;
            height: 100%;
            position: relative;
            background-size: cover;
            background-attachment: fixed;
            background-position: center center;
            -webkit-transform: translate(0);
            position: absolute;
            top: 0;
            left: 0;
        }
        #btn-list {
            overflow: hidden;
            margin-top: 40px;
            min-width: 760px;
            left: 50%;
            top: 45%;
            z-index: 10;
            overflow: hidden;
            position: absolute;
            transform: translate(-50%, -50%);
        }
        #page-wrap {
            display: none;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 22;
            background: #fff;
        }
        #page-wrap-close {
            color: #9a9393;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            right: 0;
            width: 40px;
            height: 40px;
            background: #e4e1e1;
            line-height: 40px;
            text-align: center;
            font-size: 22px;
        }
        #page-wrap-close:hover {
            background: #eae9e9;
        }
        #page-template-container {
            height: 100%;
            background: #fff;
        }
        #random-bg {
            cursor: pointer;
            position: absolute;
            width: 40px;
            height: 60px;
            bottom: 0;
            right: 20px;
            z-index: 10;
        }
        #fengche {
            width: 40px;
            z-index: 3;
            position: absolute;
            top: 0;
            left: 0;
        }
        #random-line {
            width: 5px;
            height: 30px;
            position: absolute;
            bottom: 0;
            left: 18px;
            background-color: #fefefe;
            z-index: 2;
        }
        .xuanzhuan {
            -webkit-animation: xuanzhuan 0.8s linear infinite;
        }
        @-webkit-keyframes xuanzhuan {
            0% {
                -webkit-transform: rotate(0);
            }
            25% {
                -webkit-transform: rotate(-90deg);
            }
            50% {
                -webkit-transform: rotate(-180deg);
            }
            75% {
                -webkit-transform: rotate(-270deg);
            }
            100% {
                -webkit-transform: rotate(-360deg);
            }
        }
        #random-bg:hover .canpreview {
            visibility: visible;
            left: -111px;
            opacity: 1;
        }
        #preview-img-w {
            position: absolute;
            top: -120px;
            left: -120px;
            border: 1px solid #fff;
            opacity: .5;
            transition: all .3s;
        }
        .preview-img {
            width: 150px;
            height: 100px;
            display: block;
        }
    }
</style>