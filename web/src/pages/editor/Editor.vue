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



                                <input type="text" placeholder="文档标题" v-model="articleInfo.title" v-on:focusout="cacheArticle">


                            </div>
                        </div>



                        <div class="edit-title">

                            <h4 v-if="pageProperty === 'Article'">文章内容:</h4>
                            <h4 v-else>文档内容:</h4>

                        </div>
                        <editor-md ref="md" v-bind:syncContent="articleInfo.content" v-bind:preview="false" @draftsStorage="cacheArticle"></editor-md>


                        <div class="post-btn-container">

                            <div class="topic-select-box">

                                <div class="field-text">
                                    <input type="text" placeholder="管理员你好!创建一个新的文档类别吗？" v-model="articleInfo.topic" v-on:focusout="cacheArticle">
                                </div>



                                <div class="btn-group" v-if="pageProperty === 'Article'">
                                    <el-dropdown @command="selectArticleTopic">
                                        <el-button type="primary">
                                            选择已有文章类别<i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="item in topicDropDown" v-bind:command=item>{{item}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>


                                <div class="btn-group" v-else>
                                    <el-dropdown @command="selectDoctype">
                                        <el-button type="primary">
                                            选择已有文档类别<i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="item in topicDropDown" v-bind:command=item>{{item}}</el-dropdown-item>
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
                },
                topicDropDown : []
            }

        },

        methods : {
            sayHi(){
                console.log("hi");
            },

            getPageProperty (){
                let path = window.location.pathname.split("/");
                if(path[2] == "article"){
                    this.pageProperty = "Article";
                }else if(path[2] == "doc"){
                    this.pageProperty = "Doc";
                }

            },

            initDropdown (){
                this.$axios({
                    method : "post",
                    url : "/editor/getEditorDropDown",
                    data : {
                        type : this.pageProperty
                    }
                }).then(value =>{
                    this.topicDropDown = value.data;
                }).catch(err =>{
                    console.error(err);
                })
            },

            initArticleInfo(){
                let postId = this.$common.getHash();
                console.log("postId======",postId);
                if(postId !== "new"){
                    this.$axios({
                        method : "post",
                        url : "/editor/getEditorInfo",
                        data : {
                            postId : postId,
                            type : this.pageProperty
                        }
                    }).then(value =>{
                        if(value.data.status === 0){
                            this.$notify.error({
                                message: value.data.msg
                            });

                            let hrefArr = location.href.split('/');
                            hrefArr.pop();
                            hrefArr.push("new");
                            let newHref = hrefArr.join("/");
                            location.href = newHref;
                            return;
                        }

                        this.articleInfo = value.data.data;
                        this.$refs["md"].initEditor(value.data.data.content);

                    }).catch(err=>{
                        console.error(err);
                    })
                }

            },

            selectArticleTopic(command){
                this.articleInfo.topic = command;
                this.cacheArticle();
            },

            selectDoctype(command){
                this.articleInfo.topic = command;
                this.cacheArticle();
            },


            cacheArticle (){
                this.articleInfo.content = this.$refs["md"].getMarkdown();

                this.$axios({
                    method : "post",
                    url : "/editor/draftsStorage",
                    data : {
                        type : this.pageProperty,
                        content : this.articleInfo
                    }
                }).then(value => {
                    let cacheId = value.data.data;
                    if(cacheId){
                        let hrefArr = location.href.split('/');
                        hrefArr.pop();
                        hrefArr.push(cacheId);
                        let newHref = hrefArr.join("/");
                        history.pushState(null,null,newHref);
                    }
                }).catch(err => {
                    console.error(err);
                })

            },

            sendArticle(){

                let editor = this.$refs["md"];
                let markDown = editor.getMarkdown();
                let topic = this.articleInfo.topic;
                if(!topic){
                    this.$notify({
                        title: '发表失败!',
                        message: '未选择发表文章话题!',
                        type: 'error'
                    });

                    return;
                }

                if(markDown.length < 10){
                    this.$notify({
                        title: '发表失败!',
                        message: '文章字数未超过最低发表字数限制!',
                        type: 'error'
                    });

                    return;
                }

                this.$axios({
                    method : "post",
                    url : "/editor/postArticle",
                    data : {
                        content : this.articleInfo
                    }
                }).then(value =>{
                    if(value.data.status === 0){
                        this.$notify({
                            title: '发表失败!',
                            message: value.data.message,
                            type: 'error'
                        });
                    }else if(value.data.status === 1){
                        this.$notify({
                            title: '发表成功!',
                            message: value.data.message,
                            type: 'success'
                        });

                        setTimeout(function(){
                            location.href = location.origin.concat("/community");
                        },800);

                    }

                }).catch(err=>{
                    console.error(err);
                });

            },

            sendDoc(){
                let editor = this.$refs["md"];
                let markDown = editor.getMarkdown();
                let topic = this.articleInfo.topic;
                if(!topic){
                    this.$notify({
                        title: '发表失败!',
                        message: '未选择发表文档分类!',
                        type: 'error'
                    });

                    return;
                }

                if(markDown.length < 10){
                    this.$notify({
                        title: '发表失败!',
                        message: '文档字数为超过最低发表字数限制!',
                        type: 'error'
                    });

                    return;
                }

                this.$axios({
                    method : "post",
                    url : "/editor/postDoc",
                    data : {
                        content : this.articleInfo
                    }
                }).then(value =>{
                    if(value.data.status === 0){
                        this.$notify({
                            title: '发表失败!',
                            message: value.data.message,
                            type: 'error'
                        });
                    }else if(value.data.status === 1){
                        this.$notify({
                            title: '发表成功!',
                            message: value.data.message,
                            type: 'success'
                        });

                        setTimeout(function(){
                            location.href = location.origin.concat("/guide");
                        },800);

                    }

                }).catch(err=>{
                    console.error(err);
                });

            }

        },

        created () {
            var vm = this;
            this.$store.dispatch("getUserLogStatus");
            vm.getPageProperty();
            vm.initDropdown();
            vm.initArticleInfo();
        },

        mounted() {

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
