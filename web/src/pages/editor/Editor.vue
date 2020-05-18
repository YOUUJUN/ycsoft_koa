<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main class="main-page">

            <div class="container reWidth">

                <div class="area cols-12">

                    <div id="edit" class="edit-container">

                        <div class="edit-title">

                            <h4 v-if="pageProperty === 'Article'">文章名称:</h4>
                            <h4 v-else>文档名称:</h4>

                        </div>
                        <div class="fill-title-box">
                            <div class="field-text">



                                <input type="text" placeholder="文档标题" v-model="articleInfo.title">


                            </div>
                        </div>



                        <div class="edit-title">

                            <h4 v-if="pageProperty === 'Article'">文章内容:</h4>
                            <h4 v-else>文档内容:</h4>

                        </div>
                        <editor-md ref="md" v-bind:preview="false" v-bind:initData="articleInfo.content"></editor-md>


                        <div class="post-btn-container">

                            <div class="topic-select-box">

                                <div class="field-text">
                                    <input type="text" placeholder="管理员你好!创建一个新的文档类别吗？" v-model="articleInfo.topic">
                                </div>



                                <div class="btn-group" v-if="pageProperty === 'Article'">
                                    <el-dropdown @command="selectArticleTopic">
                                        <el-button type="primary">
                                            选择已有文章类别<i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                            <el-dropdown-item>双皮奶</el-dropdown-item>
                                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>


                                <div class="btn-group" v-else>
                                    <el-dropdown @command="selectDoctype">
                                        <el-button type="primary">
                                            选择已有文档类别<i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                            <el-dropdown-item>双皮奶</el-dropdown-item>
                                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>


                            </div>



                            <button class="btn lg-btn" @click="sendArticle" v-if="pageProperty === 'Article'">发布文章</button>
                            <button class="btn lg-btn" @click="sendDoc" v-else>发布文档</button>



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
                pageProperty : "Article",
                articleInfo : {
                    content : "",
                    title : "",
                    topic : ""
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
            },

            getPageProperty (){
                let path = window.location.pathname.split("/");
                if(path[1] == "article"){
                    this.pageProperty = "Article";
                }else if(path[1] == "doc"){
                    this.pageProperty = "Doc";
                }
            },

            initCombox (){

            },

            selectArticleTopic(){

            },

            selectDoctype(){

            },

            sendArticle(){

            },

            sendDoc(){
                let editor = this.$refs["md"];
                let markDown = editor.getMarkdown();
                console.log("markDown",markDown);
                if(!markDown){
                    alert("空");
                }
if(markDown.length < 10){
                    alert("内容似乎太少了呢？");
                }
            }

        },

        created () {
            var vm = this;
            this.getUserLogStatus();
            vm.getPageProperty();
            console.log("getPageProperty",vm.pageProperty);



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


    /*---fix element-UI---*/

    .topic-select-box button{
        padding: 6px;
        vertical-align: top;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .el-dropdown-menu{
        z-index: 9999 !important;
    }

</style>
