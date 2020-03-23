<template>

    <el-tabs type="border-card" v-bind:stretch = true class="selected-panel" @tab-click="changeTabLogout">
        <el-tab-pane label="文章">文章dede</el-tab-pane>
        <el-tab-pane label="关注的人">关注的人</el-tab-pane>
        <el-tab-pane label="关注标签">关注标签</el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        name: "Tabs",

        methods : {
            changeTabLogout (target){
                console.log("heloo",target);
                if(target.index == "1"){

                }
            },

        },

        computed : {
            logged (){
                console.log("logged",this.$store.state.logged);
                return this.$store.state.logged;
            }
        }
    }
</script>

<style>

    .selected-panel{
        margin:30px 0;
    }

    .el-tabs__item{
        color: rgba(0,0,0,0.5);
        font-size: 16px;
        height:60px;
        line-height:60px;
    }

</style>