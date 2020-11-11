<template>
    <el-tabs type="border-card" v-bind:stretch=true class="selected-panel" @tab-click="changeTabLogout">
        <el-tab-pane :label="'文章  '+ authorInfo.articleCount">

            <ul class="article-list">

                <li class="user-article" v-for="(item,index) of articleList">
                    <a class="article-href" target="_blank" v-bind:href="item.url">
                        <div class="user-article-name">
                            <span class="name">{{item.title}}</span>
                            <span class="time">发表于：{{getTimeDif(item.date)}}</span>
                        </div>

                        <div class="operation-box" v-if="owner">
                            <object><a href="javascript:void(0);" class="btn" style="margin-right:10px;" @click="modifyArticle(item.id)">修改</a></object>
<!--                            <object><a href="javascript:void(0);" class="btn" @click="delArticle(index,item.id)">删除</a></object>-->
                            <object>
                                <a href="javascript:void(0);">

                                    <el-popover placement="bottom" width="160" v-model="popVisible">
                                        <p>确定删除吗？</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
                                            <el-button type="primary" size="mini" @click="" @click="delArticle(index,item.id);popVisible = false">确定</el-button>
                                        </div>
                                        <a slot="reference" href="javascript:void(0);" class="btn">删除</a>
                                    </el-popover>

                                </a>
                            </object>

                        </div>

                        <div class="operation-box" v-else>
                            <ul class="action-list">
                                <li><object><a class="btn diy-btn" v-bind:class="{active: item.ifSubscribed}" href="javascript:void(0)" @click="addLike(item)"><i class="fa fa-heart"></i><span>{{item.likeNum}}</span></a></object></li>
                                <li><object><a class="btn diy-btn" v-bind:href="'/community/post/'+ item.id +'#Comment'"><i class="fa fa-comment"></i>{{item.commentNum}}</a></object></li>
                            </ul>
                        </div>

                    </a>
                </li>

            </ul>

        </el-tab-pane>
        <el-tab-pane :label="'关注的人  '+ authorInfo.concernNum">

            <ul class="article-list">

                <li class="user-article" v-for="(item) of followerList">
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
                                <a href="javascript:void(0);" class="btn active" @click="addFollow(item)" v-if="item.ifFollowed">已关注</a>
                                <a href="javascript:void(0);" class="btn" @click="addFollow(item)" v-else>关注</a>
                            </object>
                        </div>
                    </a>
                </li>

            </ul>

        </el-tab-pane>
        <el-tab-pane :label="'关注标签  '+ authorInfo.topicNum">

            <ul class="article-list">

                <li class="user-article" v-for="item of focusTopics">
                    <a class="topic-href" target="_blank" v-bind:href="'/community/topics/'.concat(item.name)">
                        <div class="topic-title">
                            <h2>{{item.name}}</h2>
                        </div>
                        <div class="topic-detail-follow">
                            <object>
                                <a href="javascript:void(0);" class="btn active" @click="addFocus(item)" v-if="item.userFocused">已关注</a>
                                <a href="javascript:void(0);" class="btn" @click="addFocus(item)" v-else>关注</a>
                            </object>
                        </div>
                    </a>
                </li>

            </ul>

        </el-tab-pane>

        <el-tab-pane :label="'项目管理  ' + 2">

            <ul class="article-list">
                <li class="user-article">
                    <object>
                        <a href="javascript:void(0);" class="topic-href">
                            <div class="topic-title">
                                <h2>文章草稿</h2>
                            </div>
                            <div class="topic-detail-follow">
                                <object><a href="/editor/article/drafts" class="btn" target="_blank">管理</a></object>
                            </div>
                        </a>
                    </object>
                </li>

                <li class="user-article">
                    <object>
                        <a href="javascript:void(0);" class="topic-href">
                            <div class="topic-title">
                                <h2>文档草稿</h2>
                            </div>
                            <div class="topic-detail-follow">
                                <object><a href="/editor/doc/drafts" class="btn" target="_blank">管理</a></object>
                            </div>
                        </a>
                    </object>
                </li>
            </ul>

        </el-tab-pane>


    </el-tabs>

</template>

<script>
    export default {
        name: "Tabs",
        props: {
            authorInfo: Object,
            owner : Boolean
        },
        data() {
            return {
                userInfo: {},
                text: "<span style='color:red;'>hello</span>",
                articleList : [],
                followerList : [],
                focusTopics : [],
                popVisible : false
            }
        },
        methods: {
            changeTabLogout(target) {
                switch (target.index) {
                    case "0":
                        this.getArticleList();
                        break;
                    case "1":
                        this.getFollowerList();
                        break;
                    case "2":
                        this.getFocusTopic();
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
                    console.log("followerList",this.followerList);
                }).catch(err => {
                    console.error(err);
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
                    console.error(err);
                })
            },

            getFocusTopic(){
                this.$axios({
                    method : "post",
                    url : "/personal/getFocusTopic",
                    data : {
                        userId : this.$common.getHash()
                    }
                }).then(res => {
                    this.focusTopics = res.data.data;
                    console.log("focusTopics",this.focusTopics);
                }).catch(err => {
                    console.error(err);
                })
            },

            addFollow(item){
                this.$emit("addFollow",item);
            },

            addFocus(item){
                this.$axios({
                    method : "post",
                    url : "/community/addFocus",
                    data : {
                        topicName : item.name
                    }
                }).then(res => {
                    alert(res.data.data);
                    if(res.data.status == '1'){
                        item.userFocused = true;
                    }else if(res.data.status == '2'){
                        item.userFocused = false;
                    }
                }).catch(err =>{
                    console.error(err);
                })
            },

            addLike(item){
                let postId = item.id;
                console.log("item====>",item);

                this.$axios({
                    method : "post",
                    url : "/community/addLike",
                    data : {
                        postId : postId
                    }
                }).then(value =>{
                    if(value.data.success === 0){
                        return;
                    }

                    if(value.data.status === 1){
                        item.ifSubscribed = true;
                        item.likeNum += 1;
                    }else if(value.data.status === 0){
                        item.ifSubscribed = false;
                        item.likeNum -= 1;
                    }

                }).catch(err => {
                    console.error(err);
                })

            },

            getTimeDif (timer){
                return this.$common.getTimeDif(timer);
            },


            delArticle(index,postId){
                this.$axios({
                    method : "post",
                    url : "/editor/delArticle",
                    data : {
                        postId : postId,
                        status : "posts"
                    }
                }).then(value => {
                    if(value.data.status === 1){
                        this.articleList.splice(index, 1);

                        this.$notify({
                            title: '删除成功!',
                            type: 'success'
                        });

                    }else{
                        this.$notify({
                            title: '删除失败!',
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.error(err);
                });
            },


            modifyArticle(postId){

                this.$axios({
                    method : "post",
                    url : "/editor/modifyArticle",
                    data : {
                        postId : postId
                    }
                }).then(value=>{
                    if(value.data.status === 0){
                        this.$notify({
                            title: '修改失败!',
                            message : value.data.message,
                            type: 'error'
                        });
                    }else if(value.data.status === 1){
                        this.$notify({
                            message: '文章退回修改成功!跳转编辑页面...',
                            type: 'success'
                        });
                        setTimeout(function () {
                            location.href = "/editor/article/drafts/".concat(value.data.data);
                        },800);
                    }

                }).catch(err => {
                    console.error(err);
                })

            }

        },

        computed : {

        },

        created() {
            this.userInfo = this.$common.getUserInfo();
            this.getArticleList();
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
        font-size: 20px;
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
