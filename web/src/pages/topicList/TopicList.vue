<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList" ref="navigation"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                <div class="area cols-md-12">

                    <div class="topics-container">

                        <div class="topic-tags-box" v-for="item of topicList">
                            <a v-bind:href="item.url">
                                <div class="topic-tags">
                                    <img class="topic-logo" src="/images/topic-mid-img.png">
                                    <div class="topic-name">{{item.topicName}}</div>
                                    <div class="topic-info">
                                        <span class="focus">{{item.focusNum}} 关注</span>
                                        <span class="articles">{{item.articleNum}} 文章</span>
                                    </div>
                                    <object>
                                        <a href="javascript:void(0);" class="btn active" @click="addFocus(item)" v-if="item.ifFocused">已关注</a>
                                        <a href="javascript:void(0);" class="btn" @click="addFocus(item)" v-else>关注</a>
                                    </object>
                                </div>
                            </a>
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
    export default {
        components : {navigation},
        data() {
            return {
                topicList : [],
                navigationList : this.$store.state.navigationList,
            }
        },

        methods : {

            addFocus(item){

                if(!this.$store.getters.getLogStatus()){
                    this.$refs['navigation'].login();
                    return;
                }

                this.$axios({
                    method : "post",
                    url : "/community/addFocus",
                    data : {
                        topicName : item.topicName
                    }
                }).then(res => {
                    this.$message({
                        message: res.data.data,
                        type: 'success'
                    });
                    if(res.data.status == '1'){
                        item.ifFocused = true;
                    }else if(res.data.status == '2'){
                        item.ifFocused = false;
                    }
                }).catch(err =>{
                    console.error(err);
                })
            },

            getTopicList (){
                this.$axios({
                    method : "POST",
                    url : "/community/getTopicList",
                    data : {
                        limit : false
                    }
                }).then(value => {
                    this.topicList = value.data.data;
                    console.log("topicList",this.topicList);
                }).catch(err =>{
                    console.log(err);
                })
            }

        },

        created () {
            this.$store.dispatch("getUserLogStatus");
            this.getTopicList();
        },

        mounted() {

        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome/css/font-awesome.min.css";

    .topics-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:start;
    }

    .topics-container .topic-tags-box{
        width:23%;
        padding:10px;
    }

    .topics-container a:hover{
        text-decoration: none;
    }

    .topic-tags{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px 0;
        align-items: center;
    }

    .topic-logo{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .topic-name{
        font-size: 18px;
        color:rgba(0,0,0,0.8);
        margin: 6px 0;
    }

    .topic-info{
        color:rgba(0,0,0,0.6);
        font-size: 14px;
        margin-bottom: 6px;
    }

    .topic-info .focus{
        margin-right:10px;
    }

</style>
