<template>
    <router-link :to="link.router" class="btn-item zoomIn animated">
        <div class="item-word">{{link.word}}</div>
    </router-link>
</template>
<script>
    export default {
        props: {
            link: {
                type: Object,
                require: true
            }
        },
        mounted() {


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
    .btn-item {
        display: block;
        cursor: pointer;
        width: 100px;
        height: 100px;
        font-size: 20px;
        float: left;
        margin: 14px 45px 80px;
        position: relative;
        background-size: 100%;
        background: #fdfdfd;
        text-align: center;
        opacity: 0.67;
        border-radius: 50%;
        transition: all 0.1s;
        transform: translate3d(0, 0, 0);
    }

    .btn-item:nth-child(1) {
        background-color: rgb(26, 188, 156);
    }

    .btn-item:nth-child(2) {
        background-color: rgb(144, 204, 232);
    }

    .btn-item:nth-child(3) {
        background-color: rgb(222, 184, 194);
    }

    .btn-item:nth-child(4) {
        background-color: #b8abe2;
    }

    .btn-item:nth-child(5) {
        background-color: #095979;
    }

    @-webkit-keyframes blinkingbig {
        0%,
        100% {
            -webkit-filter: drop-shadow(0 0 3px rgba(0, 153, 204, 0.78));
        }
        50% {
            -webkit-filter: drop-shadow(0 0 10px rgba(0, 153, 204, 0.78));
        }
    }

    .btn-item:hover {
        color: #acace2;
        -webkit-animation: blinkingbig 1s ease infinite;
    }

    .item-word {
        color: #fff;
        border-radius: 10px;
        font-size: 14px;
        line-height: 24px;
        margin: 110px auto 0;
        width: 95px;
        background: rgba(0, 0, 0, .3);
    }
</style>