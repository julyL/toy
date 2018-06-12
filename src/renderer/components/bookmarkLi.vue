<template>
    <div class="bookmark-li" @click="clickHandle">
        <div class="bookmark-title">{{data.title}}</div>
        <div class="open-bookmark">书签</div>
        <div class="bookmark-url">{{data.url}}</div>
    </div>
</template>

<script>
    export default {
        props: ["data", "index"],
        methods: {
            clickHandle() {
                this.$emit("clickHandle", this.index);
            }
        }
    }
</script>

<style scoped>
    .bookmark-li {
        cursor: pointer;
        overflow: hidden;
        line-height: 28px;
        background: rgb(41, 40, 40);
        padding: 4px 7px;
        color: #588994;
        font-size: 17px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .open-bookmark {
        float: left;
        margin: 0 10px 0 15px;
        font-weight: bold;
        font-size: 15px;
        color: #fff;
    }

    .bookmark-title {
        /* float: left;  */
        color: #fff;
        color: yellow;
        font-size: 17px;
    }

    .bookmark-url {
        color: #00f1ff;
        text-decoration: underline;
        max-width: 600px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .active-li {
        background: #bf7777;
    }

    .active-li .s-word {
        color: #fff;
    }
</style>