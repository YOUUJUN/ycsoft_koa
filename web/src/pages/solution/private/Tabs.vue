<template>

    <div class="panels">

        <div class="container panel-content">

            <div class="area cols-12">

                <el-tabs :tab-position="tabPosition">

                    <el-tab-pane v-for="(item, index) in solutionList" v-bind:label="item.name">

<!--                        <span>{{index}}</span>-->

<!--                        v-bind:initData="item.content"-->
                        <editor-md v-bind:config="config" v-bind:preview="true" v-bind:initData="item.content"></editor-md>

                    </el-tab-pane>
                </el-tabs>

<!--                <editor-md v-bind:config="config" v-bind:preview="true" v-bind:initData="solutionList[0].content"></editor-md>-->


            </div>

        </div>

    </div>

</template>

<script>
    const editorMd = () => import("../../../components/Mymd.vue");

    export default {
        name: "Tabs",
        components : {editorMd},
        data() {
            return {
                solutionList : this.$store.state.solutionList,
                tabPosition: 'left',

                config : {
                    htmlDecode: "style,script,iframe",
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true, // 默认不解析
                    codeFold: true
                }
            };
        },


        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },

            inItView(ref, content){
                console.log("ref",ref);
                // this.$refs["mymd"].initPreView(content);
            }
        },

        mounted() {
            console.log(this.$refs)
        }
    }

</script>

<style>

    /*----!---*/

    .el-tabs__header {
        height: 100%;
        min-height: 800px;
        background: #f7f7f7;
        box-sizing: border-box;
    }

    .el-tabs__item {
        height: 70px;
        line-height: 70px;
        padding: 0 60px;
        font-size: 16px;
        text-align: center !important;
    }

    .el-tabs__nav{
        margin-top:35px;
    }

    .el-tabs{
        height:100%;
        border-radius: 4px;
    }


    .el-tabs__content{
        padding:40px;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
    }





</style>


<style scoped>

    .panel-content{
        background-color: #fff;
        padding:0;
        box-shadow: 0 6px 18px 0 rgba(82,94,102,.15);
        border-radius: 5px;
        margin-top: -20px;
        margin-bottom: 20px;

    }

    .area{
        padding:0;
    }

    .solution-title{
        font-size: 30px;
        color:rgba(0,0,0,0.8);
    }

    .solution-content{
        font-size: 14px;
        color:rgba(0,0,0,0.7);
    }


</style>









