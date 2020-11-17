<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container">
                <div class="area cols-8 place-middle">

                    <div class="drafts-list">

                        <div class="list-header">
                            <div class="list-header-item">编辑草稿（{{draftsList.length}}）</div>
                        </div>

                        <ul class="list">

                            <li class="list-item" v-for="(item, index) of draftsList">
                                <a href="javascript:void(0);" class="title">{{item.title}}</a>
                                <div class="info-box">上次修改时间:{{item.date}}
                                    <a href="javascript:void(0);" @click="editDrafts(item.id,item.type)">编辑</a>

                                    <el-popconfirm
                                            confirmButtonText='是的'
                                            cancelButtonText='不用了'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="确定删除这篇草稿吗？"
                                            @confirm="delDrafts(index,item.id,item.type)"
                                    >
                                        <a href="javascript:void(0);" slot="reference">删除</a>
                                    </el-popconfirm>
                                </div>
                            </li>

                        </ul>

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
    export default {
        components : {navigation},
        data() {

            return {
                pageProperty : "Article",
                navigationList : this.$store.state.navigationList,
                draftsList : []
            }

        },
        methods : {
            getPageProperty (){
                let path = window.location.pathname.split("/");
                if(path[2] == "article"){
                    this.pageProperty = "Article";
                }else if(path[2] == "doc"){
                    this.pageProperty = "Doc";
                }

            },

            sayHi(){
              console.log("hi");
            },


            getDraftsList(){
                this.$axios({
                    method : "post",
                    url : "/editor/getDraftsList",
                    data : {
                        target : this.pageProperty
                    }
                }).then(value =>{
                    console.log("value",value.data);
                    this.draftsList = value.data;
                }).catch(err => {
                    console.error(err);
                })
            },

            editDrafts(id,type){
                switch(type){
                    case "doc":
                        location.href = "/editor/doc/drafts/".concat(id);
                        break;

                    case "article":
                        location.href = "/editor/article/drafts/".concat(id);
                        break;
                }

            },

            delDrafts(index,postId,type){

                switch(type){
                    case "doc":
                        this.$axios({
                            method : "post",
                            url : "/editor/delDoc",
                            data : {
                                postId : postId,
                                status : "drafts"
                            }
                        }).then(value => {
                            if(value.data.status === 1){
                                this.draftsList.splice(index, 1);

                                this.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });

                            }else{
                                this.$message({
                                    message: '删除失败!',
                                    type: 'error'
                                });
                            }
                        }).catch(err => {
                            console.error(err);
                        });


                        break;

                    case "article":

                        this.$axios({
                            method : "post",
                            url : "/editor/delArticle",
                            data : {
                                postId : postId,
                                status : "drafts"
                            }
                        }).then(value => {
                            if(value.data.status === 1){
                                this.draftsList.splice(index, 1);

                                this.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });

                            }else{
                                this.$message({
                                    message: '删除失败!',
                                    type: 'error'
                                });
                            }
                        }).catch(err => {
                            console.error(err);
                        });

                        break;
                }


            }

        },

        created () {
            this.$store.dispatch("getUserLogStatus");
            this.getPageProperty();
            this.getDraftsList();
        },

        mounted() {

        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

    .place-middle{
        margin:0 auto;
    }

    .drafts-list{
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
        margin-top:25px;
    }

    .list-header {
        font-weight: 700;
        color: #007fff;
        padding: 20px;
        font-size: 18px;
    }

    .title {
        font-weight: 700;
        font-size: 18px;
        color: rgba(0,0,0,0.8);
        padding: 9px 0;
        display: inline-block;
    }

    .list-item{
        border-top: 1px solid rgba(0,0,0,0.05);
        padding:20px;
    }

    .info-box {
        font-size: 16px;
        color: rgba(0,0,0,0.7);
    }

    .info-box a {
        margin-left: 10px;
        font-size: 15px;
        vertical-align: middle;
    }
</style>
