<template>
    <div class="search-li" @click="clickHandle">
        <div class="open-word">打开文件</div>
        <div class="s-word" v-html="highlightHtml"></div>
    </div>
</template>

<script>
    export default {
        props: ["data", "index"],
        computed: {
            highlightHtml() {
                let html = this.data.name.replace(new RegExp(this.data.query, 'i'),
                    `<span class="highlight">${this.data.query}</span>`);
                return html;
            }
        },
        methods: {
            clickHandle() {
                this.$emit("clickHandle", this.index);
            }
        }
    }
</script>

<style>
    .highlight {
        color: #eaea0e;
    }

    .active-li .highlight {
        font-size: 18px;
    }
</style>
<style scoped lang="scss">
    .search-li {
        cursor: pointer;
        overflow: hidden;
        line-height: 47px;
        background: rgb(41, 40, 40);
        padding: 0 7px;
        color: #00f1ff;
        font-size: 17px;
    }

    .open-word {
        float: left;
        margin-right: 10px;
        color: #fff;
    }

    .s-word {
        float: left;
    }

    .active-li {
        background: #bf7777;
    }

    .active-li {
        .s-word {
            color: #00f1ff;
            font-size: 18px;
        }
    }
</style>