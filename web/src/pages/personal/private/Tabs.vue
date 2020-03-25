<template>
    <el-tabs type="border-card" v-bind:stretch=true class="selected-panel" @tab-click="changeTabLogout">
        <el-tab-pane :label="'文章  '+ authorInfo.articleCount">

            <ul class="article-list">

                <li class="user-article" v-for="item of articleList">
                    <a class="article-href" target="_blank" v-bind:href="item.url">
                        <div class="user-article-name">
                            <span class="name">{{item.title}}</span>
                            <span class="time">发表于：{{getTimeDif(item.date)}}</span>
                        </div>

                        {{getLogStatus}}
                        <div class="operation-box" v-if="owner">
                            <object><a href="\editor\2137c100-44a7-11e9-a0ef-8d85f4e44512" class="btn" style="margin-right:10px;">修改</a></object>
                            <object><a href="javascript:void(0);" class="btn" onclick="doWith('2137c100-44a7-11e9-a0ef-8d85f4e44512','del')">删除</a></object>
                        </div>

                        <div class="operation-box" v-else>
                            <ul class="action-list">
                                <li><object><a class="btn diy-btn" href="javascript:void(0)" onclick="doAsk(addLike,'2137c100-44a7-11e9-a0ef-8d85f4e44512',this)" data-v="2137c100-44a7-11e9-a0ef-8d85f4e44512"><i class="fa fa-heart"></i><span data-v="2137c100-44a7-11e9-a0ef-8d85f4e44512">{{item.likeNum}}</span></a></object></li>
                                <li><object><a class="btn diy-btn" href="/community/post/2137c100-44a7-11e9-a0ef-8d85f4e44512#Comment"><i class="fa fa-comment"></i>{{item.commentNum}}</a></object></li>
                            </ul>
                        </div>

                    </a>
                </li>

            </ul>

        </el-tab-pane>
        <el-tab-pane :label="'关注的人  '+ authorInfo.concernNum">

            <ul class="article-list">

                <li class="user-article" v-for="item of followerList">
                    <a class="topic-href" target="_blank" v-bind:href="item.url">
                        <div class="follow-box">
                            <img class="follow-portrait" v-bind:src="item.portrait">
                            <div class="follow-info">
                                <span class="nickname">{{item.nickname}}</span>
                                <span class="introduction">{{item.introduction}}</span>
                            </div>
                        </div>

                        <div class="topic-detail-follow">
                            <object>
                                <a href="javascript:void(0);" id="focus" class="btn" @click="addFollow(item.id)">关注</a>
                            </object>
                        </div>
                    </a>
                </li>

            </ul>

        </el-tab-pane>
        <el-tab-pane :label="'关注标签  '+ authorInfo.topicNum">关注标签</el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        name: "Tabs",
        props: {
            authorInfo: Object
        },
        data() {
            return {
                userInfo: {},
                text: "<span style='color:red;'>hello</span>",
                articleList : [],
                followerList : [],
                owner : false
            }
        },
        methods: {
            changeTabLogout(target) {
                // if (target.index == "0") {
                //     this.getArticleList();
                // }
                switch (target.index) {
                    case "0":
                        this.getArticleList();
                        break;
                    case "1":
                        this.getFollowerList();
                        break;
                }
            },

            getFollowerList (){
                this.$axios({
                    method : "post",
                    url : "/personal/getFollowUser",
                    data : {
                        userId : this.$common.getHash()
                    }
                }).then(res => {
                    this.followerList = res.data.data;
                }).catch(err => {

                })
            },


            getArticleList (){
                this.$axios({
                    method : "post",
                    url : "/personal/getArticleList",
                    data : {
                        userId : this.$common.getHash()
                    }
                }).then(res => {
                    this.articleList = res.data.data;
                }).catch(err => {

                })
            },

            addFollow(){

            },

            getTimeDif (timer){
                return this.$common.getTimeDif(timer);
            },

            verifyOwner(){
                if(this.logged){
                    this.$axios({
                        method : "post",
                        url : "/personal/verifyOwner",
                        data : {
                            userId : this.$common.getHash()
                        }
                    }).then(res =>{
                        this.owner = res.data.data.ifOwner;
                    }).catch(err =>{
                        console.error(err);
                    })
                }
            }

        },

        computed : {

            getLogStatus (){
                this.logged = this.$store.state.logged;
                let result = this.verifyOwner();
            }

        },

        beforeCreate(){
            console.log("子组件beforeCreate");
        },
        created() {
            this.userInfo = this.$common.getUserInfo();
            console.log("子组件created");
            this.getArticleList();
        },
        beforeMount() {
            console.log("子组件beforeMount");
        },
        mounted() {
            console.log("子组件mounted");
            this.verifyOwner();
        }
    }
</script>

<style>

    .selected-panel {
        margin: 30px 0;
    }

    .el-tabs__item {
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        height: 60px;
        line-height: 60px;
    }

    .counter {
        margin-left: 10px;
        color: rgba(0, 0, 0, 0.6);
    }




    .personal-control{
        display:flex;
        align-self: end;
    }

    .personal-control button{
        background-color: #fff;
        color: #409eff;
        height: 38px;
        line-height: 34px;
        font-size: 16px;
    }


    .statistics-select{
        background-color: #fff;
        margin-top:15px;
    }

    .statistics-select .statistics-select-board{
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        flex-direction: row;
        justify-content: space-around;
    }

    .statistics-select-board li{
        flex: 1 1 auto;
        text-align: center;
        border-right: 1px solid #ddd;
        padding: 18px;
        font-size: 16px;
        cursor:pointer;
    }

    .statistics-select-board li:last-child{
        border-color:#fff;
    }

    .statistics-select-board li:hover{
        color:#409eff;
    }

    .statistics-select-board span{
        margin-left: 10px;
        color: rgba(0,0,0,0.5);
    }

    .show-container{
        background-color: #fff;
        margin-top: 15px;
    }

    .article-list{
        list-style: none;
        padding:0;
        margin:0;
    }

    .user-article{
        border-bottom:1px solid #eee;
    }

    .user-article:hover{
        background-color: #fafafa;
    }

    .user-article .article-href{
        text-decoration: none;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .user-article-name{
        display:flex;
        flex-direction: column;
    }

    .user-article-name .name{
        font-size: 18px;
        font-weight: 600;
        color: rgba(0,0,0,0.6);
    }

    .user-article-name .time{
        color: rgba(0,0,0,0.4);
        font-size: 14px;
    }

    .operation-box{
        align-self: center;
    }

    /*--点赞，评论按钮组--*/

    .action-list li{
        display:inline-block;
        margin-right:5px;
        list-style: none;
        text-decoration: none;
        padding: 0;
    }

    .btn.diy-btn{
        height: 25px;
        line-height: 21px;
        color: #409eff;
        font-size: 14px;
        background-color: #fff;
        opacity: 0.6;
        padding: 0 6px;
    }

    .btn.diy-btn:hover{
        color:#fff;
        background-color: #409eff;
        border-color: #409eff;
    }

    .btn.diy-btn i{
        margin-right:4px;
    }

    .btn.diy-btn.active{
        background-color: #a0cfff;
        border-color: #a0cfff;
    }

    .btn.diy-btn.active i {
        color: red;
    }


    /*----------话题分类显示----------*/

    .user-article .topic-href{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        padding:25px;
    }

    .topic-title h2 {
        font-size: 22px;
        margin:0;
    }

    /*-------------关注的人分类-------------*/

    .follow-box{
        display:flex;
        flex-direction: row;
    }

    .follow-portrait{
        width:50px;
        height: 50px;
        border-radius: 50%;
        margin-right:20px;
    }

    .follow-info{
        display: flex;
        flex-direction: column;
    }

    .follow-info .nickname{
        font-size: 16px;
        font-weight: 600;
        color: #2e3135;
        margin-bottom: 5px;
    }

    .follow-info .introduction{
        font-size: 14px;
        color: rgba(0,0,0,0.5);
    }


</style>