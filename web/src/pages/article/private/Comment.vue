<template>

    <div id="Comment" class="message-board">


        <h4 class="message-header">评论</h4>


        <div class="comment-box" v-if="logged">
            <div class="comment-box-header">
                <a class="comment-portrait"><img
                        src="/users/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410/portraits/0.09973871801953105.jpg"></a>

                <div class="field-textarea comment-textarea">
                    <textarea id="comment-textarea" style="height:63px;overflow-y:hidden;" v-model="commentInfo.message"></textarea>
                </div>
            </div>

            <button class="btn post-btn" @click="comment">发表</button>
        </div>

        <div class="welcome-box" v-else>
            <button class="btn" @click="login">登录</button><span class="message-welcome"> 登录来发表您的看法吧！</span>
        </div>


        <ul class="comment-list">


            <li class="comment-item" v-for="(item,index) of commentList" v-bind:key="index">
                <a v-bind:href="item.url" class="comment-portrait">
                    <img v-bind:src="item.portrait">
                </a>

                <div class="comment-info">

                    <div class="comment-user-info">
                        <a v-bind:href="item.url" class="user-name">{{item.nickname}}</a>
                        <span class="user-introduction">{{item.introduction}}</span>
                    </div>

                    <div class="comment-message">{{item.message}}</div>

                    <div class="comment-footer">
                        <a class="re-comment" v-on:click="openReplyPanel(item,index)"><i class="fa fa-commenting-o"></i>
                            <span class="comment-count" v-show="!item.existStatus">{{item.reCommentNum}}条评论</span>
                            <span class="closeBtn" v-show="item.existStatus">收起评论</span>
                        </a>
                        <span class="comment-time">{{getTimeDif(item.addtime)}}</span>
                    </div>

                    <re-comment v-bind:exist="item.existStatus" v-bind:commentInfo="item"></re-comment>

                </div>

            </li>


        </ul>


    </div>



</template>

<script>

    const reComment = () => import("./ReComment.vue");

    export default {
        name: "Comment",
        components : {reComment},
        data(){
            return {
                commentList : [],
                commentInfo : {
                    postId : "",
                    message : "",
                    addTime : ""
                }
            }
        },

        methods : {
            getTimeDif (timer){
                return this.$parent.getTimeDif(timer);
            },

            getComment(){
                this.$axios({
                    method : "post",
                    url : "/community/getComment",
                    data : {
                        postId : this.$parent.getHash()
                    }
                }).then(value =>{
                    console.log("value===============",value);
                    this.commentList = value.data.data;
                }).catch(err => {
                    console.error("err",err);
                });
            },

            openReplyPanel (target,index){
                if(target.existStatus){
                    this.$set(target,"existStatus",false);
                }else{
                    this.$set(target,"existStatus",true);
                }
            },

            login(){
                this.$parent.login();
            },

            comment(){
                this.commentInfo.postId = this.$common.getHash();
                this.commentInfo.addTime = new Date();
                this.$axios({
                    method : "post",
                    url : "/community/addComment",
                    data : {
                        commentInfo : this.commentInfo
                    }
                }).then(res =>{
                    alert(res.data.data);

                    if(res.data.status == '1'){
                        this.getComment();
                    }

                }).catch(err =>{

                })
            }

        },

        computed : {
            logged (){
                return this.$store.state.logged;
            }
        },

        mounted() {
            this.getComment();
        }
    }
</script>

<style scoped>


    /*-------------------留言板-----------------*/

    .message-board{
        padding:60px;
    }

    .message-header{
        text-align: center;
        font-size: 18px;
        color:rgba(0,0,0,0.7);
    }

    .comment-box{
        display:flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9fa;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        text-align: center;
    }

    .comment-box-header{
        display:flex;
        flex-direction: row;
    }

    .comment-info{
        width:100%;
    }


    .comment-box .post-btn{
        width: 60px;
        align-self: flex-end;
        margin-top: 12px;
    }

    .welcome-box{
        display:flex;
        justify-content: center;
        padding: 30px 0;
        background-color: #f8f9fa;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        text-align: center;
    }

    .message-welcome {
        font-size: 15px;
        color: rgba(0,0,0,0.6);
        vertical-align: middle;
        line-height: 28px;
        margin-left: 10px;
    }

    .comment-list{
        list-style: none;
        padding: 0;
        margin:35px 0 0 0;
    }

    .comment-item{
        display:flex;
        flex-direction: row;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom:30px;
    }

    .comment-list li:last-child{
        border-bottom: none;
    }



    .comment-portrait{
        height: 100%;
        margin-right:15px;
    }

    .comment-portrait img{
        width:45px;
        height:45px;
        border-radius: 50%;
    }

    .comment-user-info .user-name{
        color:#333;
        font-size: 15px;
        font-weight: 600;
        margin-right:8px;
    }

    .comment-user-info .user-name:hover{
        color:#409eff;
    }

    .comment-user-info .user-introduction{
        font-size: 12px;
        color:rgba(0,0,0,0.5);
    }

    .comment-message{
        margin:4px 0 6px 0;
        color:#333;
        font-size: 14px;
    }


    .comment-footer{
        color:rgba(0,0,0,0.6);
    }

    .re-comment{
        font-size: 13px;
        margin-right:10px;
        text-decoration: none !important;
        color:rgba(0,0,0,0.6);
        cursor:pointer;
    }

    .re-comment:hover{
        color:#409eff;
    }

    .re-comment i{
        margin-right:6px;
        font-size: 16px;
    }

    .comment-time{
        font-size: 12px;
    }

    .comment-reply{
        font-size: 12px;
        margin-left:10px;
        color:rgba(0,0,0,0.6);
        visibility: hidden;
    }

    .comment-reply:hover{
        text-decoration: none;
        color:#409eff;
    }


    /*---留言板对话框---*/

    .re-comment-board{
        position:relative;
        border:1px solid #eee;
        padding:25px 35px;
        margin-top:15px;
    }

    .re-comment-list{
        list-style: none;
        padding:0;
        margin:0;
    }

    .re-comment-item{
        display:flex;
        flex-direction: row;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom:30px;
    }


    .re-comment-list li:last-child{
        border-bottom: none;
    }

    .popover-top:before{
        position:absolute;
        content:'';
        top:-10px;
        left:30px;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid #dcdfe6;
    }

    .popover-top:after{
        position: absolute;
        content: '';
        top:-9px;
        left:30px;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid #fff;
    }


</style>