<template>

    <div class="panels">

        <div class="container panel-content">

            <div class="area cols-12">

                <el-row> <el-col :span="24">

                    <el-tabs :tab-position="tabPosition">

                        <el-tab-pane v-for="item of solutionList" v-bind:label="item.name">

                            <h2 class="solution-title">{{item.title}}</h2>

                            <el-divider></el-divider>

                            <p class="solution-content">{{item.content}}</p>



                        </el-tab-pane>

                    </el-tabs>

                </el-col> </el-row>



            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "Tabs",

        data() {
            return {
                solutionList : this.$store.state.solutionList,

                tabPosition: 'left'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }

</script>

<style>

    /*----!---*/

    .el-tabs__header {
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
        height:600px;
        border-radius: 4px;
    }


    .el-tabs__content{
        padding:40px;
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









