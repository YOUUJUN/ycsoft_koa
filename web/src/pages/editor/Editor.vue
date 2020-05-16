<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main class="main-page">

            <div class="container">

                <div class="area cols-12">

                    <div id="edit" class="edit-container">

                        <div class="edit-title">

                            <h4>文档名称:</h4>

                        </div>
                        <div class="fill-title-box">
                            <div class="field-text">



                                <input type="text" name="postTitle" placeholder="文档标题">


                            </div>
                        </div>



                        <div class="edit-title">

                            <h4>文档内容:</h4>

                        </div>
                        <editor-md v-bind:config="config" v-bind:preview="false" v-bind:initData="articleInfo.content"></editor-md>


                        <div class="post-btn-container">

                            <div class="topic-select-box">
                                <div class="field-text">



                                    <input type="text" name="postTopic" placeholder="管理员你好!创建一个新的文档类别吗？">


                                </div>



                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">选择已有文档类别
                                        <span class="caret"></span>
                                    </button>
                                    <ul id="topicList" class="dropdown-menu" role="menu">


                                        <li><a href="javascript:void(0);">平台使用教程</a></li><li><a href="javascript:void(0);">平台内部JavaScript库</a></li><li><a href="javascript:void(0);">平台组件</a></li><li><a href="javascript:void(0);">eqwewqe</a></li></ul>
                                </div>


                            </div>



                            <button class="btn lg-btn" onclick="sendDoc()">发布文档</button>



                        </div>

                    </div>


                </div>

            </div>


        </main>

        <footer>


        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const editorMd = () => import("../../components/Mymd.vue");
    export default {
        components : {navigation,editorMd},
        data() {

            return {
                navigationList : this.$store.state.navigationList,
                config : {
                    htmlDecode: "style,script,iframe",
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true, // 默认不解析
                    codeFold: true
                },
                articleInfo : {
                    content : "hello?"
                }
            }

        },
        methods : {
            getUserLogStatus (){
                this.$axios({
                    method : "post",
                    url : "verifyToken"
                }).then(value =>{
                    console.log("value ====-====",value);
                    this.$store.commit("changeLogStatus",value.data.logged);
                }).catch(err => {
                    console.log(err);
                })
            }

        },

        created () {
            this.getUserLogStatus();
        },

        mounted() {
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";


    /*--------------------页面主体----------------------*/

    .main-page{
        margin:30px 0;
    }

    .edit-container{
        padding:20px;
        border:1px solid #eee;
        border-radius: 5px;
        margin-bottom: 80px;
    }

    .reWidth{
        width: 1500px ;
    }

    #topicList{
        height:160px;
        overflow: auto;
    }

    .post-btn-container{
        overflow: unset;
    }


    .fill-title-box input{
        font-size: 22px;
        height: 40px;
        line-height: 40px;
    }

    .post-btn-container{
        display:flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content:space-between;
    }

    .topic-select-box{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex:0 0 auto;
        width: 450px;
    }

    .topic-select-box .field-text{
        flex:1 1 auto;
    }

    .topic-select-box .field-text input{
        height: 28px;
        line-height: 28px;
    }

    .topic-select-box .btn-group{
        flex:0 0 auto;
    }

    .lg-btn{
        flex:0 0 auto;
        height: 36px;
        line-height: 33px;
        font-size: 15px;
    }

</style>
