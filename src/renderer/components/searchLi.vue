<template>
    <div class="search-li" @click="clickHandle">
        <div class="s-word">{{data.name}}</div>
        <div class="search-word">{{"'"+data.query+"'"}}</div>
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
    .search-li {
        cursor: pointer;
        overflow: hidden;
        line-height: 47px;
        background: rgb(41, 40, 40);
        padding: 0 7px;
        color:#588994;
        font-size: 17px;
    }

    .search-word {
        float: left;
        margin-left: 10px;
        font-weight: bold;
        font-size: 18px;
        color: #fff;
    }

    .s-word {
        float: left;
    }

    .active-li {
        background: #bf7777;
    }


    .active-li .s-word {
        color: #fff;
    }
</style>